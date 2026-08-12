"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export interface AnchoredPanelRect {
  top: number;
  left: number;
  width: number;
}

export interface UseAnchoredPanelResult<TRoot extends HTMLElement, TPanel extends HTMLElement> {
  rootRef: RefObject<TRoot | null>;
  panelRef: RefObject<TPanel | null>;
  rect: AnchoredPanelRect | null;
}

/**
 * Positions a portalled panel under its anchor element and closes it on an
 * outside click, Escape, or window resize. `setOpen` must be referentially
 * stable (e.g. a `useState` setter) since it's an effect dependency.
 */
export const useAnchoredPanel = <
  TRoot extends HTMLElement = HTMLDivElement,
  TPanel extends HTMLElement = HTMLDivElement,
>(
  open: boolean,
  setOpen: (open: boolean) => void,
): UseAnchoredPanelResult<TRoot, TPanel> => {
  const [rect, setRect] = useState<AnchoredPanelRect | null>(null);
  const rootRef = useRef<TRoot>(null);
  const panelRef = useRef<TPanel>(null);

  useEffect(() => {
    if (!open) return;

    const updateRect = () => {
      const bounds = rootRef.current?.getBoundingClientRect();
      if (!bounds) return;
      setRect({ top: bounds.bottom + 8, left: bounds.left, width: bounds.width });
    };
    updateRect();

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      const isInsideRoot = rootRef.current?.contains(target);
      const isInsidePanel = panelRef.current?.contains(target);
      if (!isInsideRoot && !isInsidePanel) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", updateRect);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", updateRect);
    };
  }, [open, setOpen]);

  return { rootRef, panelRef, rect };
};
