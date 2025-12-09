const themeInitializer = `
(() => {
  const storageKey = "agile-onion-theme";
  const root = document.documentElement;

  const theme = "dark";

  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme === "light");
  root.dataset.theme = theme;

  try {
    localStorage.setItem(storageKey, theme);
  } catch (error) {
    console.warn("Unable to persist theme", error);
  }
})();
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeInitializer }} />;
}
