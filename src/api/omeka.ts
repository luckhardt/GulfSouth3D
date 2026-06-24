import type { HeritageObject } from "../types";
import { sampleObjects}  from "../data/sampleobjects";

//the Omeka S API base URL, reads from .env file
//If it is blank we fall back to the sample data so we can continue developing.

const OMEKA_URL = import.meta.env.VITE_OMEKA_API_URL;

//Omeka stores each property as an array like
//[{"@value": "Hattiesburg"}]. This pulls out the first value

function val(item: any, prop: string): string{
    return item[prop]?.[0]?.["@value"]??"";
}

//Transforming raw Omeka item (JSON) into the HeritageObject Shape

function mapOmekaItem(item:any): HeritageObject {
    return {
        id: String(item["o:id"]),
        slug: val(item, "dcterms:identifier") || String(item["o:id"]),
        title: item["o:title"] ?? "Untitled",
        objectType: val(item, "dcterms:type") as HeritageObject["objectType"],
        storyPathway: val(item, "dcterms:subject") as HeritageObject["storyPathway"],
        themes: [val(item, "dcterms:subject")] as HeritageObject["themes"],
        period: val(item, "dcterms:temporal") as HeritageObject["period"],
        locations: { primary: val(item, "dcterms:spatial") as any },
        significance: val(item, "dcterms:abstract"),
        whyItMatters: val(item, "dcterms:description"),
        modelUrl: item["o:media"]?.[0]?.["o:original_url"] ?? "",
        omekaUrl: item["@id"],
    };
}

//Get ALL object. Fall back to sample data if no Omeka URL is in place.
export async function getObjects(): Promise<HeritageObject[]>{
    if (!OMEKA_URL){
        return sampleObjects;  //no omeka yet??-> use the sample data

    }

    const res = await fetch(`${OMEKA_URL}/items`);
    const data = await res.json();
    return data.map(mapOmekaItem);
}

//now we get ONE object by its slug
export async function getObjectBySlug(
    slug: string
): Promise<HeritageObject | undefined> {
    const objects = await getObjects();
    return objects.find((o) => o.slug ===slug);

}

