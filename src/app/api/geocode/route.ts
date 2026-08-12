import { NextRequest, NextResponse } from "next/server";
import { geocodeCity, OpenWeatherError } from "@/lib/openweather/client";

export const GET = async (request: NextRequest) => {
  const query = request.nextUrl.searchParams.get("q")?.trim();

  if (!query) {
    return NextResponse.json({ error: "Query parameter 'q' is required" }, { status: 400 });
  }

  try {
    const results = await geocodeCity(query);
    return NextResponse.json(results);
  } catch (error) {
    if (error instanceof OpenWeatherError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: "Failed to geocode city" }, { status: 500 });
  }
};
