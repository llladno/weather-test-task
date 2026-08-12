import type { CurrentWeatherResponse } from "@/lib/openweather/types";

export interface WeatherDetailsPanelProps {
  weather: CurrentWeatherResponse;
}
