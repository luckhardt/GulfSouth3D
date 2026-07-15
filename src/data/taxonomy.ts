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
export const STORY_CARDS: {
  label: string;
  pathway: StoryPathway;
  slug: string;
  question: string;
  description: string;
}[] = [
  {
    label: "Community Memory",
    pathway: "Community Memory",
    slug: "community-memory",
    question: "What objects survive to tell stories of everyday life, faith, and resistance?",
    description: "South Mississippi's communities have long preserved meaning through the objects of daily life — church bells, mess kits, woven baskets, hotel keys. This pathway traces the material threads of faith, labor, and resistance across Hattiesburg, the Gulf Coast, and beyond. Digitizing these objects in 3D allows us to examine wear patterns, repairs, and maker's marks invisible in photographs.",
  },
  {
    label: "Historic Buildings",
    pathway: "Historic Buildings",
    slug: "historic-buildings",
    question: "How do buildings record South Mississippi's social and architectural history?",
    description: "{/* Temp */} From coastal cottages to institutional halls, the region's buildings hold layered histories of construction, adaptation, and reuse. This pathway follows the architectural record across changing communities and eras.",
  },
  {
    label: "Archaeology",
    pathway: "Archaeology",
    slug: "archaeology",
    question: "What do excavated objects reveal about Indigenous and colonial pasts?",
    description: "{/* Temp */} Excavated fragments and tools offer a material record older than any written account. This pathway traces what the ground itself preserves about the region's earliest inhabitants and the changes that followed.",
  },
  {
    label: "Public Art",
    pathway: "Public Art",
    slug: "public-art",
    question: "How does public art reflect community values and contested histories?",
    description: "{/* Temp */} Murals, sculptures, and monuments shape how communities remember and represent themselves in public space. This pathway examines what public art reveals — and sometimes conceals — about shared and contested histories.",
  },
];
