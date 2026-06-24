import { useState, useEffect } from "react";
import ObjectCard from "../components/ObjectCard";
import { getObjects } from "../api/omeka";
import type { HeritageObject } from "../types";

function Collection() {
    //State is a place to hold the objects and the loading flag
    const [objects, setObjects] = useState<HeritageObject[]>([]);
    const [loading, setLoading] = useState(true);

    //Effect is run once when the page loads and it fetches the data
    useEffect(() => {
        getObjects().then((data) => {
            setObjects(data);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div className="container"><p>Loading the Collection</p></div>;
    }

    return (
        <div className="container">
            <h1>The Collection</h1>
            <div className="object-grid">
                {objects.map((object) => (
                    <ObjectCard key={object.id} object={object} />
                ))}
            </div>
        </div>
    );
}

export default Collection;
