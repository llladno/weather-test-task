import type { DailyForecast } from "@/lib/openweather/groupForecastByDay";

export interface DateSelectorProps {
  dailyForecasts: DailyForecast[];
  value: string | null;
  onChange: (dayKey: string | null) => void;
  disabled?: boolean;
}

export interface CalendarCell {
  date: Date;
  dayKey: string;
  inCurrentMonth: boolean;
}
