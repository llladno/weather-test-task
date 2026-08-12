import type { TemperatureUnit } from "@/lib/types";

export const celsiusToFahrenheit = (celsius: number): number => celsius * (9 / 5) + 32;

export const formatTemperature = (celsius: number, unit: TemperatureUnit): string => {
  const value = unit === "celsius" ? celsius : celsiusToFahrenheit(celsius);
  return `${Math.round(value)}°`;
};

export const toDisplayTemperature = (celsius: number, unit: TemperatureUnit): number =>
  Math.round(unit === "celsius" ? celsius : celsiusToFahrenheit(celsius));
