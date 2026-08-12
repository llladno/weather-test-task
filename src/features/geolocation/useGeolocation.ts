"use client";

import { useMutation } from "@tanstack/react-query";
import { toSelectedLocation } from "@/lib/openweather/toSelectedLocation";
import type { GeocodingResult } from "@/lib/openweather/types";
import type { SelectedLocation } from "@/lib/types";

export type GeolocationErrorReason = "denied" | "unsupported" | "unavailable";

export class GeolocationRequestError extends Error {
  constructor(public reason: GeolocationErrorReason) {
    super(reason);
    this.name = "GeolocationRequestError";
  }
}

const getBrowserPosition = (): Promise<GeolocationPosition> =>
  new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject(new GeolocationRequestError("unsupported"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      resolve,
      (error) => {
        reject(
          new GeolocationRequestError(
            error.code === error.PERMISSION_DENIED ? "denied" : "unavailable",
          ),
        );
      },
      { timeout: 10_000 },
    );
  });

const reverseGeocodeCoords = async (lat: number, lon: number): Promise<GeocodingResult> => {
  const response = await fetch(`/api/geocode/reverse?lat=${lat}&lon=${lon}`);
  if (!response.ok) throw new GeolocationRequestError("unavailable");

  const results: GeocodingResult[] = await response.json();
  if (results.length === 0) throw new GeolocationRequestError("unavailable");

  return results[0];
};

export const useGeolocation = (onLocate: (location: SelectedLocation) => void) =>
  useMutation({
    mutationFn: async () => {
      const position = await getBrowserPosition();
      return reverseGeocodeCoords(position.coords.latitude, position.coords.longitude);
    },
    onSuccess: (result) => {
      onLocate(toSelectedLocation(result, "geolocation"));
    },
  });
