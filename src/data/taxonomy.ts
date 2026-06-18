import type { Theme, Location, TimePeriod } from "../types";

export const THEMES: Theme[] = [
  "Native American",
  "African American",
  "Military",
  "USM",
  "Architecture",
  "Public Art",
  "Memorabilia",
];

export const LOCATIONS: Location[] = [
  "Hattiesburg",
  "Gulf Coast",
  "Natchez",
  "Archaeology Lab",
  "USM Campus",
];

export const PERIODS: TimePeriod[] = [
  "Pre-1800",
  "1800-1900",
  "1900-1950",
  "Contemporary",
];

// Homepage category cards (the four hero categories).
export const CATEGORIES: { label: string; theme: Theme }[] = [
  { label: "memorabilia from southern miss", theme: "Memorabilia" },
  { label: "archaeology in south mississippi", theme: "Native American" },
  { label: "historic buildings of usm", theme: "Architecture" },
  { label: "public art in the city of hattiesburg", theme: "Public Art" },
];
