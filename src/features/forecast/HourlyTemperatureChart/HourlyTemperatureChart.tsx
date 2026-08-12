"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { useSettingsStore } from "@/store/useSettingsStore";
import { toDisplayTemperature } from "@/lib/temperature";
import {
  toCityDate,
  formatCityHour,
  formatCityDate,
  getCityDayKey,
} from "@/lib/openweather/localTime";
import {
  PADDING_X,
  PADDING_Y,
  VIEWBOX_HEIGHT,
  VIEWBOX_WIDTH,
} from "./HourlyTemperatureChart.constants";
import type { ChartPoint, HourlyTemperatureChartProps } from "./HourlyTemperatureChart.types";

const toCoordinates = (points: ChartPoint[]): { x: number; y: number }[] => {
  const temps = points.map((point) => point.temp);
  const min = Math.min(...temps);
  const max = Math.max(...temps);
  const range = max - min || 1;

  return points.map((point, index) => ({
    x: (index / (points.length - 1)) * (VIEWBOX_WIDTH - PADDING_X * 2) + PADDING_X,
    y: VIEWBOX_HEIGHT - PADDING_Y - ((point.temp - min) / range) * (VIEWBOX_HEIGHT - PADDING_Y * 2),
  }));
};

const buildSmoothLinePath = (coordinates: { x: number; y: number }[]): string => {
  if (coordinates.length === 0) return "";

  let path = `M ${coordinates[0].x} ${coordinates[0].y}`;
  for (let index = 0; index < coordinates.length - 1; index += 1) {
    const current = coordinates[index];
    const next = coordinates[index + 1];
    const midX = (current.x + next.x) / 2;
    path += ` C ${midX} ${current.y}, ${midX} ${next.y}, ${next.x} ${next.y}`;
  }
  return path;
};

export const HourlyTemperatureChart = ({
  forecast,
  selectedDayKey,
}: HourlyTemperatureChartProps) => {
  const unit = useSettingsStore((state) => state.unit);

  const items = selectedDayKey
    ? forecast.list.filter(
        (item) => getCityDayKey(toCityDate(item.dt, forecast.city.timezone)) === selectedDayKey,
      )
    : forecast.list.slice(0, 8);

  const data: ChartPoint[] = items.map((item) => ({
    time: formatCityHour(toCityDate(item.dt, forecast.city.timezone)),
    temp: toDisplayTemperature(item.main.temp, unit),
  }));

  const title = selectedDayKey
    ? `Температура на ${formatCityDate(toCityDate(items[0]?.dt ?? forecast.list[0].dt, forecast.city.timezone))}`
    : "Температура на 24 часа";

  const coordinates = toCoordinates(data);
  const linePath = buildSmoothLinePath(coordinates);
  const areaPath =
    coordinates.length > 0
      ? `${linePath} L ${coordinates[coordinates.length - 1].x} ${VIEWBOX_HEIGHT} L ${coordinates[0].x} ${VIEWBOX_HEIGHT} Z`
      : "";

  return (
    <GlassCard
      className="animate-fade-in-up w-full max-w-4xl p-5 text-left"
      style={{ animationDelay: "750ms" }}
    >
      <h3 className="mb-4 text-sm font-semibold text-zinc-500 dark:text-zinc-400">{title}</h3>

      <div className="scrollbar-thin overflow-x-auto pb-1">
        <div className="min-w-[480px]">
          <div className="mb-1 flex justify-between">
            {data.map((point, index) => (
              <span
                key={`${point.time}-${index}`}
                className="flex-1 text-center text-sm font-semibold text-zinc-900 dark:text-zinc-50"
              >
                {point.temp}°
              </span>
            ))}
          </div>

          <div className="relative h-28 w-full">
            <svg
              viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
              preserveAspectRatio="none"
              className="size-full"
            >
              <defs>
                <linearGradient id="temperatureFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary-500)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="var(--color-primary-500)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <path d={areaPath} fill="url(#temperatureFill)" stroke="none" />
              <path
                d={linePath}
                fill="none"
                stroke="var(--color-primary-500)"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            {coordinates.map((coordinate, index) => (
              <span
                key={`${data[index].time}-${index}`}
                className="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500"
                style={{
                  left: `${(coordinate.x / VIEWBOX_WIDTH) * 100}%`,
                  top: `${(coordinate.y / VIEWBOX_HEIGHT) * 100}%`,
                }}
              />
            ))}
          </div>

          <div className="mt-1 flex justify-between">
            {data.map((point, index) => (
              <span
                key={`${point.time}-${index}`}
                className="flex-1 text-center text-xs text-zinc-500 dark:text-zinc-400"
              >
                {point.time}
              </span>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
