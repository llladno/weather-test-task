import type { GeolocationErrorReason } from "../useGeolocation";

export const REASON_TEXT: Record<GeolocationErrorReason, { title: string; description: string }> = {
  denied: {
    title: "Геолокация недоступна",
    description:
      "Доступ к геолокации запрещён. Разрешите его в настройках браузера или найдите город через поиск.",
  },
  unsupported: {
    title: "Геолокация не поддерживается",
    description:
      "Ваш браузер не поддерживает определение местоположения. Найдите город через поиск.",
  },
  unavailable: {
    title: "Не удалось определить местоположение",
    description: "Попробуйте ещё раз позже или найдите город через поиск.",
  },
};
