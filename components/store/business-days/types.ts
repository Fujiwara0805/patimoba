export interface DaySchedule {
  date: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

export type ViewMode = "month" | "week" | "day";

export const weekdayLabels = ["日", "月", "火", "水", "木", "金", "土"];

export const closedDayRules = [
  { day: "火曜日", rule: "毎週" },
  { day: "木曜日", rule: "第1.4" },
];

export const defaultOpen = "01:00";
export const defaultClose = "08:00";

export const storeOpenTime = "10:00";
export const storeCloseTime = "18:00";

export function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export function dateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function isDefaultClosed(year: number, month: number, day: number): boolean {
  const d = new Date(year, month, day);
  const dow = d.getDay();
  if (dow === 2) return true;

  if (dow === 4) {
    const weekNum = Math.ceil(day / 7);
    if (weekNum === 1 || weekNum === 4) return true;
  }
  return false;
}

export function getWeekStartDate(date: Date): Date {
  const d = new Date(date);
  const dayOfWeek = d.getDay();
  d.setDate(d.getDate() - dayOfWeek);
  return d;
}

export const timeSlots = Array.from({ length: 24 }, (_, i) => i);

export const hourOptions = Array.from({ length: 24 }, (_, i) => {
  const h = i.toString().padStart(2, "0");
  return `${h}:00`;
});
