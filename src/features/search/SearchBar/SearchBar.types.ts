import type { SelectedLocation } from "@/lib/types";

export interface SearchBarProps {
  placeholder?: string;
  onSelect: (location: SelectedLocation) => void;
  onUseMyLocation: () => void;
  showMyLocationButton: boolean;
  isLocating: boolean;
}
