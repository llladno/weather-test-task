export const toCityDate = (unixSeconds: number, timezoneOffsetSeconds: number): Date =>
  new Date((unixSeconds + timezoneOffsetSeconds) * 1000);

export const formatCityHour = (date: Date): string =>
  new Intl.DateTimeFormat("ru-RU", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" }).format(
    date,
  );

export const formatCityWeekday = (date: Date): string =>
  new Intl.DateTimeFormat("ru-RU", { weekday: "short", timeZone: "UTC" }).format(date);

export const formatCityDate = (date: Date): string =>
  new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "short", timeZone: "UTC" }).format(
    date,
  );

export const getCityDayKey = (date: Date): string => date.toISOString().slice(0, 10);
