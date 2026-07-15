import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { coordsFor } from "../data/placeCoords";
import type { Place } from "../data/taxonomy";

function FlyTo({ place }: { place: Place | null }) {
  const map = useMap();

  useEffect(() => {
    if (place) {
      map.flyTo(coordsFor(place), 10);
    }
  }, [place, map]);

  return null;
}

export default FlyTo;