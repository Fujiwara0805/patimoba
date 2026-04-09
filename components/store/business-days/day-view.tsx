"use client";

import { useState } from "react";
import { X } from "lucide-react";
import {
  weekdayLabels,
  dateKey,
  isDefaultClosed,
  timeSlots,
  hourOptions,
} from "./types";
import type { DaySchedule } from "./types";

interface DayViewProps {
  year: number;
  month: number;
  day: number;
  schedules: Record<string, DaySchedule>;
  onUpdateSchedule: (key: string, schedule: DaySchedule) => void;
}

export function DayView({ year, month, day, schedules, onUpdateSchedule }: DayViewProps) {
  const key = dateKey(year, month, day);
  const schedule = schedules[key];
  const isClosed = schedule
    ? !schedule.isOpen
    : isDefaultClosed(year, month, day);
  const openH = parseInt(schedule?.openTime || "10");
  const closeH = parseInt(schedule?.closeTime || "18");
  const dow = new Date(year, month, day).getDay();

  const [showPanel, setShowPanel] = useState(false);
  const [editOpen, setEditOpen] = useState(schedule?.openTime || "10:00");
  const [editClose, setEditClose] = useState(schedule?.closeTime || "18:00");

  const visibleHours = timeSlots.filter((h) => h >= 6 && h <= 20);

  const applyTimeChange = () => {
    onUpdateSchedule(key, {
      date: key,
      isOpen: true,
      openTime: editOpen,
      closeTime: editClose,
    });
    setShowPanel(false);
  };

  const markAsHoliday = () => {
    onUpdateSchedule(key, {
      date: key,
      isOpen: false,
      openTime: "10:00",
      closeTime: "18:00",
    });
    setShowPanel(false);
  };

  return (
    <div className="flex gap-0">
      <div className="flex-1 border border-gray-300 bg-white overflow-auto">
        <div className="grid grid-cols-[50px_1fr]">
          <div className="bg-gray-100 border-b border-r border-gray-300" />
          <div
            className="text-center text-sm font-bold py-2 bg-gray-100 border-b border-gray-300 text-gray-600 cursor-pointer hover:bg-gray-200 transition-colors"
            onClick={() => setShowPanel(true)}
          >
            {weekdayLabels[dow]}曜日
          </div>
        </div>

        <div className="grid grid-cols-[50px_1fr]">
          <div className="text-xs text-gray-500 text-right pr-1 py-1 border-r border-b border-gray-200 bg-gray-50">
            終日
          </div>
          <div className="border-b border-gray-200 h-8 p-0.5">
            {isClosed && (
              <div className="bg-amber-400 h-full rounded-sm" />
            )}
          </div>
        </div>

        {visibleHours.map((hour) => {
          const isBusinessHour = !isClosed && hour >= openH && hour < closeH;
          const isFirst = !isClosed && hour === openH;

          return (
            <div
              key={hour}
              className="grid grid-cols-[50px_1fr] cursor-pointer"
              onClick={() => setShowPanel(true)}
            >
              <div className="text-xs text-gray-500 text-right pr-1 py-1 border-r border-b border-gray-200 bg-gray-50">
                {hour}時
              </div>
              <div
                className={`border-b border-gray-200 h-10 relative ${
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
            </div>
          );
        })}
      </div>

      {showPanel && (
        <div className="w-[280px] bg-white border-l border-gray-200 p-6 relative shrink-0">
          <button
            onClick={() => setShowPanel(false)}
            className="absolute top-3 right-3 p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          <h3 className="text-base font-bold text-center mb-2">営業時間の変更</h3>
          <p className="text-base font-bold text-center mb-6">
            {year}年{month + 1}月{day}日
          </p>

          <div className="space-y-4 mb-6">
            <div>
              <label className="text-sm font-bold block mb-1">OPEN</label>
              <select
                value={editOpen}
                onChange={(e) => setEditOpen(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="" disabled>開店時刻</option>
                {hourOptions.map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-bold block mb-1">CLOSE</label>
              <select
                value={editClose}
                onChange={(e) => setEditClose(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="" disabled>閉店時刻</option>
                {hourOptions.map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={applyTimeChange}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2.5 rounded-lg transition-colors text-sm"
            >
              上記の時間に変更
            </button>
            <button
              onClick={markAsHoliday}
              className="w-full bg-amber-400 hover:bg-amber-500 text-white font-bold py-2.5 rounded-lg transition-colors text-sm"
            >
              休みに変更
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
