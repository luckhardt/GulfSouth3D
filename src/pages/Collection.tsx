import { useState, useEffect } from "react";
import ObjectCard from "../components/ObjectCard";
import { getObjects } from "../api/omeka";
import type { HeritageObject } from "../types";
import { STORY_PATHWAYS, type StoryPathway } from "../data/taxonomy";

function Collection() {
    //State is a place to hold the objects and the loading flag
    const [objects, setObjects] = useState<HeritageObject[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState(""); //the search text
    const [pathways, setPathways] = useState<StoryPathway[]>([])  //selected pathways

    //Effect is run once when the page loads and it fetches the data
    useEffect(() => {
        getObjects().then((data) => {
            setObjects(data);
            setLoading(false);
        }); 
    }, []);

    function togglePathways(p: StoryPathway) {
        setPathways((current) =>
            current.includes(p)
                ? current.filter((x) => x !== p) // removes if already in
                : [...current, p] //adds if not there
            );
    }

    //this calculates each and every render whenever it changes
    const visible = objects.filter((object) => {
        const matchesQuery = object.title.toLowerCase().includes(query.toLowerCase())
        const matchesPathway = 
            pathways.length === 0 || pathways.includes(object.storyPathway);
        return matchesQuery && matchesPathway
});

    if (loading) {
        return <div className="container"><p>Loading the Collection</p></div>;
    }

    return (
        <div className="container">
            <h1>The Collection</h1>
        
        <div className="filter-group">
            <h3 className="eyebrow">Story Pathway</h3>
            {STORY_PATHWAYS.map((p) => (
                <label key={p} className="filter-row">
                    <input
                        type="checkbox"
                        checked={pathways.includes(p)}
                        onChange={() => togglePathways(p)}
                        />
                        {p}
                </label>
            ))}
        </div>

            <input
                type="text"
                placeholder="Search the collection..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input"
            />

            <p className="eyebrow">Showing {visible.length} objects</p>


            <div className="object-grid">
                {visible.map((object) => (
                    <ObjectCard key={object.id} object={object} />
                ))}
            </div>
        </div>
    );
}

export default Collection;
