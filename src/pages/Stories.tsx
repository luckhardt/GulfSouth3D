import { Link } from "react-router-dom";
import { STORY_CARDS } from "../data/taxonomy";

function Stories() {
    return (
        <div>
            <div className="stories-hero">
                <p className="eyebrow">Story Pathways</p>
                <h1>Stories from South Mississippi's Material and Spatial Heritage</h1>
                <p>
                    Choose a pathway to follow a curated thread through the collection —
                    each one shaped by a guiding question about place, people, and memory
                    in South Mississippi.
                </p>
            </div>

            <div className="container">
                <div className="stories-grid">
                    {STORY_CARDS.map((card) => (
                        <Link
                            key={card.slug}
                            to={`/stories/${card.slug}`}
                            className="story-card-image"
                            style={{ backgroundImage: `url(/story-images/${card.slug}.jpg)` }}
                        >
                            <div>
                                <span className="eyebrow">{card.label}</span>
                                <h2>{card.question}</h2>
                                <span className="story-explore">Explore →</span>
                            </div>
                        </Link>
                    ))}
                </div>

                <p style={{ marginTop: 32, textAlign: "center" }}>
                    <Link to="/collection">Prefer to browse by object? View the full collection →</Link>
                </p>
            </div>
        </div>
    );
}

export default Stories;