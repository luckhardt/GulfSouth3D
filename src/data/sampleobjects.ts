import type {HeritageObject} from "../types";

// Sample data for two digitized heritage objects. These are used in the development and testing of the Collection Page and Object Detail Page. In a production version of the app, this data would be fetched from an API instead of being hardcoded.
export const sampleObjects: HeritageObject[] = [
  {
    id: "obj-001",
    slug: "african-american-church-bell-fragment",
    title: "African American Church Bell Fragment",
    objectType: "Memorabilia",
    storyPathway: "Community Memory",
    themes: ["African American Histories", "Public Memory"],
    period: "Nineteenth Century",
    locations: {
      primary: "Hattiesburg",
      holding: "USM Campus",
      digitization: "USM Campus",
    },
    significance:
      "A surviving fragment of a bell that once called a historic black congregation to worship.",
    whyItMatters:
      "This fragment is one of the few material traces of a congregation central to its community's life. In 3D, the casting marks and wear become legible, linking present-day viewers to the generations who gathered as its sound.",
    modelUrl: "/models/Duck.glb",
    material: "Bronze",
    dimensions: "18 x 14 x 9 cm",
    accessionNumber: "CDH-2024-001",
    dateDigitized: "2024-09-12",
  },
  {
    id: "obj-002",
    slug: "biloxi-lighthouse-lantern-housing",
    title: "Biloxi Lighthouse Lantern Housing",
    objectType: "Building/Site",
    storyPathway: "Historic Buildings",
    themes: ["Built Environment", "Civic Identity"],
    period: "Nineteenth Century",
    locations: {
      primary: "Gulf Coast",
      holding: "USM Campus",
      digitization: "USM Campus",
    },
    significance:
      "A cast-iron lantern housing from the historic Biloxi Lighthouse on the Mississippi Gulf Coast.",
    whyItMatters:
      "This piece represents the engineering and craftsmanship of the late nineteenth century, showcasing the architectural details and construction techniques of the era.",
    modelUrl: "/models/Duck.glb",
    material: "Cast iron",
    dimensions: "120 × 90 × 90 cm",
    accessionNumber: "CDH-2024-002",
    dateDigitized: "2024-09-20",
  },
];