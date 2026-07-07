import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getObjectBySlug } from "../api/omeka";
import ModelViewer from "../components/ModelViewer";
import type { HeritageObject } from "../types";

function ObjectDetail() {
  const { slug } = useParams();
  const [object, setObject] = useState<HeritageObject | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // slug could be undefined for a moment; guard against it
    if (!slug) return;
    getObjectBySlug(slug).then((data) => {
      setObject(data);
      setLoading(false);
    });
  }, [slug]); // re-run if the slug changes

  if (loading) {
    return <div className="container"><p>Loading…</p></div>;
  }

  if (!object) {
    return (
      <div className="container">
        <h1>Object not found</h1>
        <Link to="/collection">← Back to the collection</Link>
      </div>
    );
  }

return (
  <div className="container">
    <Link to="/collection" className="back-link">← Back to the collection</Link>
    <h1>{object.title}</h1>
    <p className="eyebrow">{object.objectType} · {object.period}</p>

    <div className="object-layout">
      {/* LEFT column: the 3D viewer */}
      <div className="object-viewer">
        <ModelViewer src={object.modelUrl} alt={object.title} poster={object.posterUrl} />
      </div>


      {/* RIGHT column: the info */}

      <div className="object-info">
        <p className="why-heading eyebrow">Why This Matters</p>
        <p>{object.whyItMatters}</p>

        <div className="metadata-panel">
          <h3 className="metadata-title">Object Details</h3>
          <dl className="metadata-list">
            <dt>Type</dt>       <dd>{object.objectType}</dd>
            <dt>Period</dt>     <dd>{object.period}</dd>
            <dt>Location</dt>   <dd>{object.locations.primary}</dd>
            {object.material &&  (<><dt>Material</dt><dd>{object.material}</dd></>)}
            {object.accessionNumber && (<><dt>Accession Number</dt><dd>{object.accessionNumber}</dd></>)}
            {object.dateDigitized && (<><dt>Digitized</dt><dd>{object.dateDigitized}</dd></>)}
          </dl>
          {object.omekaUrl && (
            <a href={object.omekaUrl} target="_blank" rel="noopener noreferrer" className="omeka-link">
              View full record in Omeka
            </a>
          )}
        </div>
      </div>
    </div>
  </div>
);
}


export default ObjectDetail;