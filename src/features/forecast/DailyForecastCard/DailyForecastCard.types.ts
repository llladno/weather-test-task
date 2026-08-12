import type { DailyForecast } from "@/lib/openweather/groupForecastByDay";

export interface DailyForecastCardProps {
  forecast: DailyForecast;
  animationDelay: string;
}
