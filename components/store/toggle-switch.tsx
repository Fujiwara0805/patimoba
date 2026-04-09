"use client";

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
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className={`relative w-12 h-6 rounded-full transition-colors ${
        enabled ? colorOn : colorOff
      }`}
    >
      <span
        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
          enabled ? "translate-x-0.5" : "translate-x-6"
        }`}
      />
    </button>
  );
}
