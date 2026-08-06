import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// A one-time, non-blocking notice. This site only stores functional
// accessibility preferences on the visitor's own device, so there's no consent
// to gate — we simply disclose it. "Got it" dismisses the notice for good.
const STORAGE_KEY = "cookieNoticeSeen";

function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie notice"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        background: "var(--surface)",
        borderTop: "3px solid var(--pine)",
        boxShadow: "0 -4px 16px rgba(0,0,0,0.15)",
        padding: "16px clamp(16px, 5vw, 48px)",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
      }}
    >
      <p
        style={{
          margin: 0,
          color: "var(--text)",
          maxWidth: "64ch",
          fontSize: "0.92rem",
          lineHeight: 1.6,
        }}
      >
        This site saves your accessibility preferences — theme, contrast, text size, motion blur, and
        read-aloud settings — on your device so they persist between visits. We do not sell your
        information and no login is required.{" "}
        <Link to="/privacy" style={{ color: "var(--accent)", textDecoration: "underline" }}>
          Learn more
        </Link>
        .
      </p>

      <div style={{ flexShrink: 0 }}>
        <button className="btn btn-solid" onClick={dismiss}>
          Got it
        </button>
      </div>
    </div>
  );
}

export default CookieBanner;
