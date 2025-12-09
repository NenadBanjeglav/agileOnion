"use client";

import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="group inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-black shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:border-white/20 dark:bg-white/10 dark:text-white"
      aria-label="Toggle dark mode"
    >
      <span className="relative h-5 w-5 overflow-hidden rounded-full border border-black/10 bg-gradient-to-br from-amber-300 to-amber-500 shadow-sm transition group-hover:rotate-6 dark:border-white/15 dark:from-zinc-200 dark:to-white">
        <span
          className={`absolute inset-1 rounded-full bg-zinc-900 transition-opacity duration-200 ease-out ${
            isDark ? "opacity-80" : "opacity-0"
          }`}
          aria-hidden
        />
      </span>
      {isDark ? "Dark" : "Light"} mode
    </button>
  );
}
