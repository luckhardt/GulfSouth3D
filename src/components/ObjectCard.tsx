import { Link } from 'react-router-dom';
import type { HeritageObject } from "../types";

function ObjectCard({object}: {object: HeritageObject}) {
    return (
        //the syntax used here uses backticks(template literals) to build a string with a variable in it. 
        <Link to={`/collection/${object.slug}`} className="object-card">
            <div className="object-thumb">
                {object.posterUrl ? (
                    <img src={object.posterUrl} alt={object.title} className="object-thumb-img" />
                ) : (
                    <span className="object-thumb-label">3D MODEL</span>
                )}
            </div>

            <div className="object-body">
                <h3 className="Object-title">{object.title}</h3>
                <div className="object-chips">
                    <span className="chip">{object.locations.primary}</span>
                    <span className="chip">{object.period}</span>
                </div>
            </div>
        </Link>
    );
}
export default ObjectCard;