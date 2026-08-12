import type { ForecastResponse } from "@/lib/openweather/types";

export interface HourlyTemperatureChartProps {
  forecast: ForecastResponse;
}

export interface ChartPoint {
  time: string;
  temp: number;
}
