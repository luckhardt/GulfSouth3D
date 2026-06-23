import ObjectCard from "../components/ObjectCard";
import { sampleObjects } from "../data/sampleobjects";

function Collection() {
    return (
        <div className="container">
            <h1>The Collection</h1>
            <div className="object-grid">
                {sampleObjects.map((object) => (
                    <ObjectCard key={object.id} object={object} />
                ))}
            </div>
        </div>
    );
}

export default Collection;