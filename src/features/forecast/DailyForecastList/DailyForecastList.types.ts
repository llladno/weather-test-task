import type { DailyForecast } from "@/lib/openweather/groupForecastByDay";

export type DayRange = 3 | 5;

export interface DailyForecastListProps {
  dailyForecasts: DailyForecast[];
  selectedDayKey: string | null;
  onSelectDay: (dayKey: string | null) => void;
}
