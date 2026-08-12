import clsx from "clsx";
import type { PillProps } from "./Pill.types";

export const Pill = ({ active = false, className, ...props }: PillProps) => {
  return (
    <button
      className={clsx(
        "inline-flex shrink-0 items-center gap-1.5 rounded-pill px-4 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-primary-500 text-white"
          : "bg-surface text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800",
        className,
      )}
      {...props}
    />
  );
};
