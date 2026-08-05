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
    teaser: "Follow stories of objects people kept, displayed, and reinterpreted. These models trace how uniforms, memorabilia, and personal possessions became evidence of pride, humor, and belonging, connecting individual lives to the families, schools, and communities that gave them meaning.",
  },
  {
    label: "Historic Buildings",
    pathway: "Historic Buildings",
    slug: "historic-buildings",
    question: "How does this place shape the region's story? ",
    teaser: "Follow stories of places people built, preserved, and contested. These models examine buildings as spaces of worship, education, performance, and civic life, showing how South Mississippi's communities organized public life through the places where they gathered. ",
  },
  {
    label: "Archaeology",
    pathway: "Archaeology",
    slug: "archaeology",
    question: "What can these material traces tell us about lives not fully preserved in written records? ",
    teaser: "Follow stories told by fragments, traces, and things recovered from the ground. These models examine tools, ceramics, and other materials as evidence of making, use, and survival, revealing histories not fully preserved in written records across Indigenous, colonial, and later South Mississippi landscapes.",
  },
  {
    label: "Public and Decorative Arts",
    pathway: "Public and Decorative Arts",
    slug: "public-art",
    question: "How does art make shared or everyday spaces meaningful?",
     teaser: "Follow stories of art in shared and everyday spaces. These models examine murals, ceramics, and public-facing installations as works that shape how people encounter landscape, memory, and local identity through designed and visible artwork.",
  },
];
