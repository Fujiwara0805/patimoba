"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MonthView } from "@/components/store/business-days/month-view";
import { WeekView } from "@/components/store/business-days/week-view";
import { DayView } from "@/components/store/business-days/day-view";
import type { DaySchedule, ViewMode } from "@/components/store/business-days/types";
import {
  defaultOpen,
  defaultClose,
  closedDayRules,
  getWeekStartDate,
  weekdayLabels,
} from "@/components/store/business-days/types";

export default function BusinessDaysPage() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [viewMode, setViewMode] = useState<ViewMode>("month");
  const [schedules, setSchedules] = useState<Record<string, DaySchedule>>({});
  const [showNextMonthAlert, setShowNextMonthAlert] = useState(true);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  const [weekStart, setWeekStart] = useState(() => {
    const d = new Date(today);
    d.setDate(d.getDate() - d.getDay());
    return d;
  });

  const nextMonthLabel = `${month + 2 > 12 ? 1 : month + 2}月`;

  const prevNav = () => {
    if (viewMode === "month") {
      if (month === 0) {
        setYear(year - 1);
        setMonth(11);
      } else {
        setMonth(month - 1);
      }
    } else if (viewMode === "week") {
      const d = new Date(weekStart);
      d.setDate(d.getDate() - 7);
      setWeekStart(d);
    } else {
      const d = new Date(year, month, selectedDay - 1);
      setYear(d.getFullYear());
      setMonth(d.getMonth());
      setSelectedDay(d.getDate());
    }
  };

  const nextNav = () => {
    if (viewMode === "month") {
      if (month === 11) {
        setYear(year + 1);
        setMonth(0);
      } else {
        setMonth(month + 1);
      }
    } else if (viewMode === "week") {
      const d = new Date(weekStart);
      d.setDate(d.getDate() + 7);
      setWeekStart(d);
    } else {
      const d = new Date(year, month, selectedDay + 1);
      setYear(d.getFullYear());
      setMonth(d.getMonth());
      setSelectedDay(d.getDate());
    }
  };

  const goToToday = () => {
    const t = new Date();
    setYear(t.getFullYear());
    setMonth(t.getMonth());
    setSelectedDay(t.getDate());
    setWeekStart(getWeekStartDate(t));
  };

  const handleDayClick = useCallback(
    (y: number, m: number, d: number) => {
      setYear(y);
      setMonth(m);
      setSelectedDay(d);
      setViewMode("day");
    },
    []
  );

  const handleUpdateSchedule = useCallback(
    (key: string, schedule: DaySchedule) => {
      setSchedules((prev) => ({ ...prev, [key]: schedule }));
    },
    []
  );

  const handleSubmit = () => {
    setShowSubmitConfirm(true);
    setTimeout(() => setShowSubmitConfirm(false), 2000);
  };

  const getTitle = () => {
    if (viewMode === "month") {
      return `${year}年${month + 1}月`;
    }
    if (viewMode === "week") {
      const end = new Date(weekStart);
      end.setDate(end.getDate() + 6);
      return `${weekStart.getFullYear()}年${weekStart.getMonth() + 1}月${weekStart.getDate()}日 – ${end.getMonth() + 1}月${end.getDate()}日`;
    }
    return `${year}年${month + 1}月${selectedDay}日`;
  };

  return (
    <div className="p-6 relative">
      <div className="flex items-start gap-8 mb-6">
        <div>
          <div className="flex items-center gap-8 mb-1">
            <div>
              <span className="text-xs text-gray-500 block">OPEN</span>
              <span className="text-3xl font-bold">{defaultOpen}</span>
            </div>
            <div>
              <span className="text-xs text-gray-500 block">CLOSE</span>
              <span className="text-3xl font-bold">{defaultClose}</span>
            </div>
          </div>
          <div className="mt-1">
            <span className="text-sm text-gray-500">定休日</span>
            <div className="flex items-center gap-6 mt-0.5">
              {closedDayRules.map((r, i) => (
                <span key={i} className="text-sm font-medium">
                  {r.day} <span className="text-gray-500">{r.rule}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm mt-1"
        >
          {nextMonthLabel}の営業日を提出
        </button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={goToToday}
            className="border border-gray-400 text-gray-700 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            今日
          </button>
          <div className="flex items-center border border-gray-400 rounded-lg overflow-hidden">
            <button
              onClick={prevNav}
              className="px-2 py-1.5 hover:bg-gray-100 transition-colors border-r border-gray-400"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextNav}
              className="px-2 py-1.5 hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <h2 className="text-lg font-bold">{getTitle()}</h2>

        <div className="flex items-center border border-gray-400 rounded-lg overflow-hidden">
          {(["month", "week", "day"] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => {
                setViewMode(mode);
                if (mode === "week") {
                  setWeekStart(getWeekStartDate(new Date(year, month, selectedDay)));
                }
              }}
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                viewMode === mode
                  ? "bg-gray-700 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              } ${mode !== "day" ? "border-r border-gray-400" : ""}`}
            >
              {mode === "month" ? "月" : mode === "week" ? "週" : "日"}
            </button>
          ))}
        </div>
      </div>

      {viewMode === "month" && (
        <MonthView
          year={year}
          month={month}
          schedules={schedules}
          onDayClick={handleDayClick}
        />
      )}

      {viewMode === "week" && (
        <WeekView
          weekStart={weekStart}
          schedules={schedules}
          onDayClick={handleDayClick}
        />
      )}

      {viewMode === "day" && (
        <DayView
          year={year}
          month={month}
          day={selectedDay}
          schedules={schedules}
          onUpdateSchedule={handleUpdateSchedule}
        />
      )}

      <AnimatePresence>
        {showNextMonthAlert && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
            onClick={() => setShowNextMonthAlert(false)}
          >
            <motion.div
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              className="bg-white rounded-xl px-12 py-8 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-lg font-bold text-center">
                来月の営業日を確認してください!
              </p>
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setShowNextMonthAlert(false)}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-2 rounded-lg transition-colors text-sm"
                >
                  OK
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSubmitConfirm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
            onClick={() => setShowSubmitConfirm(false)}
          >
            <motion.div
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              className="bg-white rounded-xl px-12 py-8 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-lg font-bold text-center">
                {month + 1}月の予定を提出しました
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
