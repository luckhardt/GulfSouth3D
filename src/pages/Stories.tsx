import { Link } from "react-router-dom";
import { STORY_CARDS } from "../data/taxonomy"

function Stories() {
    return (
        <div className="container">
            <p className="eyebrow">Story Pathways</p>
            <h1>Stories from South Mississippi's Material and Spatial Heritage</h1>
            <p>
                Choose a pathway to follow a curated thread through the collection, each shaped by a guiding question about place, people, and memory.
            </p>

            <div className="story-grid">
                {STORY_CARDS.map((card) => (
                    <Link
                        key={card.slug}
                        to={`/stories/${card.slug}`}
                        className="story-card"
                    >
                        <h2>{card.label}</h2>
                        <span className="story-explore">Explore</span>
                    </Link>
                ))}
            </div>

            <p style={{ marginTop: 32}}>
                <Link to="/collection">View the Full Collection</Link>
            </p>
        </div>
    );
}

export default Stories;