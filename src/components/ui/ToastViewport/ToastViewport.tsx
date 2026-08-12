"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import clsx from "clsx";
import { GlassCard } from "@/components/ui/GlassCard";
import { useToastStore } from "@/store/useToastStore";
import type { Toast } from "@/store/useToastStore";
import { TOAST_DURATION_MS, VARIANT_ICON, VARIANT_ICON_CLASS } from "./ToastViewport.constants";

const ToastItem = ({ toast }: { toast: Toast }) => {
  const removeToast = useToastStore((state) => state.removeToast);

  useEffect(() => {
    const timeout = setTimeout(() => removeToast(toast.id), TOAST_DURATION_MS);
    return () => clearTimeout(timeout);
  }, [toast.id, removeToast]);

  const Icon = VARIANT_ICON[toast.variant];

  return (
    <GlassCard
      role="alert"
      className="animate-fade-in-up pointer-events-auto flex w-full max-w-sm items-center gap-3 px-4 py-3"
    >
      <Icon className={clsx("size-5 shrink-0", VARIANT_ICON_CLASS[toast.variant])} />
      <p className="min-w-0 flex-1 text-sm text-zinc-700 dark:text-zinc-200">{toast.message}</p>
      <button
        type="button"
        onClick={() => removeToast(toast.id)}
        aria-label="Закрыть уведомление"
        className="shrink-0 text-zinc-400 transition hover:text-zinc-600 dark:hover:text-zinc-200"
      >
        <X className="size-4" />
      </button>
    </GlassCard>
  );
};

export const ToastViewport = () => {
  const toasts = useToastStore((state) => state.toasts);

  if (toasts.length === 0) return null;

  return createPortal(
    <div className="pointer-events-none fixed inset-x-4 bottom-4 z-100 flex flex-col items-center gap-2 sm:inset-x-auto sm:right-6 sm:items-end">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>,
    document.body,
  );
};
