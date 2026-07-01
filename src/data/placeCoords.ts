import type { Place } from "./taxonomy";

//Now we approximate the coordinates of each place in the controlled vocabulary. These are used to center the map on the browse page and to provide a default location for new objects in the object editor form. In a production version of the app, these coordinates would be fetched from an API instead of being hardcoded.
export const PLACE_COORDS: Record<Place, [number, number]> = {
    "Hattiesburg": [31.3271, -89.2903],
    "USM Campus": [31.3256, -89.3072],
    "Gulf Coast": [30.3674, -88.5391],
    "Piney Woods": [31.0000, -89.0000],
    "Natchez": [31.5604, -91.4032],
    "Other South Mississippi": [31.0000, -89.5000],
};

export function coordsFor(place: Place): [number, number] {
    return PLACE_COORDS[place];
}