import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getObjects } from "../api/omeka";
import { STORY_CARDS } from "../data/taxonomy";
import ObjectCard from "../components/ObjectCard";
import type { HeritageObject } from "../types";

function StoryPathway() {
    const { slug } = useParams();
    const [objects, setObjects] = useState<HeritageObject[]>([]);
    const [loading, setLoading] = useState(true);

    const card = STORY_CARDS.find((c) => c.slug === slug);

    useEffect(() => {
        getObjects().then((data) => {
            setObjects(data);
            setLoading(false);
        });
}, []);

if (loading) return <div className="container"><p>Loading..</p></div>;

if (!card) {
    return (
        <div className="container">
            <h1>Story not found</h1>
            <Link to="/stories">Back to Stories</Link>
        </div>
    );
}

const featured = objects.filter((o) => o.storyPathway === card.pathway);
const allThemes = featured.flatMap((object) => object.themes);
const uniqueThemes = [...new Set(allThemes)];

return (
    <div>
        <div className="story-hero" style={{ backgroundImage: `url(/story-images/${card.slug}.jpg)` }}>
            <div className="story-hero-overlay">
                <p className="eyebrow">Story Pathway</p>
                <h1>{card.label}</h1>
                <p className="story-hero-question">{card.question}</p>
            </div>
        </div>
    

        <div className="container story-page">
            <Link to="/stories">← Back to Stories</Link>

            <p className="story-description">{card.description}</p>


            <div className="object-grid">
                {featured.map((object) => (
                    <ObjectCard key={object.id} object={object} variant="detailed"/>
                ))}
            </div>

                <h2>What This Pathway Reveals</h2>

                <div className="theme-pills">
                    {uniqueThemes.map((theme) => (
                        <span key={theme} className="chip">{theme}</span>
                    ))}
                </div>
                
                <div className="pathway-actions">
                    <Link to="/stories" className="btn btn-solid">All Stories</Link>
                    <Link to="/collection" className="btn btn-solid">Browse Collection</Link>
                    <Link to="/map" className="btn btn-solid">Explore the Map</Link>
                </div>

            </div>
        </div>
    );
}

export default StoryPathway;