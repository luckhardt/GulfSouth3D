//Single source of truth for all controlled vocabs
//Each list is written once; its type is delivered automatically

export const STORY_PATHWAYS = [
  "Community Memory",
  "Historic Buildings",
  "Archaeology",
  "Public Art",
] as const;
export type StoryPathway = (typeof STORY_PATHWAYS)[number];

// Controlled vocabularies for object metadata fields. These are used in the object editor form and in filters on the browse page. Each list is written once; its type is delivered automatically.
export const THEMES = [
  "Indigenous Histories",
  "African American Histories",
  "Military and War",
  "University History",
  "Education",
  "Public Memory",
  "Built Environment",
  "Everyday Life",
  "Civic Identity",
  "Public Art",
  "Institutional Culture",
  "Environmental History",
] as const;
export type Theme = (typeof THEMES)[number];

export const OBJECT_TYPES = [
  "Archaeological Objects",
  "Building/Site",
  "Public Artwork",
  "Memorabilia",
  "Institutional Object",
  "Architectural feature",
  "Landscape/Site Model",
] as const;
export type ObjectType = (typeof OBJECT_TYPES)[number];


export const PLACES = [
  "Hattiesburg",
  "USM Campus",
  "Gulf Coast",
  "Piney Woods",
  "Natchez",
  "Other South Mississippi",
] as const;
export type Place = (typeof PLACES)[number];

export const PERIODS = [
  "Pre-1540",
  "1540-1799",
  "1800-1899",
  "1900-1940",
  "1941-1959",
  "1960-1999",
  "2000 – present",
] as const;
export type Period = (typeof PERIODS)[number];

//Homepage story-pathway tags
export const STORY_CARDS: {label : string; pathway: StoryPathway; slug: string}[] = [
  {label: "Community Memory", pathway: "Community Memory", slug: "community-memory"},
  {label: "Historic Buildings", pathway: "Historic Buildings", slug: "historic-buildings"},
  {label: "Archaeology", pathway: "Archaeology", slug: "archaeology"},
  {label: "Public Art", pathway: "Public Art", slug: "public-art"},
];
