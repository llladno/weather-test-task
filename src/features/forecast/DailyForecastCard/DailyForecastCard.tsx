"use client";

import Image from "next/image";
import clsx from "clsx";
import { GlassCard } from "@/components/ui/GlassCard";
import { getWeatherIconUrl } from "@/lib/openweather/icon";
import { formatTemperature } from "@/lib/temperature";
import { formatCityDate, formatCityWeekday } from "@/lib/openweather/localTime";
import { useSettingsStore } from "@/store/useSettingsStore";
import type { DailyForecastCardProps } from "./DailyForecastCard.types";

export const DailyForecastCard = ({
  forecast,
  animationDelay,
  highlighted = false,
  onClick,
}: DailyForecastCardProps) => {
  const unit = useSettingsStore((state) => state.unit);

  return (
    <GlassCard
      id={`forecast-day-${forecast.dayKey}`}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-pressed={onClick ? highlighted : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (event) => {
              if (event.key !== "Enter" && event.key !== " ") return;
              event.preventDefault();
              onClick();
            }
          : undefined
      }
      className={clsx(
        "animate-fade-in-up flex flex-col items-center gap-2 px-3 py-4 text-center transition-shadow",
        onClick &&
          "cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary-400",
        highlighted && "ring-2 ring-primary-500",
      )}
      style={{ animationDelay }}
    >
      <div>
        <p className="text-sm font-semibold text-zinc-900 capitalize dark:text-zinc-50">
          {formatCityWeekday(forecast.date)}
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{formatCityDate(forecast.date)}</p>
      </div>
      <Image
        src={getWeatherIconUrl(forecast.condition.icon)}
        alt={forecast.condition.description}
        width={48}
        height={48}
      />
      <p className="line-clamp-2 min-h-8 text-xs text-zinc-500 capitalize dark:text-zinc-400">
        {forecast.condition.description}
      </p>
      <div className="flex items-center gap-2 text-sm">
        <span className="font-semibold text-zinc-900 dark:text-zinc-50">
          {formatTemperature(forecast.maxTemp, unit)}
        </span>
        <span className="text-zinc-400 dark:text-zinc-500">
          {formatTemperature(forecast.minTemp, unit)}
        </span>
      </div>
    </GlassCard>
  );
};
