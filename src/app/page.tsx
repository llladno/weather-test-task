"use client";

import { useState } from "react";
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
import { GeolocationRequestError, useGeolocation } from "@/features/geolocation/useGeolocation";
import { GeolocationModal } from "@/features/geolocation/GeolocationModal";
import { useSearchHistoryStore } from "@/store/useSearchHistoryStore";
import { Button } from "@/components/ui/Button";
import type { SelectedLocation } from "@/lib/types";

const Home = () => {
  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation | null>(null);
  const recordSearch = useSearchHistoryStore((state) => state.selectLocation);

  const weatherQuery = useCurrentWeather(selectedLocation?.lat, selectedLocation?.lon);
  const photoQuery = useCityPhoto(selectedLocation?.queryName);
  const geolocation = useGeolocation(setSelectedLocation);

  const handleSelect = (location: SelectedLocation) => {
    setSelectedLocation(location);
    recordSearch(location);
  };

  const isFromGeolocation = selectedLocation?.source === "geolocation";
  const geolocationErrorReason =
    geolocation.error instanceof GeolocationRequestError ? geolocation.error.reason : "unavailable";

  return (
    <div className="flex flex-1 flex-col">
      <header className="fixed inset-x-5 top-5 z-50 mx-auto grid max-w-5xl grid-cols-[auto_1fr_auto] items-center gap-4 rounded-pill border border-border-glass bg-surface-glass px-4 py-3 shadow-card backdrop-blur-md dark:shadow-card-dark sm:px-6">
        <h1 className="shrink-0 text-xl font-bold tracking-tight text-foreground">Погода</h1>
        <div className="mx-auto w-full max-w-md min-w-0">
          <SearchBar
            onSelect={handleSelect}
            onUseMyLocation={() => geolocation.mutate()}
            showMyLocationButton={!isFromGeolocation}
            isLocating={geolocation.isPending}
          />
        </div>
        <div className="flex items-center gap-3">
          <UnitToggle />
          <ThemeToggle />
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center gap-6 px-4 pt-28 pb-16 text-center">
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

        {selectedLocation && weatherQuery.data && (
          <>
            <div className="flex w-full max-w-4xl flex-col items-center gap-4 lg:flex-row lg:items-stretch lg:justify-center">
              <CurrentWeatherCard
                weather={weatherQuery.data.current}
                location={selectedLocation}
                photo={photoQuery.data}
              />
              <WeatherDetailsPanel weather={weatherQuery.data.current} />
            </div>
            <div className="flex w-full flex-col items-center gap-6">
              <HourlyTemperatureChart forecast={weatherQuery.data.forecast} />
              <DailyForecastList forecast={weatherQuery.data.forecast} />
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
