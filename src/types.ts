// Core data model for a digitized cultural heritage object.

export type Theme =
  | "Native American"
  | "African American"
  | "Military"
  | "USM"
  | "Architecture"
  | "Public Art"
  | "Memorabilia";

export type Location =
  | "Hattiesburg"
  | "Gulf Coast"
  | "Natchez"
  | "Archaeology Lab"
  | "USM Campus";

export type TimePeriod =
  | "Pre-1800"
  | "1800-1900"
  | "1900-1950"
  | "Contemporary";

export interface HeritageObject {
  id: string;
  title: string;
  description: string;
  themes: Theme[];
  location: Location;
  timePeriod: TimePeriod;
  /** URL to the .glb model (Omeka media original_url, or a local/sample path). */
  modelUrl: string;
  /** Optional poster/thumbnail image. */
  posterUrl?: string;
  material?: string;
  dimensions?: string;
  accessionNumber?: string;
  dateDigitized?: string;
  /** Link back to the Omeka S record (system of record). */
  omekaUrl?: string;
}

export interface Filters {
  themes: Theme[];
  locations: Location[];
  periods: TimePeriod[];
  query: string;
}
