"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Mount-guard to avoid SSR/client hydration mismatch — resolvedTheme is only
    // known after next-themes reads localStorage/system preference on the client.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Переключить на светлую тему" : "Переключить на тёмную тему"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex size-10 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-surface text-zinc-700 transition hover:border-zinc-300 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500"
    >
      {mounted && isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </button>
  );
};
