export type TemperatureUnit = "celsius" | "fahrenheit";

export type LocationSource = "search" | "geolocation";

export interface SelectedLocation {
  name: string;
  queryName: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
  source?: LocationSource;
}
