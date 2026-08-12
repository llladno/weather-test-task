import { getCityDayKey } from "@/lib/openweather/localTime";
import type { CalendarCell } from "./DateSelector.types";

export const buildCalendarWeeks = (year: number, month: number): CalendarCell[][] => {
  const firstOfMonth = new Date(Date.UTC(year, month, 1));
  const firstWeekday = (firstOfMonth.getUTCDay() + 6) % 7;
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();

  const toCell = (day: number, inCurrentMonth: boolean): CalendarCell => {
    const date = new Date(Date.UTC(year, month, day));
    return { date, dayKey: getCityDayKey(date), inCurrentMonth };
  };

  const cells: CalendarCell[] = [];
  for (let day = 1 - firstWeekday; day <= daysInMonth; day += 1) {
    cells.push(toCell(day, day >= 1));
  }

  const trailingDays = (7 - (cells.length % 7)) % 7;
  for (let day = daysInMonth + 1; day <= daysInMonth + trailingDays; day += 1) {
    cells.push(toCell(day, false));
  }

  const weeks: CalendarCell[][] = [];
  for (let index = 0; index < cells.length; index += 7) {
    weeks.push(cells.slice(index, index + 7));
  }
  return weeks;
};
