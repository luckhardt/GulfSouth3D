import { useState, useRef, useEffect } from "react";
import useAccessibilitySettings from "../hooks/useAccessibilitySettings";

// iOS AUDIO SESSION PRIMING

// iOS Safari routes speechSynthesis through the "ambient" audio category by
// default, which means the physical mute switch silences it. Playing a tiny
// silent audio file first (triggered by a real user gesture) upgrades the
// page's audio session to the "playback" category, which respects media volume
// instead of the mute switch. This must be called inside a click/tap handler.
const SILENT_AUDIO =
  "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=";

function primeAudioSession() {
  const audio = new Audio(SILENT_AUDIO);
  audio.play().catch(() => {});
}

// COMPONENT
function AccessibilityMenu() {

  // ── UI state ────
  const [open, setOpen] = useState(false);          // dropdown panel open/closed
  const [isReading, setIsReading] = useState(false); // speech currently active
  const [isPaused, setIsPaused] = useState(false);   // speech deliberately paused
  const [isReadMode, setIsReadMode] = useState(false);// hover-to-read mode active
  const [sentences, setSentences] = useState<string[]>([]); // current sentence list (for display)
  const [currentIndex, setCurrentIndex] = useState(0);      // current sentence index (for display)

  // ── Refs ───
  // We use refs (not just state) for values that need to be read inside event
  // handlers and speech callbacks. React state updates are asynchronous and
  // closures capture stale values -- refs always give you the current value,
  // no matter when they're read.
  const menuRef = useRef<HTMLDivElement>(null);              // accessibility panel DOM node
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>(); // pending hover-read timer
  const currentIndexRef = useRef(0);    // true current sentence index (avoids stale closure)
  const sentencesRef = useRef<string[]>([]); // true current sentence list (avoids stale closure)
  const isPausedRef = useRef(false);    // true current pause state (avoids stale closure)
  // isPausedRef is the key fix for pause/resume: togglePause reads isPaused from state but
  // React closures can capture a stale `false` even after setIsPaused(true) has been called.
  // Reading isPausedRef.current instead always gives the real, up-to-date value.

  // ── Accessibility settings (theme, contrast, text size, motion) ────
  const { theme, setTheme, contrast, setContrast, textSize, setTextSize, motion, setMotion } = useAccessibilitySettings();

  // ── Voice warm-up ──
  // iOS Safari sometimes has an empty voice list on first load. Calling
  // getVoices() once on mount triggers the browser to load them, so the first
  // speak() call doesn't silently fail due to no available voice.
  useEffect(() => {
    window.speechSynthesis.getVoices();
  }, []);

  // SPEECH ENGINE

  // speakFrom: speaks one sentence at a time, chaining to the next on each
  // utterance's natural end. This sentence-by-sentence approach lets us
  // implement reliable pause/resume by cancelling speech (which works
  // cross-platform) and remembering the index, then starting a fresh
  // utterance from that index on resume -- sidestepping
  // speechSynthesis.resume(), which is broken on Android Chrome (pause()
  // works, resume() silently does nothing).
  function speakFrom(startIndex: number, sentenceList: string[]) {
    if (startIndex >= sentenceList.length) {
      // Finished reading all sentences naturally
      setIsReading(false);
      setIsPaused(false);
      isPausedRef.current = false;
      currentIndexRef.current = 0;
      return;
    }

    // Keep refs in sync so pause/resume always know the real current position
    currentIndexRef.current = startIndex;
    setCurrentIndex(startIndex);

    const utterance = new SpeechSynthesisUtterance(sentenceList[startIndex]);

    // Chain to the next sentence when this one finishes naturally
    utterance.onend = () => {
      speakFrom(startIndex + 1, sentenceList);
    };

    // Only reset state on a genuine error, not on a deliberate cancel-for-pause.
    // We check isPausedRef (not isPaused state) because this callback fires
    // asynchronously -- the state value here would be stale.
    utterance.onerror = () => {
      if (!isPausedRef.current) {
        setIsReading(false);
        setIsPaused(false);
        isPausedRef.current = false;
        currentIndexRef.current = 0;
      }
    };

    window.speechSynthesis.speak(utterance);
  }

  // startSpeaking: entry point for all read-aloud triggers (Read Page button,
  // hover-over-text, hover-over-model). Splits text into sentences, resets
  // all state/refs, then kicks off speakFrom from index 0.
  function startSpeaking(text: string) {
    if (!text.trim()) return;

    primeAudioSession();

    // Split into sentences on . ! ? endings. Falls back to the whole text
    // as a single "sentence" if no sentence-ending punctuation is found.
    const split = text
      .split(/[\n\r]+/)
      .map(s => s.trim())
      .filter(s => s.length > 0)
      .flatMap(line => line.match(/[^.!?]+[.!?]+/g) ?? [line]);

    // Update both state (for display/button rendering) and refs (for callbacks)
    setSentences(split);
    sentencesRef.current = split;
    setCurrentIndex(0);
    currentIndexRef.current = 0;
    isPausedRef.current = false;

    window.speechSynthesis.cancel();
    setIsReading(true);
    setIsPaused(false);
    speakFrom(0, split);
  }

  // readPage: reads the entire #main-content area aloud (skips header/footer)
  function readPage() {
    const main = document.getElementById("main-content");
    if (!main) return;
    startSpeaking(main.innerText);
  }

  // togglePause: pauses by cancelling speech and remembering position,
  // or resumes by starting a fresh utterance from the remembered position.
  // Reads isPausedRef.current (not isPaused state) to avoid stale closures.
  function togglePause() {
    if (isPausedRef.current) {
        isPausedRef.current = false;
        setIsPaused(false);
        speakFrom(currentIndexRef.current, sentencesRef.current);
    } else {
        isPausedRef.current = true;
        setIsPaused(true);
        window.speechSynthesis.cancel();
    }
  }

  // stopReading: cancels all speech and resets everything to initial state
  function stopReading() {
    window.speechSynthesis.cancel();
    setIsReading(false);
    setIsPaused(false);
    isPausedRef.current = false;
    setCurrentIndex(0);
    currentIndexRef.current = 0;
  }

  
  // READ MODE EFFECTS

  // Toggle a CSS class on <body> so global CSS can apply hover outlines to
  // readable elements only while Read Mode is active, not during normal browsing.
  useEffect(() => {
    if (isReadMode) {
      document.body.classList.add("read-mode");
    } else {
      document.body.classList.remove("read-mode");
    }
  }, [isReadMode]);

  // Generic hover handler for text elements (paragraphs, headings, list items,
  // metadata rows, images). Uses mouseover/mouseout with event delegation on
  // #main-content so we only need one listener for the whole page.
  //
  // Note: model-viewer is intentionally excluded from this selector and handled
  // separately below. Its internal auto-rotate animation causes mouseover/mouseout
  // to fire repeatedly even while the cursor sits still over it (because those
  // events bubble up from whatever sub-element the browser considers "under" the
  // cursor at each repaint), constantly cancelling the 1.5s timer before it fires.
  useEffect(() => {
    if (!isReadMode) return;

    function handleMouseOver(event: MouseEvent) {
      const target = event.target as HTMLElement;
      const readable = target.closest("p, h1, h2, h3, h4, dt, dd, li, span, img");
      if (!readable) return;

      // Clear any pending timer before starting a new one (prevents stacking
      // multiple timers if the mouse moves quickly between elements)
      clearTimeout(hoverTimer.current);

      hoverTimer.current = setTimeout(() => {
        const isImage = readable.tagName === "IMG";
        const text = isImage
          ? readable.getAttribute("alt") ?? ""
          : readable.textContent ?? "";

        startSpeaking(text);
      }, 1500);
    }

    function handleMouseOut() {
      // Cancel the pending read if the mouse leaves before 1.5s elapses
      clearTimeout(hoverTimer.current);
    }

    const main = document.getElementById("main-content");
    main?.addEventListener("mouseover", handleMouseOver);
    main?.addEventListener("mouseout", handleMouseOut);
    return () => {
      main?.removeEventListener("mouseover", handleMouseOver);
      main?.removeEventListener("mouseout", handleMouseOut);
      clearTimeout(hoverTimer.current);
    };
  }, [isReadMode]);

  // Dedicated model-viewer hover handler using mouseenter/mouseleave.
  // Unlike mouseover/mouseout, mouseenter/mouseleave don't bubble and only
  // fire once when the cursor truly crosses the element's bounding box --
  // they aren't affected by internal repaints or child-element boundary noise,
  // making them immune to the auto-rotate problem described above.
  // Since they don't bubble, we can't delegate from a parent; we attach
  // listeners directly to each model-viewer element on the page instead.
  useEffect(() => {
    if (!isReadMode) return;

    const modelViewers = document.querySelectorAll("model-viewer");
    let modelHoverTimer: ReturnType<typeof setTimeout>;

    function handleEnter(event: Event) {
      const target = event.currentTarget as HTMLElement;
      // event.currentTarget (not event.target) reliably refers to the element
      // the listener was attached to, regardless of any internal re-renders
      modelHoverTimer = setTimeout(() => {
        const text = target.getAttribute("alt") ?? "";
        startSpeaking(text);
      }, 1500);
    }

    function handleLeave() {
      clearTimeout(modelHoverTimer);
    }

    modelViewers.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      clearTimeout(modelHoverTimer);
      modelViewers.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, [isReadMode]);

  // Close the accessibility panel when clicking anywhere outside it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // RENDER
  return (
    <div className="accessibility-menu" ref={menuRef}>

      {/* Toggle button — universal access icon (circle with spread-arm figure) */}
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

          {/* ── Theme ── */}
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

          {/* ── Contrast ── */}
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

          {/* ── Text Size ── */}
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

          {/* ── Motion ── */}
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

          {/* ── Read Aloud ── */}
          {/* Read Page: disabled while already reading (prevents overlapping reads)  */}
          {/* Pause/Resume: label swaps based on isPaused; disabled when not reading  */}
          {/* Stop: cancels everything and resets to initial state                    */}
          {/* Hover to Read: toggles the hover-based selective read mode              */}
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
                Hover to Read {isReadMode ? "✓" : ""}
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default AccessibilityMenu;