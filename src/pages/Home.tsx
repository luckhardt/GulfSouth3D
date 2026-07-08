import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      {/* HERO STRUCTURE aka MAIN HOME */}
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
    </div>
  );
}

export default Home;