//The shape of one digitized heritage objecct.
import type {
  Theme,
  StoryPathway,
  ObjectType,
  Place,
  Period,
} from "./data/taxonomy";

//An object can be tied to several places, each with a different theme
export interface ObjectLocation {
  primary: Place; 
  recovery?: Place;         // ? is used to indicate that this field is optional
  holding?: Place;
  digitization?: Place;
}

export interface HeritageObject {
  id: string;
  slug: string; 
  title: string;
  objectType: ObjectType;
  storyPathway: StoryPathway;
  themes: Theme[];
  period: Period;
  locations: ObjectLocation;
  significance: string;
  whyItMatters: string;
  modelUrl: string;
  posterUrl?: string;
  material?: string;
  dimensions?: string;
  accessionNumber?: string;
  dateDigitized?: string; // ISO format date string (e.g., "2024-09-12")
  omekaUrl? : string; // URL to the object's page in the Omeka S collection, if applicable
}

//The active filters on the Collectiion Page.
export interface Filters {
  storyPathways: StoryPathway[];
  themes: Theme[];
  objectTypes: ObjectType[];
  places: Place[];
  periods: Period[];
  query: string; // Search query string
}