import type { HeritageObject } from '../types';
import type { Theme, ObjectType, Place, Period, StoryPathway } from '../data/taxonomy';
import { sampleObjects } from "../data/sampleobjects";

const isDev = import.meta.env.DEV;
const OMEKA_URL = isDev
  ? import.meta.env.VITE_OMEKA_API_URL
  : "https://digitizedculturalheritageofusmarchive.usmcdh.org/api";
const OMEKA_PUBLIC_URL = "https://digitizedculturalheritageofusmarchive.usmcdh.org";

// First value for an element, optionally scoped to an element set
function getElement(item: any, elementName: string, elementSetName?: string): string {
    const match = item.element_texts?.find(
        (et: any) =>
            et.element?.name === elementName &&
            (elementSetName ? et.element_set?.name === elementSetName : true)
    );
    return match?.text ?? "";
}

// All values for an element, optionally scoped to an element set
function getAllElements(item: any, elementName: string, elementSetName?: string): string[] {
    return (item.element_texts ?? [])
        .filter((et: any) =>
            et.element?.name === elementName &&
            (elementSetName ? et.element_set?.name === elementSetName : true)
        )
        .map((et: any) => et.text);
}

// Title -> URL slug
function slugify(title: string): string {
    return title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

// Alt text is stored as the file's Dublin Core Description
function getFileAltText(file: any): string {
    return file?.element_texts?.find((et: any) => et.element?.name === "Description")?.text ?? "";
}

// Fetch an item's files, picking the model and poster plus their alt text
async function getFilesForItem(itemId: number): Promise<{ modelUrl: string; posterUrl: string; posterAlt: string; modelAlt: string }> {
    const res = await fetch(`${OMEKA_URL}/files?item=${itemId}`);

    if(!res.ok) {
        console.error(`Failed to fetch for item ${itemId}: ${res.status}`);
        return { modelUrl: "", posterUrl: "", posterAlt: "", modelAlt: "" };
    }

    const files = await res.json();

    // The .glb model file
    const model = files.find((f: any) =>
        f.original_filename?.toLowerCase().endsWith(".glb")
    );

    // The poster image file
    const poster = files.find((f: any) => f.mime_type?.startsWith("image/"));

    // Route file URLs through the dev proxy (vite.config.ts); use real URLs in production
    const toProxy = (url: string) => isDev
        ? url.replace(/^https?:\/\/[^/]+\/files/, "/omeka-files")
        : url;

    return {
        modelUrl: toProxy(model?.file_urls?.original ?? ""),
        posterUrl: toProxy(poster?.file_urls?.original ?? ""),
        posterAlt: getFileAltText(poster),
        modelAlt: getFileAltText(model),
    };
}

// Real latitude/longitude from the Geolocation plugin, fetched via the item's
// geolocation id. Not every item has one; those return empty and stay off the map.
async function getCoordsForItem(item: any): Promise<{ lat?: number; lng?: number }> {
    const geo = item.extended_resources?.geolocations;
    if (!geo?.id) return {};

    try {
        const res = await fetch(`${OMEKA_URL}/geolocations/${geo.id}`);
        if (!res.ok) return {};

        const data = await res.json();
        const lat = Number(data.latitude);
        const lng = Number(data.longitude);
        return Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : {};
    } catch {
        return {};
    }
}

// Fetch every item across all pages. Omeka returns a fixed page size, so we
// learn it from page one and keep paging until a short or empty page.
async function fetchAllItems(baseUrl: string): Promise<any[]> {
    const all: any[] = [];
    let page = 1;
    let pageSize = 0;

    while (true) {
        const res = await fetch(`${baseUrl}/items?page=${page}`);
        if (!res.ok) {
            console.error(`Failed to fetch items (page ${page}): ${res.status}`);
            break;
        }

        const batch = await res.json();
        if (!Array.isArray(batch) || batch.length === 0) break;

        all.push(...batch);

        if (page === 1) pageSize = batch.length;
        if (pageSize === 0 || batch.length < pageSize) break;

        page++;
        if (page > 200) { // safety valve
            console.warn("Pagination safety stop reached (200 pages).");
            break;
        }
    }

    return all;
}

// Map one Omeka item to a HeritageObject
async function mapOmekaItem(item: any): Promise<HeritageObject> {
    const title = getElement(item, "Title");
    const [files, coords] = await Promise.all([
        getFilesForItem(item.id),
        getCoordsForItem(item),
    ]);

    return {
        id: String(item.id),
        slug: slugify(title),
        title,
        objectType: getElement(item, "Type") as ObjectType,
        storyPathway: getElement(item, "Identifier") as StoryPathway,
        themes: getAllElements(item, "Subject") as Theme[],
        period: getElement(item, "Relation") as Period,
        locations: { primary: getElement(item, "Coverage") as Place },
        // Scoped to Dublin Core so they don't pick up the Item Type Metadata Description
        significance: getElement(item, "Description", "Dublin Core"),
        whyItMatters: getElement(item, "Description", "Dublin Core"),
        whyUse3D: getElement(item, "Description", "Item Type Metadata"),
        modelUrl: files.modelUrl,
        posterUrl: files.posterUrl,
        posterAlt: files.posterAlt,
        modelAlt: files.modelAlt,
        material: getElement(item, "Format", "Dublin Core"),
        accessionNumber: getElement(item, "Source"),
        dateDigitized: getElement(item, "Date Digitized", "Item Type Metadata"),
        omekaUrl: `${OMEKA_PUBLIC_URL}/items/show/${item.id}`,
        lat: coords.lat,
        lng: coords.lng,
    };
}

// Fetch and map all objects (used by the cache below)
async function fetchObjects(): Promise<HeritageObject[]> {
    if (!OMEKA_URL) {
        return sampleObjects;
    }

    try {
        const items = await fetchAllItems(OMEKA_URL);
        if (items.length === 0) {
            return sampleObjects;
        }

        const results = await Promise.allSettled(items.map((item: any) => mapOmekaItem(item)));

        results
            .filter((r) => r.status === "rejected")
            .forEach((r) => console.error("Skipped an item:", (r as PromiseRejectedResult).reason));

        return results
            .filter((r) => r.status === "fulfilled")
            .map((r) => (r as PromiseFulfilledResult<HeritageObject>).value)
            // Keep "Failed Scans" records out of the public site (they remain in Omeka)
            .filter((obj) => obj.storyPathway?.trim().toLowerCase() !== "failed scans");
    } catch (error) {
        console.error("Failed to Fetch Objects from Omeka: ", error);
        return sampleObjects;
    }
}

// Public API

// Fetch once per session and reuse. A sample-data fallback is not cached,
// so a transient API failure can retry on the next call.
let objectsPromise: Promise<HeritageObject[]> | null = null;

export function getObjects(): Promise<HeritageObject[]> {
    if (!objectsPromise) {
        objectsPromise = fetchObjects();
        objectsPromise
            .then((objs) => { if (objs === sampleObjects) objectsPromise = null; })
            .catch(() => { objectsPromise = null; });
    }
    return objectsPromise;
}

export async function getObjectBySlug(slug: string): Promise<HeritageObject | undefined> {
    const objects = await getObjects();
    return objects.find((obj) => obj.slug === slug);
}
