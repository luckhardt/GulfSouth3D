import type { HeritageObject } from '../types';
import type { Theme, ObjectType, Place, Period, StoryPathway } from '../data/taxonomy';
import { sampleObjects } from "../data/sampleobjects";

const OMEKA_URL = import.meta.env.VITE_OMEKA_API_URL;

//grabs the first value for a given Dublin Core
function getElement (item: any, elementName: string): string {
    const match = item.element_texts?.find(
        (et: any) => et.element?.name === elementName
    )
    return match?.text ?? "";
}

//grabs all the values for a given Dublin Core element
function getAllElements(item: any, elementName: string): string[] {
    return (item.element_texts ?? [])
        .filter((et: any) => et.element?.name === elementName)
        .map((et: any) => et.text);
}

//turns title to a slug for use in URLs
function slugify(title: string): string {
    return title.toLowerCase(). trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

//fetch the item's files and pick out the model and poster files
async function getFilesForItem(itemId: number): Promise<{ modelUrl: string; posterUrl: string }> {
    const res = await fetch(`${OMEKA_URL}/files?item=${itemId}`);

    if(!res.ok) {
        console.error(`Failed to fetch for item ${itemId}: ${res.status}`);
        return { modelUrl: "", posterUrl: ""};
    }

    const files = await res.json();

    //the files which ends in .glb
    const model = files.find((f: any) =>
        f.original_filename?.toLowerCase().endsWith(".glb")
    );

    //The image files
    const poster = files.find((f: any) => f.mime_type?.startsWith("image/"));

    //rewiring through proxy to avoid CORS issues. The proxy is set up in vite.config.ts
    const toProxy = (url: string) => 
         url.replace(/^https?:\/\/[^/]+\/files/, "/omeka-files");
    
    return {
        modelUrl: toProxy(model?.file_urls?.original ?? ""),
        posterUrl: toProxy(poster?.file_urls?.original ?? ""),
    };
}

//MAPPING OMEKA DATA TO HERITAGE OBJECTS

async function mapOmekaItem(item: any): Promise<HeritageObject> {
    const title = getElement(item, "Title");
    const files = await getFilesForItem(item.id);

    return {
        id: String(item.id),
        slug: slugify(title),
        title,
        objectType: getElement(item, "Type") as ObjectType,
        storyPathway: getElement(item, "Identifier") as StoryPathway,
        themes: getAllElements(item, "Subject") as Theme[],
        period: getElement(item, "Relation") as Period,
        locations: { primary: getElement(item, "Coverage") as Place },
        significance: getElement(item, "Description"),
        whyItMatters: getElement(item, "Description"),
        modelUrl: files.modelUrl,
        posterUrl: files.posterUrl,
        material: getElement(item, "Format"),
        accessionNumber: getElement(item, "Source"),
        dateDigitized: getElement(item, "Date"),
        omekaUrl: `${OMEKA_URL?.replace("/api", "")}/items/show/${item.id}`,
    };
}
//Public API

export async function getObjects(): Promise<HeritageObject[]> {
    if (!OMEKA_URL) {
        return sampleObjects;
    }

    try {

        const res = await fetch(`${OMEKA_URL}/items`);
        if(!res.ok) {
            console.error(`Failed to fetch objects: ${res.status}`);
            return sampleObjects;
        }

        const data = await res.json();
        const results = await Promise.allSettled(data.map((item: any) => mapOmekaItem(item)));

        results
            .filter((r) => r.status === "rejected")
            .forEach((r) => console.error("Skipped an item:", (r as PromiseRejectedResult).reason))
        
        return results
            .filter((r) => r.status === "fulfilled")
            .map((r) => (r as PromiseFulfilledResult<HeritageObject>).value);
    } catch(error) {
        console.error("Failed to Fetch Objects from Omeka: ", error);
        return sampleObjects;
    }
}

export async function getObjectBySlug(slug: string): Promise<HeritageObject | undefined> {
    const objects = await getObjects();
    return objects.find((obj) => obj.slug === slug);
}
