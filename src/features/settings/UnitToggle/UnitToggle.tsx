"use client";

import { useEffect, useState } from "react";
import { useSettingsStore } from "@/store/useSettingsStore";
import { Select } from "@/components/ui/Select";
import { UNIT_OPTIONS } from "./UnitToggle.constants";

const DEFAULT_UNIT = UNIT_OPTIONS[0].value;

export const UnitToggle = () => {
  const unit = useSettingsStore((state) => state.unit);
  const toggleUnit = useSettingsStore((state) => state.toggleUnit);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Mount-guard to avoid SSR/client hydration mismatch — the persisted unit is
    // only known after zustand rehydrates from localStorage on the client.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleChange = (nextUnit: string) => {
    if (nextUnit !== unit) {
      toggleUnit();
    }
  };

  return (
    <Select
      value={mounted ? unit : DEFAULT_UNIT}
      onValueChange={handleChange}
      options={UNIT_OPTIONS}
      aria-label="Единица измерения температуры"
    />
  );
};
