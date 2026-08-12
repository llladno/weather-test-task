"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Search, History, LocateFixed, RefreshCw, X } from "lucide-react";
import clsx from "clsx";
import { useGeocodeSearch } from "../useGeocodeSearch";
import { GlassCard } from "@/components/ui/GlassCard";
import { useAnchoredPanel } from "@/lib/useAnchoredPanel";
import { useSearchHistoryStore } from "@/store/useSearchHistoryStore";
import { toSelectedLocation } from "@/lib/openweather/toSelectedLocation";
import type { GeocodingResult } from "@/lib/openweather/types";
import type { SelectedLocation } from "@/lib/types";
import { DEBOUNCE_MS } from "./SearchBar.constants";
import type { SearchBarProps } from "./SearchBar.types";

const formatLocationLabel = (location: { name: string; state?: string; country: string }): string =>
  `${location.name}${location.state ? `, ${location.state}` : ""}, ${location.country}`;

const dedupeResults = (results: GeocodingResult[]): GeocodingResult[] => {
  const seen = new Set<string>();
  return results.filter((result) => {
    const key = `${result.name}|${result.state ?? ""}|${result.country}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

export const SearchBar = ({
  placeholder = "Поиск города...",
  onSelect,
  onUseMyLocation,
  showMyLocationButton,
  isLocating,
}: SearchBarProps) => {
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [open, setOpen] = useState(false);
  const { rootRef, panelRef, rect } = useAnchoredPanel(open, setOpen);

  const history = useSearchHistoryStore((state) => state.history);
  const removeFromHistory = useSearchHistoryStore((state) => state.removeLocation);
  const clearHistory = useSearchHistoryStore((state) => state.clearHistory);
  const geocodeQuery = useGeocodeSearch(debouncedValue);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), DEBOUNCE_MS);
    return () => clearTimeout(timeout);
  }, [value]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (value.trim()) setDebouncedValue(value);
  };

  const handleSelect = (location: SelectedLocation) => {
    setValue("");
    setDebouncedValue("");
    setOpen(false);
    onSelect(location);
  };

  const handleUseMyLocation = () => {
    setOpen(false);
    onUseMyLocation();
  };

  const isTyping = value.trim().length > 0;
  const isDebouncePending = value.trim() !== debouncedValue.trim();
  const isSearching = isDebouncePending || geocodeQuery.isFetching;
  const showMyLocation = open && !isTyping && showMyLocationButton;
  const showHistory = open && !isTyping && history.length > 0;
  const showResults = open && isTyping;
  const isPanelOpen = showMyLocation || showHistory || showResults;
  const results = isSearching ? [] : dedupeResults(geocodeQuery.data ?? []);

  return (
    <div ref={rootRef} className="relative w-full">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex items-center gap-3 rounded-pill bg-surface px-5 py-2.5 border border-zinc-200 hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-500 transition">
          <Search className="size-5 shrink-0 text-zinc-400" />
          <input
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            aria-label="Поиск города"
            className="w-full bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none dark:text-zinc-50"
          />
        </div>
      </form>

      {rect &&
        createPortal(
          <GlassCard
            ref={panelRef}
            style={{ top: rect.top, left: rect.left, width: rect.width }}
            className={clsx(
              "fixed z-50 origin-top p-1.5 text-left transition duration-150 ease-out",
              isPanelOpen
                ? "pointer-events-auto scale-100 opacity-100"
                : "pointer-events-none scale-95 opacity-0",
            )}
          >
            {showMyLocation && (
              <button
                type="button"
                onClick={handleUseMyLocation}
                disabled={isLocating}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-primary-600 transition hover:bg-primary-50 disabled:cursor-not-allowed disabled:opacity-50 dark:text-primary-400 dark:hover:bg-zinc-800"
              >
                <LocateFixed className="size-4 shrink-0" />
                {isLocating ? "Определяем местоположение..." : "Моё местоположение"}
              </button>
            )}

            {showHistory && (
              <>
                <div className="flex items-center justify-between px-3 py-1.5">
                  <p className="text-xs font-medium text-zinc-400">История поиска</p>
                  <button
                    type="button"
                    onClick={clearHistory}
                    className="text-xs font-medium text-zinc-400 transition hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    Очистить всё
                  </button>
                </div>
                {history.map((item) => (
                  <div
                    key={`${item.lat}-${item.lon}`}
                    className="flex items-center gap-1 rounded-xl transition hover:bg-primary-50 dark:hover:bg-zinc-800"
                  >
                    <button
                      type="button"
                      onClick={() => handleSelect(item)}
                      className="flex min-w-0 flex-1 items-center gap-2 px-3 py-2 text-left text-sm text-zinc-700 dark:text-zinc-200"
                    >
                      <History className="size-4 shrink-0 text-zinc-400" />
                      <span className="truncate">{formatLocationLabel(item)}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFromHistory(item)}
                      aria-label={`Удалить ${formatLocationLabel(item)} из истории`}
                      className="mr-1.5 shrink-0 rounded-full p-1 text-zinc-400 transition hover:bg-zinc-200 hover:text-zinc-600 dark:hover:bg-zinc-700 dark:hover:text-zinc-200"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                ))}
              </>
            )}

            {showResults && isSearching && (
              <p className="px-3 py-2 text-sm text-zinc-500">Ищем...</p>
            )}

            {showResults && !isSearching && geocodeQuery.isError && (
              <div className="flex items-center justify-between gap-2 px-3 py-2">
                <p className="text-sm text-red-500">Не удалось выполнить поиск.</p>
                <button
                  type="button"
                  onClick={() => geocodeQuery.refetch()}
                  className="flex shrink-0 items-center gap-1 text-sm font-medium text-primary-600 transition hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  <RefreshCw className="size-3.5" />
                  Повторить
                </button>
              </div>
            )}

            {showResults && !isSearching && geocodeQuery.isSuccess && results.length === 0 && (
              <p className="px-3 py-2 text-sm text-zinc-500">Ничего не найдено.</p>
            )}

            {showResults &&
              results.map((result, index) => (
                <button
                  key={`${result.lat}-${result.lon}-${index}`}
                  type="button"
                  onClick={() => handleSelect(toSelectedLocation(result, "search"))}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-zinc-700 hover:bg-primary-50 dark:text-zinc-200 dark:hover:bg-zinc-800"
                >
                  <Search className="size-4 shrink-0 text-zinc-400" />
                  {formatLocationLabel({
                    name: result.local_names?.ru ?? result.name,
                    state: result.state,
                    country: result.country,
                  })}
                </button>
              ))}
          </GlassCard>,
          document.body,
        )}
    </div>
  );
};
