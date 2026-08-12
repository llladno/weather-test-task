"use client";

import Image from "next/image";
import { useSettingsStore } from "@/store/useSettingsStore";
import { formatTemperature } from "@/lib/temperature";
import { getWeatherIconUrl } from "@/lib/openweather/icon";
import { FALLBACK_WEATHER_CONDITION } from "@/lib/openweather/types";
import type { CurrentWeatherCardProps } from "./CurrentWeatherCard.types";

export const CurrentWeatherCard = ({ weather, location, photo }: CurrentWeatherCardProps) => {
  const unit = useSettingsStore((state) => state.unit);
  const condition = weather.weather[0] ?? FALLBACK_WEATHER_CONDITION;

  return (
    <div className="animate-fade-in w-full max-w-2xl overflow-hidden rounded-card shadow-card dark:shadow-card-dark">
      <div className="relative h-80 w-full sm:h-96 lg:h-full">
        {photo ? (
          <Image
            src={photo.url}
            alt={photo.alt}
            fill
            sizes="(max-width: 768px) 100vw, 672px"
            className="object-cover"
            priority
          />
        ) : (
          <div className="size-full bg-gradient-to-br from-primary-400 to-primary-700" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />

        <div className="absolute top-4 left-4 h-[calc(100%-32px)]">
          <div
            className="h-full animate-fade-in-up inline-flex flex-col justify-center items-center gap-3 rounded-card border border-white/15 bg-black/35 py-3 pr-5 pl-3 backdrop-blur-md"
            style={{ animationDelay: "150ms" }}
          >
            <span className="inline-flex max-w-full items-center truncate text-xs font-medium text-white/90">
              {location.name} <br />
              {[location.state, location.country].filter(Boolean).join(", ")}
            </span>
            <Image
              src={getWeatherIconUrl(condition.icon)}
              alt={condition.description}
              width={52}
              height={52}
              className="drop-shadow"
            />
            <span className="text-3xl font-bold text-white">
              {formatTemperature(weather.main.temp, unit)}
            </span>
            <span className="text-xs text-white/60">
              Ощущается как {formatTemperature(weather.main.feels_like, unit)}
            </span>
            <p className="text-xs text-white/80 capitalize">{condition.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
