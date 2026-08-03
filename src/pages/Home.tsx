import { Link } from "react-router-dom";
import { STORY_CARDS } from "../data/taxonomy";
import { useState, useEffect } from "react";
import { getObjects } from "../api/omeka";
import type { HeritageObject } from "../types";
import ObjectCard from "../components/ObjectCard";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { coordsFor, PLACE_COORDS } from "../data/placeCoords";
import type { Place } from "../data/taxonomy";
import "leaflet/dist/leaflet.css";

// Fisher-Yates shuffle — picks N random items without mutating the original array
function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

function Home() {
  const [featured, setFeatured] = useState<HeritageObject[]>([]);

  useEffect(() => {
    getObjects().then((data) => {
      setFeatured(getRandomItems(data, 4));
    });
  }, []);

  return (
    <div>
      {/* \ Hero \ */}
      <section className="hero">
        <div className="hero-overlay">
          <p className="hero-eyebrow">University of Southern Mississippi · Center for Digital Humanities</p>
          <h1 className="hero-title">Digitizing the Cultural Heritage of South Mississippi</h1>
          <p className="hero-subtitle">Discover the culture and history of the region in 3D</p>
          <div className="hero-buttons">
            <Link to="/stories" className="btn btn-solid">Explore the Stories</Link>
            <Link to="/collection" className="btn btn-ghost hero-ghost">Browse the Collection</Link>
          </div>
        </div>
      </section>

      {/* \ Three info cards — no quotes inside \ */}
      <section className="container">
        <div className="info-grid">
          <div className="info-card">
            <h3>What is Cultural Heritage?</h3>
            <p>
              Cultural heritage includes the objects, places, landscapes, artworks, and records through which people preserve and interpret the past. Not only does it include official historic sites and museum objects, but also ordinary things kept by families, religious organizations, veterans, alumni, and local communities. Cultural heritage matters because it shows how people make meaning from the places they live, the things they keep, and the histories they choose to remember.
            </p>
          </div>
          <div className="info-card">
            <h3>Why South Mississippi?</h3>
            <p>
              Like all histories, South Mississippi's cultural heritage survives in fragments: objects kept, buildings preserved, archaeological traces recovered, and artworks placed in public view. Studied together, this material culture shows how regional history is made and survives through memory, place, and connection. South Mississippi has long been a crossroads, from the loess bluffs of the Mississippi River to the Piney Woods to the Gulf Coast. This regional history also connects to larger national and global historical processes.
            </p>
          </div>
          <div className="info-card">
            <h3>Why 3D Cultural Heritage?</h3>
            <p>
              A 3D model changes how we encounter the past. We can turn an object, examine its surface, or see marks of use, age, or damage and repair. Many historical objects are fragile and not suitable for handling. 3D models let us encounter them. For buildings and public art, 3D helps us understand its scale and the relationship between a site and its surroundings. These models are not meant to replace the original objects or places. They are another way to study them.
            </p>
          </div>
        </div>
      </section>

      {/* \ Quote band 1: Faulkner \ */}
      <div className="quote-band-fade">
        <blockquote className="quote-band-text">
          "The past is never dead. It's not even past."
        </blockquote>
        <p className="quote-band-attribution">William Faulkner, <em>Requiem for a Nun</em></p>
      </div>

      {/* \ Story pathway cards \ */}
      <section className="container">
        <h2>Explore by Story Pathway</h2>
        <div className="story-grid">
          {STORY_CARDS.map((card) => (
            <Link
              key={card.slug}
              to={`/stories/${card.slug}`}
              className="story-card-image"
              style={{ backgroundImage: `url(/story-images/${card.slug}.jpg)` }}
            >
              <div>
                <h3>{card.label}</h3>
                <span className="story-explore">Explore →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* \ Quote band 2: Margaret Walker \ */}
      <div className="quote-band-fade">
        <blockquote className="quote-band-text">
          "My grandmothers are full of memories."
        </blockquote>
        <p className="quote-band-attribution">Margaret Walker, "Lineage"</p>
      </div>

      {/* \ Featured collection \ */}
      <section className="container">
        <h2>Featured from the Collection</h2>
        <div className="object-grid">
          {featured.map((object) => (
            <ObjectCard key={object.id} object={object} />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <Link to="/collection" className="btn btn-solid">Explore the Full Collection →</Link>
        </div>
      </section>

      {/* \ Map peek \ */}
      {/* Markers filtered to known place values to prevent Leaflet crash */}
      <section className="container">
        <h2>Explore by Place</h2>
        <div className="map-peek">
          <MapContainer
            center={[31.2, -89.5]}
            zoom={7}
            className="map-container"
            style={{ height: "100%" }}
            zoomControl={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {featured
              .filter((object) => PLACE_COORDS[object.locations.primary as Place])
              .map((object) => (
                <Marker key={object.id} position={coordsFor(object.locations.primary)} />
              ))}
          </MapContainer>
          <Link to="/map" className="map-peek-overlay">
            <span className="map-peek-label">View Full Map →</span>
          </Link>
        </div>
      </section>
      <section className="container">
        <img src="/Dome.jpg" alt="pic of dome" className="home-logo" />
      </section>
    </div>
  );
} 

export default Home;