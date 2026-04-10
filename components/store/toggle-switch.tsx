"use client";

import { motion } from "framer-motion";

/** w-12(48px) - left-0.5(2px) - knob(20px) - right inset(2px) */
const KNOB_TRAVEL_PX = 24;

interface ToggleSwitchProps {
  enabled: boolean;
  onToggle: () => void;
  colorOn?: string;
  colorOff?: string;
}

export function ToggleSwitch({
  enabled,
  onToggle,
  colorOn = "bg-green-500",
  colorOff = "bg-gray-300",
}: ToggleSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className={`relative h-6 w-12 shrink-0 rounded-full transition-colors duration-200 ${
        enabled ? colorOn : colorOff
      }`}
    >
      <motion.span
        className="pointer-events-none absolute left-0.5 top-0.5 block h-5 w-5 rounded-full bg-white shadow"
        initial={false}
        animate={{ x: enabled ? KNOB_TRAVEL_PX : 0 }}
        transition={{
          type: "spring",
          stiffness: 520,
          damping: 34,
          mass: 0.35,
        }}
      />
    </button>
  );
}
