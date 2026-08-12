export type TemperatureUnit = "celsius" | "fahrenheit";

export type LocationSource = "search" | "geolocation";

export interface SelectedLocation {
  name: string;
  /** Original (usually English) name — used for querying third-party APIs like Unsplash. */
  queryName: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
  source?: LocationSource;
}
