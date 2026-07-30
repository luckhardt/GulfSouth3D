import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getObjects } from "../api/omeka";
import { STORY_CARDS } from "../data/taxonomy";
import ObjectCard from "../components/ObjectCard";
import type { HeritageObject } from "../types";
import { PATHWAY_CONTENT } from "../data/pathwayContent";

function StoryPathway() {
    const { slug } = useParams();
    const [objects, setObjects] = useState<HeritageObject[]>([]);
    const [loading, setLoading] = useState(true);

    const card = STORY_CARDS.find((c) => c.slug === slug);
    const content = PATHWAY_CONTENT.find((c) => c.slug === slug);

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
        {/* 1. Hero banner */}
        <div className="story-hero" style={{ backgroundImage: `url(/story-images/${card.slug}.jpg)` }}>
            <div className="story-hero-overlay">
                <p className="eyebrow">Story Pathway</p>
                <h1>{card.label}</h1>
                <p className="story-hero-question">{card.question}</p>
            </div>
        </div>

        <div className="container story-page">
            <Link to="/stories">← Back to Stories</Link>

            {/* 2. Category description */}
            {content?.categoryDefinition && (
                <p className="story-description">{content.categoryDefinition}</p>
            )}

            {/* 3. Three info blocks */}
            {content && (
                <div className="info-grid">
                    <div className="info-card">
                        <h3>South Mississippi</h3>
                        <p>{content.southMississippi}</p>
                    </div>
                    <div className="info-card">
                        <h3>What's Here</h3>
                        <p>{content.materials}</p>
                    </div>
                    <div className="info-card">
                        <h3>What 3D Helps You Notice</h3>
                        <p>{content.whyDigital}</p>
                    </div>
                </div>
            )}

            {/* 4. Pull quotes — one centered-left, two side by side */}
            {content?.pullQuote && content.pullQuote.length === 1 && (
                <div className="pathway-quotes-single">
                    <div className="pathway-quote">
                        <p className="pathway-quote-text">{content.pullQuote[0].text}</p>
                        <p className="pathway-quote-attribution">{content.pullQuote[0].attribution}</p>
                    </div>
                </div>
            )}

            {content?.pullQuote && content.pullQuote.length > 1 && (
                <div className="pathway-quotes-double">
                    {content.pullQuote.map((q, i) => (
                        <div key={i} className="pathway-quote">
                            <p className="pathway-quote-text">{q.text}</p>
                            <p className="pathway-quote-attribution">{q.attribution}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* 5. Featured objects */}
            <h2>Featured Objects</h2>
            <div className="object-grid">
                {featured.map((object) => (
                    <ObjectCard key={object.id} object={object} variant="detailed"/>
                ))}
            </div>

            {/* 6. Theme pills */}
            <h2>What This Pathway Reveals</h2>
            <div className="theme-pills">
                {uniqueThemes.map((theme) => (
                    <span key={theme} className="chip">{theme}</span>
                ))}
            </div>

            {/* 7. Navigation */}
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