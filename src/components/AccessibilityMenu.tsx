import { useState, useRef, useEffect } from "react";
import useAccessibilitySettings from "../hooks/useAccessibilitySettings";

function AccessibilityMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme, contrast, setContrast, textSize, setTextSize, motion, setMotion } = useAccessibilitySettings();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="accessibility-menu" ref={menuRef}>
      <button
        className="search-toggle"
        aria-label="Accessibility settings"
        onClick={() => setOpen((current) => !current)}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="4" r="2" />
          <path d="M19 8l-7 2-7-2M12 10v6M8 21l4-5 4 5" />
        </svg>
      </button>

      {open && (
        <div className="accessibility-panel">
          <div className="accessibility-group">
            <span className="accessibility-label">Theme</span>
            <div className="accessibility-options">
              <button
                className={`accessibility-option ${theme === "light" ? "selected" : ""}`}
                onClick={() => setTheme("light")}
              >
                Light
              </button>
              <button
                className={`accessibility-option ${theme === "dark" ? "selected" : ""}`}
                onClick={() => setTheme("dark")}
              >
                Dark
              </button>
            </div>
          </div>

          <div className="accessibility-group">
            <span className="accessibility-label">Contrast</span>
            <div className="accessibility-options">
              <button
                className={`accessibility-option ${contrast === "normal" ? "selected" : ""}`}
                onClick={() => setContrast("normal")}
              >
                Normal
              </button>
              <button
                className={`accessibility-option ${contrast === "high" ? "selected" : ""}`}
                onClick={() => setContrast("high")}
              >
                High
              </button>
            </div>
          </div>

          <div className="accessibility-group">
            <span className="accessibility-label">Text Size</span>
            <div className="accessibility-options">
              <button
                className={`accessibility-option ${textSize === "small" ? "selected" : ""}`}
                onClick={() => setTextSize("small")}
              >
                Small
              </button>
              <button
                className={`accessibility-option ${textSize === "normal" ? "selected" : ""}`}
                onClick={() => setTextSize("normal")}
              >
                Normal
              </button>
              <button
                className={`accessibility-option ${textSize === "large" ? "selected" : ""}`}
                onClick={() => setTextSize("large")}
              >
                Large
              </button>
            </div>
          </div>

          <div className="accessibility-group">
            <span className="accessibility-label">Motion</span>
            <div className="accessibility-options">
              <button
                className={`accessibility-option ${motion === "normal" ? "selected" : ""}`}
                onClick={() => setMotion("normal")}
              >
                Normal
              </button>
              <button
                className={`accessibility-option ${motion === "reduce" ? "selected" : ""}`}
                onClick={() => setMotion("reduce")}
              >
                Reduce
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccessibilityMenu;