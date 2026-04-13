"use client";

import { motion } from "framer-motion";
import { weekdayLabels, formatDateKey, isClosedByRule, formatTimeRange } from "./types";
import type { DaySchedule, ClosedDayRule } from "./types";

/** 日・土をやや狭くし、平日列を確保（曜日行と日付グリッドで共通） */
const MONTH_GRID_COLS =
  "[grid-template-columns:minmax(0,0.88fr)_repeat(5,minmax(0,1fr))_minmax(0,0.88fr)]";

interface MonthViewProps {
  year: number;
  month: number;
  schedules: Record<string, DaySchedule>;
  onDayClick: (y: number, m: number, d: number) => void;
  defaultOpenTime?: string;
  defaultCloseTime?: string;
  closedDayRules?: ClosedDayRule[];
}

export function MonthView({
  year,
  month,
  schedules,
  onDayClick,
  defaultOpenTime = "10:00",
  defaultCloseTime = "19:00",
  closedDayRules = [],
}: MonthViewProps) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonthDays = new Date(year, month, 0).getDate();
  const nextMonthStart = 1;

  const cells: Array<{ y: number; m: number; d: number; isCurrentMonth: boolean }> = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    const pm = month === 0 ? 11 : month - 1;
    const py = month === 0 ? year - 1 : year;
    cells.push({ y: py, m: pm, d: prevMonthDays - i, isCurrentMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ y: year, m: month, d, isCurrentMonth: true });
  }
  const remaining = 7 - (cells.length % 7);
  if (remaining < 7) {
    for (let d = 0; d < remaining; d++) {
      const nm = month === 11 ? 0 : month + 1;
      const ny = month === 11 ? year + 1 : year;
      cells.push({ y: ny, m: nm, d: nextMonthStart + d, isCurrentMonth: false });
    }
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className={`grid bg-gray-100 border-b border-gray-300 ${MONTH_GRID_COLS}`}>
        {weekdayLabels.map((label, i) => (
          <div
            key={label}
            className={`text-center text-xs font-bold py-1 px-0.5 leading-none ${
              i === 0 ? "text-red-500" : i === 6 ? "text-sky-600" : "text-gray-600"
            }`}
          >
            {label}
          </div>
        ))}
      </div>
      <div className={`grid ${MONTH_GRID_COLS}`}>
        {cells.map((cell, i) => {
          const key = formatDateKey(cell.y, cell.m, cell.d);
          const schedule = schedules[key];
          const closedByRule = isClosedByRule(closedDayRules, cell.y, cell.m, cell.d);
          const isOpen = schedule ? schedule.isOpen : !closedByRule;
          const dayOfWeek = new Date(cell.y, cell.m, cell.d).getDay();
          const isSunday = dayOfWeek === 0;

          return (
            <motion.div
              key={i}
              whileHover={{ backgroundColor: "#e0f2fe" }}
              onClick={() => onDayClick(cell.y, cell.m, cell.d)}
              className={`border-b border-r border-gray-200 min-h-[118px] p-1.5 cursor-pointer transition-colors flex flex-col ${
                cell.isCurrentMonth ? "" : "opacity-40"
              } ${isSunday && cell.isCurrentMonth ? "bg-sky-50/50" : ""}`}
            >
              <div
                className={`text-sm font-semibold mb-1 tabular-nums ${
                  isSunday ? "text-red-500" : dayOfWeek === 6 ? "text-sky-600" : "text-gray-800"
                }`}
              >
                {cell.d}日
              </div>
              {cell.isCurrentMonth && isOpen && (() => {
                const range = formatTimeRange(
                  schedule?.openTime ?? defaultOpenTime,
                  schedule?.closeTime ?? defaultCloseTime,
                  defaultOpenTime,
                  defaultCloseTime
                );
                return (
                  <div className="text-xs px-1.5 py-1 rounded-md leading-snug shrink-0 bg-sky-500 text-white shadow-sm">
                    <div className="font-bold">営業日</div>
                    <div className="tabular-nums font-medium">{range}</div>
                  </div>
                );
              })()}
              {cell.isCurrentMonth && !isOpen && (
                <div className="text-xs px-1.5 py-1 rounded-md bg-amber-400 text-white shrink-0 font-semibold">
                  休業日
                </div>
              )}
              {cell.isCurrentMonth && schedule?.dailyNote?.trim() ? (
                <p
                  className={`text-[11px] mt-1 leading-snug line-clamp-2 flex-1 min-h-0 ${
                    isOpen ? "text-gray-700" : "text-amber-900"
                  }`}
                >
                  {schedule.dailyNote.trim()}
                </p>
              ) : null}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
