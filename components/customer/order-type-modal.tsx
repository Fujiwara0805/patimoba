"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Clock, CalendarDays } from "lucide-react";

interface OrderTypeModalProps {
  open: boolean;
  storeName: string;
  onClose: () => void;
  onSelectSameDay: () => void;
  onSelectReservation: () => void;
}

export function OrderTypeModal({
  open,
  storeName,
  onClose,
  onSelectSameDay,
  onSelectReservation,
}: OrderTypeModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[60]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-[10%] bg-white rounded-2xl shadow-2xl z-[70] max-h-[80vh] overflow-y-auto"
          >
            <div className="px-6 pt-8 pb-6">
              <h2 className="text-xl font-bold text-gray-900 text-center">
                ご注文方法を選択してください
              </h2>
              <p className="text-sm text-gray-400 text-center mt-1">
                シーンに合わせてお選びいただけます
              </p>

              <div className="flex items-center justify-center gap-3 mt-6 mb-6">
                <span className="text-xs text-gray-400 tracking-wider">Patisserie</span>
                <span className="font-bold text-lg text-gray-900">{storeName}</span>
              </div>

              <button
                onClick={onSelectSameDay}
                className="w-full border border-gray-200 rounded-xl p-5 mb-4 text-left hover:shadow-md transition-shadow bg-white relative overflow-hidden"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-amber-500" />
                  </div>
                  <span className="text-lg font-bold text-gray-400">当日受取注文</span>
                </div>
                <p className="text-sm text-gray-400 ml-[52px]">
                  本日お店に並んでいる商品からご注文いただけます。
                </p>
                <div className="mt-3 ml-[52px] bg-[#FFF9C4] rounded-lg px-4 py-3">
                  <p className="text-sm text-gray-700">
                    ただいま当日注文は受け付けていません。
                  </p>
                  <p className="text-sm text-gray-700">
                    営業日の<span className="font-bold text-red-500">10:30~15:00</span>の間で受付しています。
                  </p>
                </div>
              </button>

              <button
                onClick={onSelectReservation}
                className="w-full border border-gray-200 rounded-xl p-5 text-left hover:shadow-md transition-shadow bg-white"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                    <CalendarDays className="w-5 h-5 text-red-500" />
                  </div>
                  <span className="text-lg font-bold text-gray-900">予約注文</span>
                </div>
                <p className="text-sm text-gray-600 ml-[52px]">
                  24時間ご予約を受付しています。
                </p>
                <p className="text-sm text-gray-600 ml-[52px]">
                  本日から2営業日後以降からご予約いただけます。
                </p>
                <div className="mt-3 ml-[52px]">
                  <p className="text-sm text-red-500 font-bold">
                    ホールケーキなどのご注文はこちら
                  </p>
                </div>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
