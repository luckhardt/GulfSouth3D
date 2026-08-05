import { useState, useEffect } from "react";

type Theme = "light" | "dark";
type Contrast = "normal" | "high";
type TextSize = "normal" | "large" | "small";
type Motion = "normal" | "reduce";

function useAccessibilitySettings() {
  const [theme, setTheme] = useState<Theme>("light");
  const [contrast, setContrast] = useState<Contrast>("normal");
  const [textSize, setTextSize] = useState<TextSize>("normal");
  const [motion, setMotion] = useState<Motion>("normal");

  //Read saved settings on the first load (runs once)
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const savedContrast = localStorage.getItem("contrast") as Contrast | null;
    const savedTextSize = localStorage.getItem("textSize") as TextSize | null;
    const savedMotion = localStorage.getItem("motion") as Motion | null;

  //always default to light unless the visitor has chosen otherwise
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
         setTheme("light");
    }

    if (savedContrast) setContrast(savedContrast);
    if (savedTextSize) setTextSize(savedTextSize);
    if (savedMotion) setMotion(savedMotion);
  }, []);

    //save to local each time the setting changes to maintain consistency
    useEffect(() => {
        localStorage.setItem("theme", theme);
        if (theme === "dark") {
            document.documentElement.setAttribute("data-theme", "dark");
        } else {
            document.documentElement.removeAttribute("data-theme");
        }
    }, [theme]);

    useEffect(() => {
        localStorage.setItem("contrast", contrast);
        if (contrast === "high") {
            document.documentElement.setAttribute("data-contrast", "high");
        } else {
            document.documentElement.removeAttribute("data-contrast");
        }
    }, [contrast]);

    useEffect(() => {
        localStorage.setItem("textSize", textSize);
        if (textSize === "normal") {
            document.documentElement.removeAttribute("data-textsize");
        } else {
            document.documentElement.setAttribute("data-textsize", textSize);
        }
    }, [textSize]);

    useEffect(() => {
        localStorage.setItem("motion", motion);
        if (motion === "reduce") {
            document.documentElement.setAttribute("data-motion", "reduce");
        } else {
            document.documentElement.removeAttribute("data-motion");
        }
    }, [motion]);

  return { theme, setTheme, contrast, setContrast, textSize, setTextSize, motion, setMotion };
}

export default useAccessibilitySettings;