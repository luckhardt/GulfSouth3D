import "@google/model-viewer";

//props this component will accept: the model URL, a label, an optional fallback image.

function ModelViewer({
    src,
    alt,
    poster,
}: {
    src: string;
    alt: string;
    poster?: string;

}) {
    return (
        <model-viewer
            src={src}
            alt={alt}
            poster={poster}
            camera-controls
            auto-rotate
            shadow-intensity="1"
            className="model-viewer"  //this className is used to style the model viewer in the CSS file.
        ></model-viewer>
    );
}
export default ModelViewer;