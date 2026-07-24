import { useState, useRef, useEffect } from "react";
import useAccessibilitySettings from "../hooks/useAccessibilitySettings";

function AccessibilityMenu() {
  const [open, setOpen] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isReadMode, setIsReadMode] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme, contrast, setContrast, textSize, setTextSize, motion, setMotion } = useAccessibilitySettings();

  useEffect(() => {
      // iOS Safari sometimes needs voices "warmed up" before speak() will
      // actually produce audio on the first call
      window.speechSynthesis.getVoices();
  }, []);

  function readPage() {
    const main = document.getElementById("main-content");
    if (!main) return;

    const text = main.innerText;
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.onend = () => {
      setIsReading(false);
      setIsPaused(false);
    };
    utterance.onerror = () => {
      setIsReading(false);
      setIsPaused(false);
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsReading(true);
    setIsPaused(false);
  }

  function togglePause() {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }

  function stopReading() {
    window.speechSynthesis.cancel();
    setIsReading(false);
    setIsPaused(false);
  }

  // Toggle a body class so CSS can style hoverable/clickable text only
  // while Read Mode is active
  useEffect(() => {
    if (isReadMode) {
      document.body.classList.add("read-mode");
    } else {
      document.body.classList.remove("read-mode");
    }
  }, [isReadMode]);

  // While Read Mode is on, one delegated click listener on #main-content
  // figures out which paragraph/heading was clicked and reads just that
  useEffect(() => {
    if (!isReadMode) return;

    function handleReadClick(event: MouseEvent) {
      const target = event.target as HTMLElement;
      const readable = target.closest("p, h1, h2, h3");
      if (!readable) return;

      const text = readable.textContent ?? "";
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => {
        setIsReading(false);
        setIsPaused(false);
      };
      utterance.onerror = () => {
        setIsReading(false);
        setIsPaused(false);
      };

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
      setIsReading(true);
      setIsPaused(false);
    }

    const main = document.getElementById("main-content");
    main?.addEventListener("click", handleReadClick);
    return () => main?.removeEventListener("click", handleReadClick);
  }, [isReadMode]);

  // Close the dropdown when clicking outside it
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
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="7" r="1.6" fill="currentColor" stroke="none" />
          <path
            d="M6.5 9.5c1.7.9 3.5 1.3 5.5 1.3s3.8-.4 5.5-1.3M12 10.8v3M12 13.8l-2.5 5.5M12 13.8l2.5 5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
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

          <div className="accessibility-group">
            <span className="accessibility-label">Read Aloud</span>
            <div className="accessibility-options">
              <button
                className={`accessibility-option ${isReading && !isPaused ? "selected" : ""}`}
                onClick={readPage}
                disabled={isReading}
              >
                Read Page
              </button>
              <button
                className={`accessibility-option ${isPaused ? "selected" : ""}`}
                onClick={togglePause}
                disabled={!isReading}
              >
                {isPaused ? "Resume" : "Pause"}
              </button>
              <button
                className="accessibility-option"
                onClick={stopReading}
                disabled={!isReading}
              >
                Stop
              </button>
              <button
                className={`accessibility-option ${isReadMode ? "selected" : ""}`}
                onClick={() => setIsReadMode((current) => !current)}
              >
                {isReadMode ? "✓" : "Read on Click"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccessibilityMenu;