import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SelectedLocation } from "@/lib/types";

const MAX_HISTORY = 5;

const isSameLocation = (first: SelectedLocation, second: SelectedLocation) =>
  first.lat === second.lat && first.lon === second.lon;

interface SearchHistoryState {
  lastCity: SelectedLocation | null;
  history: SelectedLocation[];
  selectLocation: (location: SelectedLocation) => void;
  removeLocation: (location: SelectedLocation) => void;
  clearHistory: () => void;
}

export const useSearchHistoryStore = create<SearchHistoryState>()(
  persist(
    (set) => ({
      lastCity: null,
      history: [],
      selectLocation: (location) =>
        set((state) => ({
          lastCity: location,
          history: [
            location,
            ...state.history.filter((item) => !isSameLocation(item, location)),
          ].slice(0, MAX_HISTORY),
        })),
      removeLocation: (location) =>
        set((state) => ({
          history: state.history.filter((item) => !isSameLocation(item, location)),
        })),
      clearHistory: () => set({ history: [] }),
    }),
    { name: "weather-search-history" },
  ),
);
