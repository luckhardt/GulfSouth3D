import { Link } from 'react-router-dom';
import type { HeritageObject } from "../types";

function ObjectCard({ object, variant = "compact" }: { object: HeritageObject; variant?: "compact" | "detailed" }) {
    return (
        <Link to={`/collection/${object.slug}`} className="object-card">
            <div className="object-thumb">
                {object.posterUrl ? (
                    <img src={object.posterUrl} alt={object.posterAlt || object.title} className="object-thumb-img" />
                ) : (
                    <span className="object-thumb-label">3D MODEL</span>
                )}
            </div>

            <div className="object-body">
                <h3 className="object-title">{object.title}</h3>
                <div className="object-chips">
                    <span className="chip">{object.locations.primary}</span>
                    <span className="chip">{object.period}</span>
                </div>

                {variant === "detailed" && (
                    <>
                        <p className="object-description">{object.significance}</p>
                        <div className="object-chips">
                            {object.themes.map((theme) => (
                                <span key={theme} className="chip-outline">{theme}</span>
                            ))}
                        </div>
                        <span className="view-model-link">View 3D Model →</span>
                    </>
                )}
            </div>
        </Link>
    );
}
export default ObjectCard;