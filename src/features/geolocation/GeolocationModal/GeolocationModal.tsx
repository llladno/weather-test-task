"use client";

import { createPortal } from "react-dom";
import { MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { REASON_TEXT } from "./GeolocationModal.constants";
import type { GeolocationModalProps } from "./GeolocationModal.types";

export const GeolocationModal = ({ reason, onClose }: GeolocationModalProps) =>
  createPortal(
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <GlassCard
        className="relative w-full max-w-sm p-6 text-center"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute top-4 right-4 text-zinc-400 transition hover:text-zinc-600 dark:hover:text-zinc-200"
        >
          <X className="size-5" />
        </button>

        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary-50 text-primary-500 dark:bg-primary-900/40 dark:text-primary-300">
          <MapPin className="size-6" />
        </div>

        <h3 className="text-lg font-semibold text-foreground">{REASON_TEXT[reason].title}</h3>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          {REASON_TEXT[reason].description}
        </p>

        <Button onClick={onClose} className="mt-6 w-full">
          Понятно
        </Button>
      </GlassCard>
    </div>,
    document.body,
  );
