"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import type { WeatherBundle } from "@/lib/openweather/types";

const fetchWeather = async (lat: number, lon: number): Promise<WeatherBundle> => {
  const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error ?? "Failed to fetch weather");
  }
  return response.json();
};

export const useCurrentWeather = (lat: number | undefined, lon: number | undefined) =>
  useQuery({
    queryKey: [QUERY_KEYS.weather, lat, lon],
    queryFn: () => fetchWeather(lat as number, lon as number),
    enabled: lat !== undefined && lon !== undefined,
  });
