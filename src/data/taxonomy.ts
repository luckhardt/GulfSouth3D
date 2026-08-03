//Single source of truth for all controlled vocabs
//Each list is written once; its type is delivered automatically

export const STORY_PATHWAYS = [
  "Community Memory",
  "Historic Buildings",
  "Archaeology",
  "Public and Decorative Arts",
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
export const STORY_CARDS: {
  label: string;
  pathway: StoryPathway;
  slug: string;
  question: string;
  teaser: string;
}[] = [
  {
    label: "Community Memory",
    pathway: "Community Memory",
    slug: "community-memory",
    question: "Whose memory does this object help preserve? ",
    teaser: "From church bells to mess kits, the objects of daily life carry the weight of South Mississippi's communities — their faith, labor, and resilience across generations.",
  },
  {
    label: "Historic Buildings",
    pathway: "Historic Buildings",
    slug: "historic-buildings",
    question: "How does this place shape the region's story? ",
    teaser: "Buildings hold more than walls and rooflines — they record the social forces, communities, and decisions that shaped South Mississippi across centuries of change.",
  },
  {
    label: "Archaeology",
    pathway: "Archaeology",
    slug: "archaeology",
    question: "What can these material traces tell us about lives not fully preserved in written records? ",
    teaser: "Beneath the surface of South Mississippi lies a material record older than any written account — fragments that speak to the region's earliest inhabitants and the upheavals that followed.",
  },
  {
    label: "Public and Decorative Arts",
    pathway: "Public and Decorative Arts",
    slug: "public-art",
    question: "How does art make shared or everyday spaces meaningful?",
     teaser: "Murals, monuments, and sculptures shape how communities see themselves in public space — celebrating some histories while obscuring others.",
  },
];
