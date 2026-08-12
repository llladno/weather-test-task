import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TemperatureUnit } from "@/lib/types";

interface SettingsState {
  unit: TemperatureUnit;
  toggleUnit: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      unit: "celsius",
      toggleUnit: () =>
        set((state) => ({ unit: state.unit === "celsius" ? "fahrenheit" : "celsius" })),
    }),
    { name: "weather-settings" },
  ),
);
