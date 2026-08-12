import type { ButtonHTMLAttributes } from "react";

export interface PillProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}
