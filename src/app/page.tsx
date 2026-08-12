"use client";

import { useMemo, useState } from "react";
import { MapPin } from "lucide-react";
import { ThemeToggle } from "@/features/theme/ThemeToggle";
import { UnitToggle } from "@/features/settings/UnitToggle";
import { SearchBar } from "@/features/search/SearchBar";
import { useCurrentWeather } from "@/features/current-weather/useCurrentWeather";
import { useCityPhoto } from "@/features/current-weather/useCityPhoto";
import {
  CurrentWeatherCard,
  CurrentWeatherCardSkeleton,
} from "@/features/current-weather/CurrentWeatherCard";
import {
  WeatherDetailsPanel,
  WeatherDetailsPanelSkeleton,
} from "@/features/current-weather/WeatherDetailsPanel";
import {
  HourlyTemperatureChart,
  HourlyTemperatureChartSkeleton,
} from "@/features/forecast/HourlyTemperatureChart";
import {
  DailyForecastList,
  DailyForecastListSkeleton,
} from "@/features/forecast/DailyForecastList";
import { DateSelector } from "@/features/forecast/DateSelector";
import { GeolocationRequestError, useGeolocation } from "@/features/geolocation/useGeolocation";
import { GeolocationModal } from "@/features/geolocation/GeolocationModal";
import { useSearchHistoryStore } from "@/store/useSearchHistoryStore";
import { Button } from "@/components/ui/Button";
import { groupForecastByDay } from "@/lib/openweather/groupForecastByDay";
import type { SelectedLocation } from "@/lib/types";

const Home = () => {
  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation | null>(null);
  const [selectedDayKey, setSelectedDayKey] = useState<string | null>(null);
  const recordSearch = useSearchHistoryStore((state) => state.selectLocation);
  const lastCity = useSearchHistoryStore((state) => state.lastCity);
  const setLastCity = useSearchHistoryStore((state) => state.setLastCity);

  // zustand's persist middleware rehydrates from localStorage asynchronously, so
  // lastCity resolves a render or two after mount — adjust state during render
  // (guarded by the synced copy below) as soon as it does, but only to restore
  // on load, never overriding a location already in use.
  const lastCityKey = lastCity ? `${lastCity.lat},${lastCity.lon}` : null;
  const [syncedLastCityKey, setSyncedLastCityKey] = useState(lastCityKey);
  if (lastCityKey !== syncedLastCityKey) {
    setSyncedLastCityKey(lastCityKey);
    if (lastCity && !selectedLocation) {
      setSelectedLocation(lastCity);
    }
  }

  const weatherQuery = useCurrentWeather(selectedLocation?.lat, selectedLocation?.lon);
  const photoQuery = useCityPhoto(selectedLocation?.queryName);
  const geolocation = useGeolocation((location) => {
    setSelectedLocation(location);
    setLastCity(location);
  });

  const dailyForecasts = useMemo(
    () =>
      weatherQuery.data
        ? groupForecastByDay(
            weatherQuery.data.forecast.list,
            weatherQuery.data.forecast.city.timezone,
          )
        : [],
    [weatherQuery.data],
  );

  const selectedDayForecast = selectedDayKey
    ? dailyForecasts.find((day) => day.dayKey === selectedDayKey)
    : undefined;
  const displayWeather = selectedDayForecast?.representative ?? weatherQuery.data?.current;

  const locationKey = selectedLocation ? `${selectedLocation.lat},${selectedLocation.lon}` : null;
  const [syncedLocationKey, setSyncedLocationKey] = useState(locationKey);
  if (locationKey !== syncedLocationKey) {
    setSyncedLocationKey(locationKey);
    setSelectedDayKey(null);
  }

  const handleSelect = (location: SelectedLocation) => {
    setSelectedLocation(location);
    recordSearch(location);
  };

  const isFromGeolocation = selectedLocation?.source === "geolocation";
  const geolocationErrorReason =
    geolocation.error instanceof GeolocationRequestError ? geolocation.error.reason : "unavailable";

  return (
    <div className="flex flex-1 flex-col">
      <header className="fixed inset-x-5 top-5 z-50 mx-auto flex max-w-5xl flex-col gap-3 rounded-card border border-border-glass bg-surface-glass px-4 py-3 shadow-card backdrop-blur-md dark:shadow-card-dark sm:flex-row sm:items-center sm:gap-4 sm:rounded-pill sm:px-6">
        <h1 className="hidden shrink-0 text-xl font-bold tracking-tight text-foreground sm:block">
          Погода
        </h1>
        <div className="w-full min-w-0 sm:max-w-md">
          <SearchBar
            onSelect={handleSelect}
            onUseMyLocation={() => geolocation.mutate()}
            showMyLocationButton={!isFromGeolocation}
            isLocating={geolocation.isPending}
          />
        </div>
        <div className="flex items-center justify-between gap-3 sm:contents">
          <DateSelector
            dailyForecasts={dailyForecasts}
            value={selectedDayKey}
            onChange={setSelectedDayKey}
            disabled={!weatherQuery.data}
          />
          <div className="flex items-center gap-3 sm:ml-auto">
            <UnitToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center gap-6 px-4 pt-36 pb-16 text-center sm:pt-28">
        {!selectedLocation && (
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Узнайте погоду где угодно
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400">
                Для начала включите геолокацию или найдите нужный город
              </p>
            </div>
            <Button onClick={() => geolocation.mutate()} disabled={geolocation.isPending}>
              <MapPin className="size-4" />
              {geolocation.isPending ? "Определяем местоположение..." : "Включить геолокацию"}
            </Button>
          </div>
        )}

        {selectedLocation && weatherQuery.isLoading && (
          <>
            <div className="flex w-full max-w-4xl flex-col items-center gap-4 lg:flex-row lg:items-stretch lg:justify-center">
              <CurrentWeatherCardSkeleton />
              <WeatherDetailsPanelSkeleton />
            </div>
            <div className="flex w-full flex-col items-center gap-6">
              <HourlyTemperatureChartSkeleton />
              <DailyForecastListSkeleton />
            </div>
          </>
        )}

        {selectedLocation && weatherQuery.isError && (
          <p className="animate-fade-in-up text-red-500">
            Не удалось загрузить погоду. Попробуйте ещё раз.
          </p>
        )}

        {selectedLocation && weatherQuery.data && displayWeather && (
          <>
            <div className="flex w-full max-w-4xl flex-col items-center gap-4 lg:flex-row lg:items-stretch lg:justify-center">
              <CurrentWeatherCard
                weather={displayWeather}
                location={selectedLocation}
                photo={photoQuery.data}
              />
              <WeatherDetailsPanel weather={displayWeather} />
            </div>
            <div className="flex w-full flex-col items-center gap-6">
              <HourlyTemperatureChart
                forecast={weatherQuery.data.forecast}
                selectedDayKey={selectedDayKey}
              />
              <DailyForecastList
                dailyForecasts={dailyForecasts}
                selectedDayKey={selectedDayKey}
                onSelectDay={setSelectedDayKey}
              />
            </div>
          </>
        )}
      </main>

      {geolocation.isError && (
        <GeolocationModal reason={geolocationErrorReason} onClose={() => geolocation.reset()} />
      )}
    </div>
  );
};

export default Home;
