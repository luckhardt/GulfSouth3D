import { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { getObjects } from "../api/omeka";
import type { HeritageObject } from "../types";
import { PLACES } from "../data/taxonomy";
import type { Place } from "../data/taxonomy";
import "leaflet/dist/leaflet.css";
import ObjectMarker from "../components/ObjectMarker";
import FlyTo from "../components/FlyTo";

// Places each object at its real coordinate (from the Omeka Geolocation plugin).
// Objects sharing an identical coordinate (e.g. several from the same lab) are
// fanned out slightly so they don't stack. Objects without coordinates are
// left off the map.
function withPositions(objects: HeritageObject[]): (HeritageObject & { position: [number, number] })[] {
  const groups = new Map<string, (HeritageObject & { lat: number; lng: number })[]>();

  for (const obj of objects) {
    if (typeof obj.lat !== "number" || typeof obj.lng !== "number") continue;
    const key = `${obj.lat},${obj.lng}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(obj as HeritageObject & { lat: number; lng: number });
  }

  const result: (HeritageObject & { position: [number, number] })[] = [];

  for (const group of groups.values()) {
    if (group.length === 1) {
      const o = group[0];
      result.push({ ...o, position: [o.lat, o.lng] });
    } else {
      const radius = 0.0006; // ~65 m, just enough to separate identical points
      group.forEach((o, i) => {
        const angle = (2 * Math.PI * i) / group.length;
        result.push({ ...o, position: [o.lat + radius * Math.sin(angle), o.lng + radius * Math.cos(angle)] });
      });
    }
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

      <div className="container story-page">
        <div className="pathway-quote-hero">
          <p className="pathway-quote-text">
            "Warm skies and gulf blue streams are in my blood. I belong with the smell of fresh pine, with the trail of coon, and the spring growth of wild onion."
          </p>
          <p className="pathway-quote-attribution">- Margaret Walker, <em>“Sorrow Home”</em></p>
        </div>
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
            {withPositions(objects).map((object) => (
              <ObjectMarker key={object.id} object={object} position={object.position} />
            ))}
          </MapContainer>
        </div>
      </div>

      <section className="container">
        <img src="/map-end.jpg" alt="pic of map end" className="home-logo" />
      </section>
    </div>
  );
}

export default MapPage;
