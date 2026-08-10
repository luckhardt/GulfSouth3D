import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { getObjects } from "../api/omeka";
import { STORY_CARDS } from "../data/taxonomy";
import { PATHWAY_CONTENT } from "../data/pathwayContent";
import ObjectCard from "../components/ObjectCard";
import type { HeritageObject } from "../types";

// Fisher-Yates shuffle — returns up to `count` random items without mutating the input
function getRandomItems<T>(array: T[], count: number): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
}

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

    // All objects in this pathway (used for the full theme list)
    const pathwayObjects = useMemo(
        () => (card ? objects.filter((o) => o.storyPathway === card.pathway) : []),
        [objects, card]
    );

    // Show up to 4 objects from this pathway, reshuffled on each page load
    const featured = useMemo(() => getRandomItems(pathwayObjects, 4), [pathwayObjects]);

    // Themes reflect the whole pathway, not just the 4 shown
    const uniqueThemes = useMemo(
        () => [...new Set(pathwayObjects.flatMap((object) => object.themes))],
        [pathwayObjects]
    );

    if (loading) return <div className="container"><p>Loading...</p></div>;

    if (!card) {
        return (
            <div className="container">
                <h1>Story not found</h1>
                <Link to="/stories">← Back to Stories</Link>
            </div>
        );
    }

    return (
        <div>
            {/* 1. Hero — label and eyebrow only, no question */}
            <div className="story-hero" style={{ backgroundImage: `url(/story-heroes/${card.slug}.jpg)` }}>
                <div className="story-hero-overlay">
                    <p className="eyebrow">Story Pathway</p>
                    <h1>{card.label}</h1>
                </div>
            </div>

            <div className="container story-page">
                {/* 2. Pull quote from pathwayContent */}
                {content?.pullQuotes && content.pullQuotes.length > 0 && (
                    <div className="pathway-quote-hero">
                        <p className="pathway-quote-text">{content.pullQuotes[0].text}</p>
                        <p className="pathway-quote-attribution">{content.pullQuotes[0].attribution}</p>
                    </div>
                )}

                {/* 3. Leading question — styled prominently */}
                <p className="story-leading-question">{card.question}</p>

                {/* 4. Category definition */}
                {content?.categoryDefinition && (
                    <p className="story-description">{content.categoryDefinition}</p>
                )}

                {/* 5. Three info blocks */}
                {content && (
                    <div className="info-grid">
                        <div className="info-card">
                            <h3>South Mississippi</h3>
                            <p>{content.southMississippi}</p>
                        </div>
                        <div className="info-card">
                            <h3>What's in the Collection</h3>
                            <p>{content.materials}</p>
                        </div>
                        <div className="info-card">
                            <h3>What 3D Helps You Notice</h3>
                            <p>{content.whyDigital}</p>
                        </div>
                    </div>
                )}

                {/* 6. Featured objects */}
                <h2>Featured Objects</h2>
                <div className="object-grid">
                    {featured.map((object) => (
                        <ObjectCard key={object.id} object={object} variant="detailed" />
                    ))}
                </div>

                {/* 7. Theme pills */}
                <h2>What This Pathway Reveals</h2>
                <div className="theme-pills">
                    {uniqueThemes.map((theme) => (
                        <span key={theme} className="chip">{theme}</span>
                    ))}
                </div>

                {/* 8. Navigation */}
                <div className="pathway-actions">
                    <Link to="/stories" className="btn btn-solid">All Stories</Link>
                    <Link to="/collection" className="btn btn-solid">Browse Collection</Link>
                    <Link to="/map" className="btn btn-solid">Explore the Map</Link>
                </div>
                {(() => {
                    // Editorial pathway order for prev/next (Archaeology follows Community Memory)
                    const order = ["community-memory", "archaeology", "historic-buildings", "public-and-decorative-arts"];
                    const currentIndex = order.indexOf(slug ?? "");
                    const prev = STORY_CARDS.find((c) => c.slug === order[currentIndex - 1]);
                    const next = STORY_CARDS.find((c) => c.slug === order[currentIndex + 1]);

                    return (
                        <div className="pathway-nav">
                            {prev ? (
                                <Link to={`/stories/${prev.slug}`} className="pathway-nav-link pathway-nav-prev">
                                    <span className="pathway-nav-label">← {prev.label}</span>
                                </Link>
                            ) : <div />}

                            {next ? (
                                    <Link to={`/stories/${next.slug}`} className="pathway-nav-link pathway-nav-next">
                                        <span className="pathway-nav-label">{next.label} →</span>
                                    </Link>
                                ) : <div />}
                        </div>
                    );
                })()}
            </div>
        </div>
    );
}

export default StoryPathway;