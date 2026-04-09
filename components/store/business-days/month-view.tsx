"use client";

import {
  weekdayLabels,
  getDaysInMonth,
  getFirstDayOfMonth,
  dateKey,
  isDefaultClosed,
} from "./types";
import type { DaySchedule } from "./types";

interface MonthViewProps {
  year: number;
  month: number;
  schedules: Record<string, DaySchedule>;
  onDayClick: (year: number, month: number, day: number) => void;
}

export function MonthView({ year, month, schedules, onDayClick }: MonthViewProps) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const prevDaysInMonth = getDaysInMonth(prevYear, prevMonth);

  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;

  const cells: { day: number; inMonth: boolean; year: number; month: number }[] = [];

  for (let i = 0; i < firstDay; i++) {
    cells.push({
      day: prevDaysInMonth - firstDay + 1 + i,
      inMonth: false,
      year: prevYear,
      month: prevMonth,
    });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, inMonth: true, year, month });
  }
  const remaining = Math.ceil(cells.length / 7) * 7 - cells.length;
  for (let i = 1; i <= remaining; i++) {
    cells.push({ day: i, inMonth: false, year: nextYear, month: nextMonth });
  }

  const today = new Date();

  return (
    <div className="border border-gray-300 bg-white">
      <div className="grid grid-cols-7">
        {weekdayLabels.map((label) => (
          <div
            key={label}
            className="text-center text-sm font-bold py-2 bg-gray-100 border-b border-gray-300 text-gray-600"
          >
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {cells.map((cell, i) => {
          const key = dateKey(cell.year, cell.month, cell.day);
          const schedule = schedules[key];
          const isClosed = schedule
            ? !schedule.isOpen
            : isDefaultClosed(cell.year, cell.month, cell.day);
          const openTime = schedule?.openTime || "10";
          const isToday =
            cell.inMonth &&
            today.getFullYear() === cell.year &&
            today.getMonth() === cell.month &&
            today.getDate() === cell.day;

          return (
            <div
              key={i}
              onClick={() => cell.inMonth && onDayClick(cell.year, cell.month, cell.day)}
              className={`min-h-[80px] border-b border-r border-gray-200 p-1 relative cursor-pointer hover:bg-gray-50 transition-colors ${
                !cell.inMonth ? "bg-gray-50" : ""
              }`}
            >
              <div className="flex justify-end">
                <span
                  className={`text-xs px-1 ${
                    !cell.inMonth
                      ? "text-gray-300"
                      : isToday
                      ? "bg-amber-400 text-white rounded px-1.5 py-0.5 font-bold"
                      : "text-gray-600"
                  }`}
                >
                  {cell.day}日
                </span>
              </div>

              {cell.inMonth && !isClosed && (
                <div className="mt-1 mx-0.5">
                  <div className="bg-[#5B8FA8] text-white text-[10px] rounded px-1 py-0.5 truncate">
                    {openTime.replace(":00", "")}時 営業日
                  </div>
                </div>
              )}
              {cell.inMonth && isClosed && (
                <div className="mt-1 mx-0.5">
                  <div className="bg-[#C9B97A] text-white text-[10px] rounded px-1 py-0.5 truncate opacity-60">
                    3時 営業日
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
