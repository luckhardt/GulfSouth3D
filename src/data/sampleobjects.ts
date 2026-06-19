import type {HeritageObject} from "../types";

export const sampleObjects: HeritageObject[] = [
  {
    id: "obj-001",
    title: "African American Church Bell Fragment",
    description:
      "A fragment of a cast bronze church bell recovered from a historic congregation in Hattiesburg.",
    themes: ["African American"],
    location: "Hattiesburg",
    timePeriod: "1800-1900",
    modelUrl: "/models/bell-fragment.glb",
    material: "Bronze",
    dimensions: "18 × 14 × 9 cm",
    accessionNumber: "CDH-2024-001",
    dateDigitized: "2024-09-12",
  },
  {
    id: "obj-002",
    title: "Biloxi Lighthouse Lantern Housing",
    description:
      "The cast-iron lantern housing from the historic Biloxi Lighthouse on the Mississippi Gulf Coast.",
    themes: ["Architecture"],
    location: "Gulf Coast",
    timePeriod: "1800-1900",
    modelUrl: "/models/biloxi-lantern.glb",
    material: "Cast iron",
    dimensions: "120 × 90 × 90 cm",
    accessionNumber: "CDH-2024-002",
    dateDigitized: "2024-09-20",
  },
];