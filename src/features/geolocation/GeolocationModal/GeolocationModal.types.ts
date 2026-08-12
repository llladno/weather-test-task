import type { GeolocationErrorReason } from "../useGeolocation";

export interface GeolocationModalProps {
  reason: GeolocationErrorReason;
  onClose: () => void;
}
