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

return (
    <div className="container">
        <Link to="/stories">Back to Stories</Link>
        <p className="eyebrow">Story Pathway</p>
        <h1>{card.label}</h1>

        <div className="object-grid">
            {featured.map((object) =>(
                <ObjectCard key={object.id} object={object}/>
            ))}
        </div>
    </div>
    );
}

export default StoryPathway;