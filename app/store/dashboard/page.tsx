"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign,
  Users,
  Building2,
  User,
  Loader2,
} from "lucide-react";
import { useOrders } from "@/hooks/use-orders";
import { useDashboardStats } from "@/hooks/use-dashboard-stats";
import { useStoreContext } from "@/lib/store-context";
import { DatePickerPopup } from "@/components/store/date-picker-popup";
import { useOrderMutations } from "@/hooks/use-order-mutations";

const dayNames = ["日", "月", "火", "水", "木", "金", "土"];

type ConfirmAction = {
  orderId: string;
  toReady: boolean;
};

export default function StoreDashboardPage() {
  const { storeId } = useStoreContext();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { orders, loading: ordersLoading, refetch: refetchOrders } = useOrders({
    storeId,
    date: selectedDate.toISOString(),
  });
  const { stats, loading: statsLoading } = useDashboardStats(storeId);
  const { updateOrderStatus } = useOrderMutations();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [confirmAction, setConfirmAction] = useState<ConfirmAction | null>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const dateRef = useRef<HTMLDivElement>(null);

  const dateStr = `${selectedDate.getFullYear()}年${
    selectedDate.getMonth() + 1
  }月${selectedDate.getDate()}日(${dayNames[selectedDate.getDay()]})`;

  const handleConfirm = async () => {
    if (!confirmAction || confirmLoading) return;
    setConfirmLoading(true);
    try {
      await updateOrderStatus(
        confirmAction.orderId,
        confirmAction.toReady ? "ready" : "pending"
      );
      await refetchOrders();
    } finally {
      setConfirmAction(null);
      setConfirmLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dateRef.current && !dateRef.current.contains(e.target as Node)) {
        setShowDatePicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (ordersLoading || statsLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <p className="text-gray-500">読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-end mb-6" ref={dateRef}>
        <div className="relative">
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {dateStr}
          </button>
          <AnimatePresence>
            {showDatePicker && (
              <DatePickerPopup
                selectedDate={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date);
                  setShowDatePicker(false);
                }}
                onClear={() => setSelectedDate(new Date())}
                onClose={() => setShowDatePicker(false)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-1">
            <DollarSign className="w-4 h-4 text-amber-500" />
            本日の売上速報
          </div>
          <p className="text-2xl font-bold">
            &yen;{stats.todaySales.toLocaleString()}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-1">
            <Users className="w-4 h-4 text-amber-500" />
            今日の注文件数
          </div>
          <p className="text-2xl font-bold">{stats.todayOrders}件</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-1">
            <Building2 className="w-4 h-4 text-amber-500" />
            今月の総売上
          </div>
          <p className="text-2xl font-bold">
            &yen;{stats.monthlySales.toLocaleString()}
          </p>
        </motion.div>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="grid grid-cols-[1fr_1fr_1.5fr_auto_1fr_120px] bg-[#FFF176] px-4 py-2.5 text-sm font-bold text-gray-700 items-center">
          <span>顧客名</span>
          <span>来店時間</span>
          <span>注文内容</span>
          <span />
          <span>合計金額</span>
          <span className="text-center">準備状況</span>
        </div>

        {orders.length === 0 ? (
          <div className="px-4 py-10 text-center text-sm text-gray-400 bg-white">
            表示する注文はありません
          </div>
        ) : (
          orders.map((order, i) => {
            const isPrepared =
              order.orderStatus === "ready" || order.orderStatus === "completed";
            const isDelivery = order.orderType === "delivery";

            return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ delay: i * 0.05 }}
              className={`grid grid-cols-[1fr_1fr_1.5fr_auto_1fr_120px] px-4 py-3 items-center border-t border-gray-100 ${
                isPrepared
                  ? "bg-white"
                  : isDelivery
                    ? "bg-pink-50"
                    : "bg-white"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-500" />
                </div>
                <span className="text-sm">{order.customerName || "-"}</span>
              </div>

              <div className="text-sm text-gray-600">
                {order.pickupTime ? (
                  <div>{order.pickupTime.slice(0, 5)}</div>
                ) : (
                  "-"
                )}
              </div>

              <div className="text-sm">
                {order.items.map((item, j) => (
                  <div key={j}>{item.name}</div>
                ))}
              </div>

              <div className="text-sm text-gray-500 px-2">
                {order.items.map((item, j) => (
                  <div key={j}>&times;{item.quantity}</div>
                ))}
              </div>

              <div>
                <div className="text-sm font-bold">
                  &yen;{order.totalAmount.toLocaleString()}
                </div>
                <div
                  className={`text-xs ${
                    order.paymentStatus === "決済済み"
                      ? "text-green-600"
                      : order.paymentStatus === "店頭支払い" ||
                          order.paymentStatus === "銀行振込"
                        ? "text-blue-600"
                        : "text-gray-500"
                  }`}
                >
                  {order.paymentStatus}
                </div>
              </div>

              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() =>
                    setConfirmAction({
                      orderId: order.id,
                      toReady: !isPrepared,
                    })
                  }
                  className={`min-w-[56px] text-sm font-bold px-3 py-2 rounded-lg transition-colors ${
                    isPrepared
                      ? "bg-amber-400 hover:bg-amber-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  }`}
                >
                  {isPrepared ? "済" : "未"}
                </motion.button>
              </div>
            </motion.div>
            );
          })
        )}
      </div>

      <AnimatePresence>
        {confirmAction && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-50"
              onClick={() => !confirmLoading && setConfirmAction(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.18 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-[60] p-6 w-[90%] max-w-sm"
            >
              <h3 className="text-base font-bold text-center mb-2">
                {confirmAction.toReady
                  ? "準備完了にします"
                  : "準備未完了に戻す"}
              </h3>
              <p className="text-xs text-gray-500 text-center mb-5">
                {confirmAction.toReady
                  ? "この注文を準備完了にしますか？"
                  : "この注文を未準備に戻しますか？"}
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  disabled={confirmLoading}
                  onClick={() => setConfirmAction(null)}
                  className="flex-1 border-2 border-gray-300 text-gray-700 font-bold py-2.5 rounded-full text-sm hover:bg-gray-50 transition-colors disabled:opacity-60"
                >
                  キャンセル
                </button>
                <button
                  type="button"
                  disabled={confirmLoading}
                  onClick={handleConfirm}
                  className={`flex-1 font-bold py-2.5 rounded-full text-sm flex items-center justify-center gap-1 disabled:opacity-60 text-white ${
                    confirmAction.toReady
                      ? "bg-amber-400 hover:bg-amber-500"
                      : "bg-gray-500 hover:bg-gray-600"
                  }`}
                >
                  {confirmLoading && (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  )}
                  はい
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
