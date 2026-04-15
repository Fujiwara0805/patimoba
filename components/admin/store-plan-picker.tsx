"use client";

import { motion } from "framer-motion";
import {
  PLAN_OPTIONS,
  type StorePlanSlug,
} from "@/lib/store-plans";

export function StorePlanPicker({
  value,
  onChange,
}: {
  value: StorePlanSlug;
  onChange: (plan: StorePlanSlug) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {PLAN_OPTIONS.map((opt, i) => {
        const selected = value === opt.slug;
        return (
          <motion.button
            key={opt.slug}
            type="button"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, type: "spring", stiffness: 320, damping: 28 }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange(opt.slug)}
            className={`text-left border-2 rounded-xl p-5 transition-colors relative min-h-[180px] ${
              selected
                ? "border-amber-500 bg-amber-50/50 shadow-md ring-1 ring-amber-200/60"
                : "border-gray-200 hover:border-amber-200"
            }`}
          >
            {opt.badge && (
              <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {opt.badge}
              </span>
            )}
            <p className={`font-bold text-base mb-1 ${opt.accentClass}`}>{opt.label}</p>
            <p className="text-xl font-bold mb-3">
              月額 {opt.priceYen.toLocaleString("ja-JP")}
              <span className="text-base">円</span>
            </p>
            <ul className="space-y-1.5">
              {opt.features.map((f) => (
                <li key={f} className="text-xs text-gray-600">
                  ・{f}
                </li>
              ))}
            </ul>
          </motion.button>
        );
      })}
    </div>
  );
}
