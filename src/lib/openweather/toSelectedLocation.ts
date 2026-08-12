import type { GeocodingResult } from "./types";
import type { LocationSource, SelectedLocation } from "@/lib/types";

export const toSelectedLocation = (
  result: GeocodingResult,
  source: LocationSource,
): SelectedLocation => ({
  name: result.local_names?.ru ?? result.name,
  queryName: result.name,
  country: result.country,
  state: result.state,
  lat: result.lat,
  lon: result.lon,
  source,
});
