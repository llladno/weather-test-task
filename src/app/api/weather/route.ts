import { NextRequest, NextResponse } from "next/server";
import { getCurrentWeather, getForecast, OpenWeatherError } from "@/lib/openweather/client";
import type { WeatherBundle } from "@/lib/openweather/types";

export const GET = async (request: NextRequest) => {
  const lat = request.nextUrl.searchParams.get("lat");
  const lon = request.nextUrl.searchParams.get("lon");

  const latNum = Number(lat);
  const lonNum = Number(lon);

  if (!lat || !lon || Number.isNaN(latNum) || Number.isNaN(lonNum)) {
    return NextResponse.json(
      { error: "Query parameters 'lat' and 'lon' are required and must be numbers" },
      { status: 400 },
    );
  }

  try {
    const [current, forecast] = await Promise.all([
      getCurrentWeather(latNum, lonNum),
      getForecast(latNum, lonNum),
    ]);
    const bundle: WeatherBundle = { current, forecast };
    return NextResponse.json(bundle);
  } catch (error) {
    if (error instanceof OpenWeatherError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: "Failed to fetch weather" }, { status: 500 });
  }
};
