import { Link } from "react-router-dom";
import { STORY_CARDS } from "../data/taxonomy";
import { useState, useEffect } from "react";
import{ getObjects } from "../api/omeka";
import type { HeritageObject } from "../types";
import ObjectCard from "../components/ObjectCard";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { coordsFor } from "../data/placeCoords";
import "leaflet/dist/leaflet.css";

//Random generator
function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array];  //we are copying to not mutate the original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
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
      {/* HERO STRUCTURE aka MAIN SCREEN that is seen just after opening the site */}
      <section className="hero">
        <div className="hero-overlay">
          <p className="hero-eyebrow">University of Southern Mississippi · Center for Digital Humanities</p>
          <h1 className="hero-title">digitizing the cultural heritage of south mississippi</h1>
          <p className="hero-subtitle">
            3D models of artifacts, buildings, and public art — preserved in
            partnership with the communities who hold their history.
          </p>
          <div className="hero-buttons">
            <Link to="/stories" className="btn btn-solid">Explore the Stories</Link>
            <Link to="/collection" className="btn btn-ghost hero-ghost">Browse the Collection</Link>
          </div>
        </div>
      </section>
      
      {/*Information that sits just below the hero section */}
      <section className="container">
        <div className="info-grid">
          <div className="info-card">
            <h3>What is this project?</h3>
            <p>
              {/* Temp*/}GulfSouth3D is a multi-year effort to create high-fidelity 3D scans
                of cultural heritage objects from South Mississippi — made freely
                available to researchers, educators, and the public.
              </p>
          </div>
          <div className="info-card">
            <h3>Why South Mississippi?</h3>
            <p>
              {/* Temp */}The Gulf Coast, Piney Woods, and Natchez regions hold layered
              histories — Indigenous, military, civic, and everyday — that remain
              underrepresented in national digitization efforts.
            </p>
          </div>
          <div className="info-card">
            <h3>Why 3D cultural Heritage?</h3>
            <p>
              {/* Temp */}3D models capture surface detail that photographs miss, support
              remote research and teaching, and let communities engage with
              objects that may be held far from home.
            </p>
          </div>
        </div>
      </section>

      {/* Story Cards */}
      <section className="container">
        <h2>Explore by Story Pathway</h2>
        <div className="story-grid">
          {STORY_CARDS.map((card) => (
            <Link 
              key={card.slug} 
              to={`/stories/${card.slug}`} 
              className="story-card-image"
              style={{ backgroundImage: `url(/story-images/${card.slug}.jpg)`}}
              >
              <div>
                <h3>{card.label}</h3>
                <span className="story-explore">Explore →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container">
        <h2>Featured from the Collection</h2>
        <div className="object-grid">
          {featured.map((object) => (
            <ObjectCard key={object.id} object={object} />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "24px"}}>
          <Link to="/collection" className="btn btn-solid">Explore the Full Collection →</Link>
        </div>
      </section>

      <section className="container">
          <h2>Explore by Place</h2>
          <div className="map-peek">
            <MapContainer center={[31.2, -89.5]} zoom={7} className="map-container" style={{ height:"100%"}} zoomControl={false}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              {featured.map((object) => (
                <Marker key={object.id} position={coordsFor(object.locations.primary)} />

              ))}
            </MapContainer>
            <Link to="/map" className="map-peek-overlay">
              <span className="map-peek-label">View Full Map →</span>
            </Link>
          </div>
      </section>
    </div>
  );

}
export default Home;
