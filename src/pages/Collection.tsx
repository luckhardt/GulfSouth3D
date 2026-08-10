import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useScrollDirection from "../hooks/useScrollDirection";
import type React from "react";
import ObjectCard from "../components/ObjectCard";
import FilterGroup from "../components/FilterGroup";
import { getObjects } from "../api/omeka";
import type { HeritageObject } from "../types";
import { STORY_PATHWAYS, type StoryPathway,
         THEMES, type Theme,
         OBJECT_TYPES, type ObjectType,
         PLACES, type Place,
         PERIODS, type Period,
 } from "../data/taxonomy";

function Collection() {
    //State is a place to hold the objects and the loading flag
    const [objects, setObjects] = useState<HeritageObject[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState(""); //the search text
    const [pathways, setPathways] = useState<StoryPathway[]>([])  //selected pathways
    const [searchParams] = useSearchParams();
    const [themes, setThemes] = useState<Theme[]>(
        () => searchParams.getAll("theme").filter((t): t is Theme => (THEMES as readonly string[]).includes(t))
    );
    const [types, setTypes] = useState<ObjectType[]>([]);
    const [places, setPlaces] = useState<Place[]>([]);
    const [periods, setPeriods] = useState<Period[]>([]);
    const hidden = useScrollDirection();


    //Effect is run once when the page loads and it fetches the data
    useEffect(() => {
        getObjects().then((data) => {
            setObjects(data);
            setLoading(false);
            console.log("Total objects fetched: ", objects.length);
        }); 
    }, []);


    function toggleValue<T>(value: T, setter: React.Dispatch<React.SetStateAction<T[]>>){
        setter((current) => 
        current.includes(value)
        ? current.filter((x) => x !== value)
        : [...current, value]
        );
    }

    //this calculates each and every render whenever it changes
    const visible = objects.filter((object) => {
        const matchesQuery = object.title.toLowerCase().includes(query.toLowerCase())
        const matchesPathway = pathways.length === 0 || pathways.includes(object.storyPathway);
        const matchesTheme = themes.length === 0 || object.themes.some((t) => themes.includes(t));
        const matchesType = types.length === 0 || types.includes(object.objectType);
        const matchesPlace = places.length === 0 || places.includes(object.locations.primary);
        const matchesPeriod = periods.length === 0 || periods.includes(object.period);
        return matchesQuery && matchesPathway && matchesTheme && matchesType && matchesPlace && matchesPeriod;
});

    if (loading) {
        return <div className="container"><p>Loading the Collection</p></div>;
    }

    return (
        <div className="container">
            <p className="eyebrow">Archive</p>
            <h1>The Collection</h1>

            <div className="collection-layout">
                {/*Left: filter sidebar*/}
                <aside className="filter-sidebar">
                    <h2 className="filter-heading">Filters</h2>
                    {/* Filter content would go here */}
                    <FilterGroup title="Story Pathway" options={STORY_PATHWAYS} selected={pathways} onToggle={(p) => toggleValue(p, setPathways)} />
                    <FilterGroup title="Theme" options={THEMES} selected={themes} onToggle={(v) => toggleValue(v, setThemes)} />
                    <FilterGroup title="Object Types" options={OBJECT_TYPES} selected={types} onToggle={(v) => toggleValue(v, setTypes)} />
                    <FilterGroup title="Places" options={PLACES} selected={places} onToggle={(v) => toggleValue(v, setPlaces)} />
                    <FilterGroup title="Periods" options={PERIODS} selected={periods} onToggle={(v) => toggleValue(v, setPeriods)} />
                </aside>

                {/*Right: object grid*/}
                <div className="collection-main">
                    <input
                        type="text"
                        placeholder="Search the collection"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className={`search-input search-input-sticky ${hidden ? "search-hidden" : ""}`}
                    />
                    <p className="eyebrow">Showing {visible.length} objects</p>
                    <div className="object-grid">
                        {visible.map((object) => (
                            <ObjectCard key={object.id} object={object} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Collection;
