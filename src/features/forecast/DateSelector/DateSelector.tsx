"use client";

import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import { GlassCard } from "@/components/ui/GlassCard";
import { useAnchoredPanel } from "@/lib/useAnchoredPanel";
import { formatCityDate } from "@/lib/openweather/localTime";
import { MONTH_LABELS, WEEKDAY_LABELS } from "./DateSelector.constants";
import { buildCalendarWeeks } from "./buildCalendarWeeks";
import type { DateSelectorProps } from "./DateSelector.types";

export const DateSelector = ({ dailyForecasts, value, onChange, disabled }: DateSelectorProps) => {
  const [open, setOpen] = useState(false);
  const { rootRef, panelRef, rect } = useAnchoredPanel(open, setOpen);

  const availableDayKeys = useMemo(
    () => new Set(dailyForecasts.map((day) => day.dayKey)),
    [dailyForecasts],
  );
  const firstAvailable = dailyForecasts[0];
  const lastAvailable = dailyForecasts[dailyForecasts.length - 1];

  const [monthCursor, setMonthCursor] = useState<{ year: number; month: number } | null>(null);
  const [syncedFirstDayKey, setSyncedFirstDayKey] = useState(firstAvailable?.dayKey);
  if (firstAvailable?.dayKey !== syncedFirstDayKey) {
    setSyncedFirstDayKey(firstAvailable?.dayKey);
    setMonthCursor(null);
  }

  const today = new Date();
  const activeYear =
    monthCursor?.year ?? firstAvailable?.date.getUTCFullYear() ?? today.getUTCFullYear();
  const activeMonth =
    monthCursor?.month ?? firstAvailable?.date.getUTCMonth() ?? today.getUTCMonth();
  const weeks = useMemo(
    () => buildCalendarWeeks(activeYear, activeMonth),
    [activeYear, activeMonth],
  );

  const isAtFirstMonth =
    !firstAvailable ||
    (activeYear === firstAvailable.date.getUTCFullYear() &&
      activeMonth === firstAvailable.date.getUTCMonth());
  const isAtLastMonth =
    !lastAvailable ||
    (activeYear === lastAvailable.date.getUTCFullYear() &&
      activeMonth === lastAvailable.date.getUTCMonth());

  const changeMonth = (delta: number) => {
    const date = new Date(Date.UTC(activeYear, activeMonth + delta, 1));
    setMonthCursor({ year: date.getUTCFullYear(), month: date.getUTCMonth() });
  };

  const handleSelectDay = (dayKey: string) => {
    onChange(dayKey === value ? null : dayKey);
    setOpen(false);
  };

  const selectedForecast = dailyForecasts.find((day) => day.dayKey === value);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className={clsx(
          "flex h-10 shrink-0 items-center gap-1.5 rounded-pill border border-zinc-200 bg-surface px-4 text-sm font-medium text-zinc-700 outline-none transition hover:border-zinc-300 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500 text-nowrap",
          open && "border-zinc-300 dark:border-zinc-500",
        )}
      >
        <CalendarIcon className="size-4 text-zinc-400" />
        {selectedForecast ? formatCityDate(selectedForecast.date) : "Дата"}
      </button>

      {rect &&
        createPortal(
          <GlassCard
            ref={panelRef}
            style={{ top: rect.top, left: rect.left }}
            className={clsx(
              "fixed z-50 w-72 origin-top-left p-3 text-left transition duration-150 ease-out",
              open
                ? "pointer-events-auto scale-100 opacity-100"
                : "pointer-events-none scale-95 opacity-0",
            )}
          >
            <div className="mb-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => changeMonth(-1)}
                disabled={isAtFirstMonth}
                aria-label="Предыдущий месяц"
                className="rounded-full p-1 text-zinc-400 transition hover:bg-zinc-100 disabled:pointer-events-none disabled:opacity-30 dark:hover:bg-zinc-800"
              >
                <ChevronLeft className="size-4" />
              </button>
              <p className="text-sm font-semibold text-foreground">
                {MONTH_LABELS[activeMonth]} {activeYear}
              </p>
              <button
                type="button"
                onClick={() => changeMonth(1)}
                disabled={isAtLastMonth}
                aria-label="Следующий месяц"
                className="rounded-full p-1 text-zinc-400 transition hover:bg-zinc-100 disabled:pointer-events-none disabled:opacity-30 dark:hover:bg-zinc-800"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-xs text-zinc-400">
              {WEEKDAY_LABELS.map((label) => (
                <span key={label} className="py-1">
                  {label}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {weeks.flat().map((cell) => {
                const isAvailable = cell.inCurrentMonth && availableDayKeys.has(cell.dayKey);
                const isSelected = cell.dayKey === value;
                return (
                  <button
                    key={cell.dayKey}
                    type="button"
                    disabled={!isAvailable}
                    onClick={() => handleSelectDay(cell.dayKey)}
                    className={clsx(
                      "aspect-square rounded-xl text-sm transition",
                      !cell.inCurrentMonth && "pointer-events-none text-transparent",
                      cell.inCurrentMonth &&
                        !isAvailable &&
                        "cursor-not-allowed text-zinc-300 dark:text-zinc-700",
                      isAvailable &&
                        !isSelected &&
                        "text-zinc-700 hover:bg-primary-50 dark:text-zinc-200 dark:hover:bg-zinc-800",
                      isSelected && "bg-primary-500 font-semibold text-white",
                    )}
                  >
                    {cell.date.getUTCDate()}
                  </button>
                );
              })}
            </div>
          </GlassCard>,
          document.body,
        )}
    </div>
  );
};
