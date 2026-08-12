import type { ForecastResponse } from "@/lib/openweather/types";

export type DayRange = 3 | 5;

export interface DailyForecastListProps {
  forecast: ForecastResponse;
}
