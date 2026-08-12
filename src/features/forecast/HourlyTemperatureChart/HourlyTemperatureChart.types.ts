import type { ForecastResponse } from "@/lib/openweather/types";

export interface HourlyTemperatureChartProps {
  forecast: ForecastResponse;
  selectedDayKey: string | null;
}

export interface ChartPoint {
  time: string;
  temp: number;
}
