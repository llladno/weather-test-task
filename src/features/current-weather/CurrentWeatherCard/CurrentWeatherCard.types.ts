import type { WeatherSnapshot } from "@/lib/openweather/types";
import type { CityPhoto } from "@/lib/unsplash/types";
import type { SelectedLocation } from "@/lib/types";

export interface CurrentWeatherCardProps {
  weather: WeatherSnapshot;
  location: SelectedLocation;
  photo?: CityPhoto | null;
}
