import { toCityDate, getCityDayKey } from "./localTime";
import { FALLBACK_WEATHER_CONDITION, type ForecastListItem, type WeatherCondition } from "./types";

export interface DailyForecast {
  dayKey: string;
  date: Date;
  minTemp: number;
  maxTemp: number;
  condition: WeatherCondition;
}

const pickMiddayCondition = (
  items: ForecastListItem[],
  timezoneOffsetSeconds: number,
): WeatherCondition => {
  const closestToMidday = items.reduce((best, item) => {
    const bestHour = toCityDate(best.dt, timezoneOffsetSeconds).getUTCHours();
    const itemHour = toCityDate(item.dt, timezoneOffsetSeconds).getUTCHours();
    return Math.abs(itemHour - 12) < Math.abs(bestHour - 12) ? item : best;
  });
  return closestToMidday.weather[0] ?? FALLBACK_WEATHER_CONDITION;
};

export const groupForecastByDay = (
  items: ForecastListItem[],
  timezoneOffsetSeconds: number,
): DailyForecast[] => {
  const groups = new Map<string, ForecastListItem[]>();

  for (const item of items) {
    const key = getCityDayKey(toCityDate(item.dt, timezoneOffsetSeconds));
    const existing = groups.get(key);
    if (existing) {
      existing.push(item);
    } else {
      groups.set(key, [item]);
    }
  }

  return Array.from(groups.entries()).map(([dayKey, dayItems]) => {
    const temps = dayItems.map((item) => item.main.temp);
    return {
      dayKey,
      date: toCityDate(dayItems[0].dt, timezoneOffsetSeconds),
      minTemp: Math.min(...temps),
      maxTemp: Math.max(...temps),
      condition: pickMiddayCondition(dayItems, timezoneOffsetSeconds),
    };
  });
};
