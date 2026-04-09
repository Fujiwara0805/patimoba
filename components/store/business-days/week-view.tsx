"use client";

import {
  weekdayLabels,
  dateKey,
  isDefaultClosed,
  timeSlots,
} from "./types";
import type { DaySchedule } from "./types";

interface WeekViewProps {
  weekStart: Date;
  schedules: Record<string, DaySchedule>;
  onDayClick: (year: number, month: number, day: number) => void;
}

export function WeekView({ weekStart, schedules, onDayClick }: WeekViewProps) {
  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    days.push(d);
  }

  const visibleHours = timeSlots.filter((h) => h >= 6 && h <= 20);

  return (
    <div className="border border-gray-300 bg-white overflow-auto">
      <div className="grid grid-cols-[50px_repeat(7,1fr)] min-w-[700px]">
        <div className="bg-gray-100 border-b border-r border-gray-300" />
        {days.map((d, i) => (
          <div
            key={i}
            className="text-center text-xs font-bold py-2 bg-gray-100 border-b border-r border-gray-300 text-gray-600 cursor-pointer hover:bg-gray-200 transition-colors"
            onClick={() => onDayClick(d.getFullYear(), d.getMonth(), d.getDate())}
          >
            {weekdayLabels[d.getDay()]} {String(d.getDate()).padStart(2, "0")}/{String(d.getMonth() + 1).padStart(2, "0")}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[50px_repeat(7,1fr)] min-w-[700px]">
        <div className="text-xs text-gray-500 text-right pr-1 py-1 border-r border-b border-gray-200 bg-gray-50">
          終日
        </div>
        {days.map((d, i) => {
          const key = dateKey(d.getFullYear(), d.getMonth(), d.getDate());
          const schedule = schedules[key];
          const isClosed = schedule
            ? !schedule.isOpen
            : isDefaultClosed(d.getFullYear(), d.getMonth(), d.getDate());

          return (
            <div
              key={i}
              className="border-r border-b border-gray-200 h-8 p-0.5"
            >
              {isClosed && (
                <div className="bg-amber-400 h-full rounded-sm" />
              )}
            </div>
          );
        })}
      </div>

      {visibleHours.map((hour) => (
        <div
          key={hour}
          className="grid grid-cols-[50px_repeat(7,1fr)] min-w-[700px]"
        >
          <div className="text-xs text-gray-500 text-right pr-1 py-1 border-r border-b border-gray-200 bg-gray-50">
            {hour}時
          </div>
          {days.map((d, i) => {
            const key = dateKey(d.getFullYear(), d.getMonth(), d.getDate());
            const schedule = schedules[key];
            const isClosed = schedule
              ? !schedule.isOpen
              : isDefaultClosed(d.getFullYear(), d.getMonth(), d.getDate());
            const openH = parseInt(schedule?.openTime || "10");
            const closeH = parseInt(schedule?.closeTime || "18");
            const isBusinessHour = !isClosed && hour >= openH && hour < closeH;
            const isFirst = !isClosed && hour === openH;

            return (
              <div
                key={i}
                className={`border-r border-b border-gray-200 h-10 relative ${
                  isBusinessHour ? "bg-[#5B8FA8]" : ""
                }`}
              >
                {isFirst && (
                  <div className="absolute top-0.5 left-1 text-[9px] text-white leading-tight">
                    {schedule?.openTime || "10:00"} - {schedule?.closeTime || "18:00"}
                    <br />営業日
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
