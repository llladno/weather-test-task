"use client";

import { useSettingsStore } from "@/store/useSettingsStore";
import { Select } from "@/components/ui/Select";
import { useIsClient } from "@/lib/useIsClient";
import { UNIT_OPTIONS } from "./UnitToggle.constants";

const DEFAULT_UNIT = UNIT_OPTIONS[0].value;

export const UnitToggle = () => {
  const unit = useSettingsStore((state) => state.unit);
  const toggleUnit = useSettingsStore((state) => state.toggleUnit);
  const mounted = useIsClient();

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
