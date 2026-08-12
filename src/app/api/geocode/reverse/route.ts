import { NextRequest, NextResponse } from "next/server";
import { reverseGeocode, OpenWeatherError } from "@/lib/openweather/client";

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
    const results = await reverseGeocode(latNum, lonNum);
    return NextResponse.json(results);
  } catch (error) {
    if (error instanceof OpenWeatherError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: "Failed to reverse geocode location" }, { status: 500 });
  }
};
