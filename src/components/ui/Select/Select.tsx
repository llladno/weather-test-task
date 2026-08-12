"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown } from "lucide-react";
import clsx from "clsx";
import { GlassCard } from "@/components/ui/GlassCard";
import { useAnchoredPanel } from "@/lib/useAnchoredPanel";
import type { SelectProps } from "./Select.types";

export const Select = ({ value, onValueChange, options, className, ...props }: SelectProps) => {
  const [open, setOpen] = useState(false);
  const { rootRef, panelRef, rect } = useAnchoredPanel(open, setOpen);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label={props["aria-label"]}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className={clsx(
          "flex h-10 shrink-0 items-center gap-1.5 rounded-pill border border-zinc-200 bg-surface px-4 text-sm font-medium text-zinc-700 outline-none transition hover:border-zinc-300 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500",
          open && "border-zinc-300 dark:border-zinc-500",
          className,
        )}
      >
        {selectedOption?.label}
        <ChevronDown
          className={clsx("size-4 text-zinc-400 transition-transform", open && "rotate-180")}
        />
      </button>

      {rect &&
        createPortal(
          <GlassCard
            ref={panelRef}
            role="listbox"
            aria-label={props["aria-label"]}
            style={{ top: rect.top, left: rect.left, minWidth: rect.width }}
            className={clsx(
              "fixed z-50 origin-top p-1.5 text-left transition duration-150 ease-out",
              open
                ? "pointer-events-auto scale-100 opacity-100"
                : "pointer-events-none scale-95 opacity-0",
            )}
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={option.value === value}
                onClick={() => {
                  onValueChange(option.value);
                  setOpen(false);
                }}
                className={clsx(
                  "flex w-full cursor-pointer items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm whitespace-nowrap text-zinc-700 transition hover:bg-primary-50 dark:text-zinc-200 dark:hover:bg-zinc-800",
                  option.value === value && "font-semibold text-primary-600 dark:text-primary-400",
                )}
              >
                {option.label}
                {option.value === value && <Check className="size-4" />}
              </button>
            ))}
          </GlassCard>,
          document.body,
        )}
    </div>
  );
};
