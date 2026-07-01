import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import { getObjects } from "../api/omeka";
import { coordsFor } from "../data/placeCoords";
import type { HeritageObject } from "../types";
import "leaflet/dist/leaflet.css";

function MapPage() {
  const [objects, setObjects] = useState<HeritageObject[]>([]);

    useEffect(() => {
        getObjects().then((data) => setObjects(data));
    }, []);

  return (
    <div className="container">
        <p className="eyebrow">Geography</p>
        <h1>Explore by Place</h1>
        <p>Object span Hattiesburg, the Gulf Coast, Natchez, and the Piney Woods.</p>

        <MapContainer center={[31.2, -89.5]} zoom={7} className="map-container">
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            {objects.map((object) => (
                <Marker key={object.id} position={coordsFor(object.locations.primary)}>
                    <Popup>
                        <strong>{object.title}</strong><br />
                        <Link to={`/collection/${object.slug}`}>View Object</Link>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    </div>
  );
}

export default MapPage;
