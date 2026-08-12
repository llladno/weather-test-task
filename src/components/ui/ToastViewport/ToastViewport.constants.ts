import { CircleAlert, CircleCheck, Info } from "lucide-react";
import type { ToastVariant } from "@/store/useToastStore";

export const TOAST_DURATION_MS = 5000;

export const VARIANT_ICON: Record<ToastVariant, typeof CircleAlert> = {
  error: CircleAlert,
  success: CircleCheck,
  info: Info,
};

export const VARIANT_ICON_CLASS: Record<ToastVariant, string> = {
  error: "text-red-500",
  success: "text-green-500",
  info: "text-primary-500",
};
