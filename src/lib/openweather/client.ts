import "server-only";
import type { CurrentWeatherResponse, ForecastResponse, GeocodingResult } from "./types";

const BASE_URL = "https://api.openweathermap.org";

export class OpenWeatherError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "OpenWeatherError";
  }
}

const getApiKey = (): string => {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    throw new OpenWeatherError("OPENWEATHER_API_KEY is not configured", 500);
  }
  return apiKey;
};

const request = async <T>(path: string, params: Record<string, string>): Promise<T> => {
  const url = new URL(path, BASE_URL);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  url.searchParams.set("appid", getApiKey());

  const response = await fetch(url);

  if (!response.ok) {
    throw new OpenWeatherError(
      `OpenWeather request failed: ${response.status} ${response.statusText}`,
      response.status,
    );
  }

  return response.json() as Promise<T>;
};

export const geocodeCity = (query: string, limit = 5): Promise<GeocodingResult[]> =>
  request<GeocodingResult[]>("/geo/1.0/direct", { q: query, limit: String(limit) });

export const reverseGeocode = (lat: number, lon: number, limit = 1): Promise<GeocodingResult[]> =>
  request<GeocodingResult[]>("/geo/1.0/reverse", {
    lat: String(lat),
    lon: String(lon),
    limit: String(limit),
  });

export const getCurrentWeather = (lat: number, lon: number): Promise<CurrentWeatherResponse> =>
  request<CurrentWeatherResponse>("/data/2.5/weather", {
    lat: String(lat),
    lon: String(lon),
    units: "metric",
    lang: "ru",
  });

export const getForecast = (lat: number, lon: number): Promise<ForecastResponse> =>
  request<ForecastResponse>("/data/2.5/forecast", {
    lat: String(lat),
    lon: String(lon),
    units: "metric",
    lang: "ru",
  });
