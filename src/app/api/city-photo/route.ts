import { NextRequest, NextResponse } from "next/server";
import { searchCityPhoto } from "@/lib/unsplash/client";

export const GET = async (request: NextRequest) => {
  const query = request.nextUrl.searchParams.get("q")?.trim();

  if (!query) {
    return NextResponse.json({ error: "Query parameter 'q' is required" }, { status: 400 });
  }

  try {
    const photo = await searchCityPhoto(query);
    return NextResponse.json({ photo });
  } catch {
    return NextResponse.json({ error: "Failed to fetch city photo" }, { status: 500 });
  }
};
