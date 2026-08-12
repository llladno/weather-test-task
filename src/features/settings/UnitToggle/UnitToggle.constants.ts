import type { TemperatureUnit } from "@/lib/types";

export const UNIT_OPTIONS: { value: TemperatureUnit; label: string }[] = [
  { value: "celsius", label: "°C" },
  { value: "fahrenheit", label: "°F" },
];
