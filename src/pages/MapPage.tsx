import { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { getObjects } from "../api/omeka";
import { coordsFor } from "../data/placeCoords";
import type { HeritageObject } from "../types";
import { PLACES } from "../data/taxonomy";
import type { Place } from "../data/taxonomy";
import "leaflet/dist/leaflet.css";
import ObjectMarker from "../components/ObjectMarker";
import FlyTo from "../components/FlyTo";

function spreadOverlapping(objects: HeritageObject[]): (HeritageObject & { position: [number, number] })[] {
  const groups = new Map<string, HeritageObject[]>();

  for (const obj of objects) {
    const place = obj.locations.primary;
    if (!groups.has(place)) groups.set(place, []);
    groups.get(place)!.push(obj);
  }

  const result: (HeritageObject & { position: [number, number] })[] = [];

  for (const group of groups.values()) {
    const [baseLat, baseLng] = coordsFor(group[0].locations.primary);
    const radius = 0.03;

    group.forEach((obj, i) => {
      if (group.length === 1) {
        result.push({ ...obj, position: [baseLat, baseLng] });
      } else {
        const angle = (2 * Math.PI * i) / group.length;
        const lat = baseLat + radius * Math.sin(angle);
        const lng = baseLng + radius * Math.cos(angle);
        result.push({ ...obj, position: [lat, lng] });
      }
    });
  }

  return result;
}

function MapPage() {
  const [objects, setObjects] = useState<HeritageObject[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  useEffect(() => {
    getObjects().then((data) => setObjects(data));
  }, []);

 return (
    <div>
        {/* Full-width hero — outside container so it bleeds edge to edge */}
        <div className="map-hero">
            <p className="eyebrow">Geography</p>
            <h1>Explore by Place</h1>
            <p className="page-subtitle">Objects span Hattiesburg, the Gulf Coast, Natchez, and the Piney Woods.</p>
        </div>

        {/* Map content — inside container */}
        <div className="container">
            <div className="collection-layout">
                <aside className="filter-sidebar">
                    <h2 className="filter-heading">Places</h2>
                    <ul className="place-list">
                        {PLACES.map((place) => {
                            const count = objects.filter((o) => o.locations.primary === place).length;
                            return (
                                <li key={place}>
                                    <button
                                        className={`place-item ${selectedPlace === place ? "active" : ""}`}
                                        onClick={() => setSelectedPlace(place)}
                                    >
                                        <span>{place}</span>
                                        <span className="place-count">{count}</span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </aside>

                <MapContainer center={[31.2, -89.5]} zoom={7} className="map-container">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; OpenStreetMap contributors"
                    />
                    <FlyTo place={selectedPlace} />
                    {spreadOverlapping(objects).map((object) => (
                        <ObjectMarker key={object.id} object={object} position={object.position}/>
                    ))}
                </MapContainer>
            </div>
        </div>
    </div>
  );
}

export default MapPage;