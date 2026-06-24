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
      <Link to="/collection">← Back to the collection</Link>
      <h1>{object.title}</h1>
      <p className="eyebrow">{object.objectType} · {object.period}</p>
      <ModelViewer src={object.modelUrl} alt={object.title} poster={object.posterUrl} />
      <p>{object.whyItMatters}</p>
    </div>
  );
}

export default ObjectDetail;