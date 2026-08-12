import { forwardRef, type HTMLAttributes } from "react";
import clsx from "clsx";

export const GlassCard = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "rounded-card border border-border-glass bg-surface-glass shadow-card backdrop-blur-md dark:shadow-card-dark",
          className,
        )}
        {...props}
      />
    );
  },
);

GlassCard.displayName = "GlassCard";
