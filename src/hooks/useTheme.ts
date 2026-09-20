import { useEffect, useState } from "react";

type Theme = "light" | "dark" | null;

const isSystemDark = () =>
  window.matchMedia?.("(prefers-color-scheme: dark)").matches;

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(null);

  const isDarkMode = theme === "dark" || (theme === null && isSystemDark());

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [theme]);

  const toggleTheme = () => {
    if (theme === null) {
      setTheme(isSystemDark() ? "light" : "dark");
    } else {
      setTheme(theme === "light" ? "dark" : "light");
    }
  };

  return { isDarkMode, toggleTheme };
}
