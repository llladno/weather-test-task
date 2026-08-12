"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Pill } from "@/components/ui/Pill";
import { DailyForecastCard, DailyForecastCardSkeleton } from "../DailyForecastCard";
import { DAY_OPTIONS, INITIAL_VISIBLE_DAYS, REVEAL_DELAY_MS } from "./DailyForecastList.constants";
import type { DayRange, DailyForecastListProps } from "./DailyForecastList.types";

export const DailyForecastList = ({
  dailyForecasts,
  selectedDayKey,
  onSelectDay,
}: DailyForecastListProps) => {
  const [days, setDays] = useState<DayRange>(INITIAL_VISIBLE_DAYS);
  const [revealedDays, setRevealedDays] = useState<DayRange>(INITIAL_VISIBLE_DAYS);
  const revealTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (revealTimeoutRef.current) clearTimeout(revealTimeoutRef.current);
    };
  }, []);

  // A date picked outside the currently visible range must reveal its card
  // immediately — the data is already loaded, so no artificial skeleton delay.
  // Adjusted during render (guarded by the synced copy) rather than in an
  // effect, since dailyForecasts/days are already known at render time.
  const [syncedSelectedDayKey, setSyncedSelectedDayKey] = useState(selectedDayKey);
  if (selectedDayKey !== syncedSelectedDayKey) {
    setSyncedSelectedDayKey(selectedDayKey);
    const index = selectedDayKey
      ? dailyForecasts.findIndex((day) => day.dayKey === selectedDayKey)
      : -1;
    if (index !== -1 && index >= days) {
      setDays(5);
      setRevealedDays(5);
    }
  }

  // Cancel any still-pending staggered reveal once the full range is already
  // shown, so a stale timer can't later overwrite a value set eagerly above.
  useEffect(() => {
    if (revealedDays !== 5 || !revealTimeoutRef.current) return;
    clearTimeout(revealTimeoutRef.current);
    revealTimeoutRef.current = null;
  }, [revealedDays]);

  useEffect(() => {
    if (!selectedDayKey) return;
    document
      .getElementById(`forecast-day-${selectedDayKey}`)
      ?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [selectedDayKey, revealedDays]);

  const handleSelectDays = (option: DayRange) => {
    setDays(option);
    if (revealTimeoutRef.current) {
      clearTimeout(revealTimeoutRef.current);
      revealTimeoutRef.current = null;
    }
    if (option <= revealedDays) {
      setRevealedDays(option);
      return;
    }
    revealTimeoutRef.current = setTimeout(() => setRevealedDays(option), REVEAL_DELAY_MS);
  };

  const visibleForecasts = dailyForecasts.slice(0, days);

  return (
    <div className="w-full max-w-4xl text-left">
      <div
        className="animate-fade-in-up mb-4 inline-flex gap-1 rounded-pill border border-border-glass bg-surface-glass p-1 backdrop-blur-md"
        style={{ animationDelay: "800ms" }}
      >
        {DAY_OPTIONS.map((option) => (
          <Pill
            key={option}
            type="button"
            active={days === option}
            onClick={() => handleSelectDays(option)}
          >
            {option} {option === 3 ? "дня" : "дней"}
          </Pill>
        ))}
      </div>

      <div className="scrollbar-thin -my-1 overflow-x-auto py-1 sm:m-0 sm:overflow-visible sm:p-0">
        <div
          className={clsx("flex gap-3 sm:grid", days === 3 ? "sm:grid-cols-3" : "sm:grid-cols-5")}
        >
          {visibleForecasts.map((forecastItem, index) => (
            <div key={forecastItem.dayKey} className="w-36 shrink-0 sm:w-auto sm:shrink">
              {index < revealedDays ? (
                <DailyForecastCard
                  forecast={forecastItem}
                  highlighted={forecastItem.dayKey === selectedDayKey}
                  onClick={() =>
                    onSelectDay(forecastItem.dayKey === selectedDayKey ? null : forecastItem.dayKey)
                  }
                  animationDelay={
                    index < INITIAL_VISIBLE_DAYS
                      ? `${850 + index * 60}ms`
                      : `${(index - INITIAL_VISIBLE_DAYS) * 80}ms`
                  }
                />
              ) : (
                <DailyForecastCardSkeleton />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
