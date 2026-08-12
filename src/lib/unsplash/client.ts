import "server-only";
import type { CityPhoto, UnsplashSearchResponse } from "./types";

const BASE_URL = "https://api.unsplash.com";
const APP_NAME = "weather-test-task";

const getAccessKey = (): string | null => {
  return process.env.UNSPLASH_ACCESS_KEY ?? null;
};

const withUtm = (url: string) => `${url}?utm_source=${APP_NAME}&utm_medium=referral`;

const pingDownload = (accessKey: string, downloadLocation: string) => {
  fetch(downloadLocation, {
    headers: { Authorization: `Client-ID ${accessKey}` },
  }).catch(() => undefined);
};

export const searchCityPhoto = async (query: string): Promise<CityPhoto | null> => {
  const accessKey = getAccessKey();
  if (!accessKey) return null;

  const url = new URL("/search/photos", BASE_URL);
  url.searchParams.set("query", `${query} city`);
  url.searchParams.set("per_page", "1");
  url.searchParams.set("orientation", "landscape");

  const response = await fetch(url, {
    headers: { Authorization: `Client-ID ${accessKey}` },
  });

  if (!response.ok) return null;

  const data = (await response.json()) as UnsplashSearchResponse;
  const photo = data.results[0];
  if (!photo) return null;

  pingDownload(accessKey, photo.links.download_location);

  return {
    url: photo.urls.regular,
    alt: photo.alt_description ?? query,
    photographerName: photo.user.name,
    photographerUrl: withUtm(photo.user.links.html),
    unsplashUrl: withUtm("https://unsplash.com"),
  };
};
