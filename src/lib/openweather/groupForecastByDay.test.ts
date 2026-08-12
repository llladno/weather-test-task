import { describe, expect, it } from "vitest";
import { groupForecastByDay } from "./groupForecastByDay";
import type { ForecastListItem, WeatherCondition } from "./types";

const condition = (main: string): WeatherCondition => ({
  id: 800,
  main,
  description: main,
  icon: "01d",
});

const item = (isoWithoutMs: string, temp: number, main: string): ForecastListItem => ({
  dt: Math.floor(new Date(isoWithoutMs).getTime() / 1000),
  main: { temp, feels_like: temp, temp_min: temp, temp_max: temp, pressure: 1013, humidity: 50 },
  weather: [condition(main)],
  wind: { speed: 1, deg: 0 },
  visibility: 10000,
  clouds: { all: 0 },
  pop: 0,
  dt_txt: isoWithoutMs,
});

describe("groupForecastByDay", () => {
  it("splits items into one group per calendar day and computes min/max temp", () => {
    const items: ForecastListItem[] = [
      item("2024-01-01T00:00:00.000Z", 1, "Clear"),
      item("2024-01-01T12:00:00.000Z", 5, "Clouds"),
      item("2024-01-01T21:00:00.000Z", 3, "Rain"),
      item("2024-01-02T09:00:00.000Z", 10, "Clear"),
    ];

    const days = groupForecastByDay(items, 0);

    expect(days).toHaveLength(2);
    expect(days[0].dayKey).toBe("2024-01-01");
    expect(days[0].minTemp).toBe(1);
    expect(days[0].maxTemp).toBe(5);
    expect(days[1].dayKey).toBe("2024-01-02");
    expect(days[1].minTemp).toBe(10);
    expect(days[1].maxTemp).toBe(10);
  });

  it("picks the condition of the forecast entry closest to midday for each day", () => {
    const items: ForecastListItem[] = [
      item("2024-01-01T00:00:00.000Z", 1, "Clear"),
      item("2024-01-01T12:00:00.000Z", 5, "Clouds"),
      item("2024-01-01T21:00:00.000Z", 3, "Rain"),
    ];

    const [day] = groupForecastByDay(items, 0);

    expect(day.condition.main).toBe("Clouds");
  });

  it("shifts the day boundary according to the city's timezone offset", () => {
    const items: ForecastListItem[] = [
      // 23:30 UTC on Jan 1st, but 01:30 local time on Jan 2nd for a +2h offset city.
      item("2024-01-01T23:30:00.000Z", 4, "Clear"),
    ];

    const [day] = groupForecastByDay(items, 2 * 60 * 60);

    expect(day.dayKey).toBe("2024-01-02");
  });
});
