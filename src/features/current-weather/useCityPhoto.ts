"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import type { CityPhoto } from "@/lib/unsplash/types";

const fetchCityPhoto = async (city: string): Promise<CityPhoto | null> => {
  const response = await fetch(`/api/city-photo?q=${encodeURIComponent(city)}`);
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error ?? "Failed to fetch city photo");
  }
  const data = await response.json();
  return data.photo;
};

export const useCityPhoto = (city: string | undefined) =>
  useQuery({
    queryKey: [QUERY_KEYS.cityPhoto, city],
    queryFn: () => fetchCityPhoto(city as string),
    enabled: Boolean(city),
    staleTime: Infinity,
  });
