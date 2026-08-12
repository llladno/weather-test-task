"use client";

import { Cloud, Droplet, Eye, Gauge, Wind } from "lucide-react";
import { MetricChip } from "@/components/ui/MetricChip";
import type { WeatherDetailsPanelProps } from "./WeatherDetailsPanel.types";

export const WeatherDetailsPanel = ({ weather }: WeatherDetailsPanelProps) => {
  return (
    <div className="flex w-full flex-col gap-3 lg:w-56">
      <div className="animate-fade-in-up" style={{ animationDelay: "460ms" }}>
        <MetricChip
          icon={<Droplet className="size-4" />}
          label="Влажность"
          value={`${weather.main.humidity}%`}
        />
      </div>
      <div className="animate-fade-in-up" style={{ animationDelay: "520ms" }}>
        <MetricChip
          icon={<Wind className="size-4" />}
          label="Ветер"
          value={`${Math.round(weather.wind.speed)} м/с`}
        />
      </div>
      <div className="animate-fade-in-up" style={{ animationDelay: "580ms" }}>
        <MetricChip
          icon={<Gauge className="size-4" />}
          label="Давление"
          value={`${weather.main.pressure} гПа`}
        />
      </div>
      <div className="animate-fade-in-up" style={{ animationDelay: "640ms" }}>
        <MetricChip
          icon={<Eye className="size-4" />}
          label="Видимость"
          value={`${(weather.visibility / 1000).toFixed(1)} км`}
        />
      </div>
      <div className="animate-fade-in-up" style={{ animationDelay: "700ms" }}>
        <MetricChip
          icon={<Cloud className="size-4" />}
          label="Облачность"
          value={`${weather.clouds.all}%`}
        />
      </div>
    </div>
  );
};
