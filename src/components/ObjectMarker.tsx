import { useRef } from "react";
import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import L from "leaflet";
import type { HeritageObject } from "../types";

const pinIcon = L.divIcon({
  className: "custom-map-pin",
  html: `<svg width="28" height="40" viewBox="0 0 28 40" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 26 14 26s14-15.5 14-26c0-7.732-6.268-14-14-14z" fill="var(--pine)"/>
    <circle cx="14" cy="14" r="5" fill="var(--sage-cream)"/>
  </svg>`,
  iconSize: [28, 40],
  iconAnchor: [14, 40],
  popupAnchor: [0, -40],
});

function ObjectMarker({ object, position }: { object: HeritageObject; position: [number, number] }) {
  const markerRef = useRef<L.Marker>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();

  function openPopup() {
    clearTimeout(closeTimer.current);
    markerRef.current?.openPopup();
  }

  function scheduleClose() {
    closeTimer.current = setTimeout(() => {
      markerRef.current?.closePopup();
    }, 200);
  }

  return (
    <Marker
      ref={markerRef}
      position={position}
      icon={pinIcon}
      eventHandlers={{
        mouseover: openPopup,
        mouseout: scheduleClose,
        popupopen: (e) => {
          const popupEl = e.popup.getElement();
          popupEl?.addEventListener("mouseenter", openPopup);
          popupEl?.addEventListener("mouseleave", scheduleClose);
        },
      }}
    >
      <Popup>
        <strong>{object.title}</strong><br />
        <Link to={`/collection/${object.slug}`}>View Object</Link>
      </Popup>
    </Marker>
  );
}

export default ObjectMarker;