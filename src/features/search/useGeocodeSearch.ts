"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import type { GeocodingResult } from "@/lib/openweather/types";

const geocodeCity = async (query: string): Promise<GeocodingResult[]> => {
  const response = await fetch(`/api/geocode?q=${encodeURIComponent(query)}`);
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error ?? "Failed to search city");
  }
  return response.json();
};

export const useGeocodeSearch = (query: string) =>
  useQuery({
    queryKey: [QUERY_KEYS.geocode, query],
    queryFn: () => geocodeCity(query),
    enabled: query.trim().length > 0,
    staleTime: 60_000,
  });
