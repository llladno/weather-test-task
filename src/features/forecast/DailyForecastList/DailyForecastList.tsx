"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Pill } from "@/components/ui/Pill";
import { DailyForecastCard, DailyForecastCardSkeleton } from "../DailyForecastCard";
import { groupForecastByDay } from "@/lib/openweather/groupForecastByDay";
import { DAY_OPTIONS, INITIAL_VISIBLE_DAYS, REVEAL_DELAY_MS } from "./DailyForecastList.constants";
import type { DayRange, DailyForecastListProps } from "./DailyForecastList.types";

export const DailyForecastList = ({ forecast }: DailyForecastListProps) => {
  const [days, setDays] = useState<DayRange>(INITIAL_VISIBLE_DAYS);
  const [revealedDays, setRevealedDays] = useState<DayRange>(INITIAL_VISIBLE_DAYS);
  const revealTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (revealTimeoutRef.current) clearTimeout(revealTimeoutRef.current);
    };
  }, []);

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

  const dailyForecasts = groupForecastByDay(forecast.list, forecast.city.timezone).slice(0, days);

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

      <div
        className={clsx("grid gap-3", days === 3 ? "grid-cols-3" : "grid-cols-3 sm:grid-cols-5")}
      >
        {dailyForecasts.map((forecastItem, index) =>
          index < revealedDays ? (
            <DailyForecastCard
              key={forecastItem.dayKey}
              forecast={forecastItem}
              animationDelay={
                index < INITIAL_VISIBLE_DAYS
                  ? `${850 + index * 60}ms`
                  : `${(index - INITIAL_VISIBLE_DAYS) * 80}ms`
              }
            />
          ) : (
            <DailyForecastCardSkeleton key={forecastItem.dayKey} />
          ),
        )}
      </div>
    </div>
  );
};
