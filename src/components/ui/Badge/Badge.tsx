import type { HTMLAttributes } from "react";
import clsx from "clsx";

export const Badge = ({ className, ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-pill bg-surface px-3 py-1 text-xs font-medium text-zinc-600 shadow-card dark:text-zinc-300 dark:shadow-card-dark",
        className,
      )}
      {...props}
    />
  );
};
