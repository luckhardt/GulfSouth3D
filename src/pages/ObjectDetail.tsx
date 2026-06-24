import ModelViewer from "../components/ModelViewer";
import { useParams, Link } from 'react-router-dom';
import { sampleObjects } from '../data/sampleobjects';

function ObjectDetail() {
    //useParams() reads the dynamic part of the URL (the:slug below)
    const { slug } = useParams();

    //Finding the Object whose slug matches the URL
    const object = sampleObjects.find((o) => o.slug === slug);

    if(!object) {
        return (
            <div className="container">
                <h1>Object Not Found</h1>
                <Link to="/collection">Back to Collection</Link>
            </div>
        );
    }

    return (
        <div className="container">
            <Link to="/collection">Back to Collection</Link>
            <h1>{object.title}</h1>
            <p className="eyebrow">{object.objectType} · {object.period}</p>
            <ModelViewer src={object.modelUrl} alt={object.title} poster={object.posterUrl} />
            <p>{object.whyItMatters}</p>
            </div>
    );
}

export default ObjectDetail;

