export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

// OpenWeather types `weather` as an array but the API can in principle return
// it empty; used wherever `weather[0]` is read so the UI degrades instead of
// throwing on a missing condition.
export const FALLBACK_WEATHER_CONDITION: WeatherCondition = {
  id: 0,
  main: "Unknown",
  description: "нет данных",
  icon: "01d",
};

export interface GeocodingResult {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export interface CurrentWeatherResponse {
  coord: { lon: number; lat: number };
  weather: WeatherCondition[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: { speed: number; deg: number; gust?: number };
  clouds: { all: number };
  dt: number;
  sys: { country: string; sunrise: number; sunset: number };
  timezone: number;
  name: string;
}

export interface ForecastListItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: WeatherCondition[];
  wind: { speed: number; deg: number; gust?: number };
  pop: number;
  dt_txt: string;
}

export interface ForecastResponse {
  cod: string;
  cnt: number;
  list: ForecastListItem[];
  city: {
    name: string;
    country: string;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export interface WeatherBundle {
  current: CurrentWeatherResponse;
  forecast: ForecastResponse;
}
