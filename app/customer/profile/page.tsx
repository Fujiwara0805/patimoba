"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, User } from "lucide-react";
import { CustomerHeader } from "@/components/customer/customer-header";

interface Anniversary {
  id: string;
  label: string;
  month: string;
  day: string;
}

const years = Array.from({ length: 80 }, (_, i) => `${2010 - i}年`);
const months = Array.from({ length: 12 }, (_, i) => `${i + 1}月`);
const days = Array.from({ length: 31 }, (_, i) => `${i + 1}日`);

export default function CustomerProfilePage() {
  const [gender, setGender] = useState<string>("女性");
  const [anniversaries, setAnniversaries] = useState<Anniversary[]>([
    { id: "1", label: "誕生日", month: "3月", day: "15日" },
    { id: "2", label: "結婚記念日", month: "6月", day: "20日" },
  ]);

  const removeAnniversary = (id: string) => {
    setAnniversaries((prev) => prev.filter((a) => a.id !== id));
  };

  const addAnniversary = () => {
    setAnniversaries((prev) => [
      ...prev,
      {
        id: `${Date.now()}`,
        label: "",
        month: "1月",
        day: "1日",
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-white">
      <CustomerHeader
        shopName="Patisserie KANATA"
        points={105}
        showCart={false}
      />

      <div className="px-5 py-6 pb-12">
        <h1 className="text-lg font-bold text-gray-900 mb-6">
          お客様情報のご登録
        </h1>

        <section className="mb-6">
          <h2 className="text-sm font-bold text-gray-900 mb-4">
            お名前・連絡先
          </h2>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">姓</label>
              <input
                type="text"
                defaultValue="山田"
                className="w-full border-b border-gray-300 pb-2 text-sm focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">名</label>
              <input
                type="text"
                defaultValue="花子"
                className="w-full border-b border-gray-300 pb-2 text-sm focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs text-gray-500 mb-1">
              電話番号
            </label>
            <input
              type="tel"
              defaultValue="090-1234-5678"
              className="w-full border-b border-gray-300 pb-2 text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs text-gray-500 mb-1">
              メールアドレス
            </label>
            <input
              type="email"
              defaultValue="hanako.yamada@example.com"
              className="w-full border-b border-gray-300 pb-2 text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs text-gray-500 mb-3">性別</label>
            <div className="flex gap-2">
              {["男性", "女性", "回答しない"].map((g) => (
                <motion.button
                  key={g}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setGender(g)}
                  className={`flex-1 py-2.5 rounded-full text-sm font-medium border-2 transition-colors ${
                    gender === g
                      ? "bg-amber-400 text-white border-amber-400"
                      : "bg-white text-gray-600 border-gray-300"
                  }`}
                >
                  {g}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs text-gray-500 mb-2">
              生年月日
            </label>
            <div className="grid grid-cols-3 gap-2">
              <select
                defaultValue="1990年"
                className="border border-gray-300 rounded-lg px-2 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <select
                defaultValue="3月"
                className="border border-gray-300 rounded-lg px-2 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                {months.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <select
                defaultValue="15日"
                className="border border-gray-300 rounded-lg px-2 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                {days.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs text-gray-500 mb-1">
              郵便番号
            </label>
            <input
              type="text"
              defaultValue="150-0001"
              className="w-full border-b border-gray-300 pb-2 text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="mb-6">
            <label className="block text-xs text-gray-500 mb-1">住所</label>
            <input
              type="text"
              className="w-full border-b border-gray-300 pb-2 text-sm focus:outline-none focus:border-amber-400"
              placeholder=""
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-amber-400 hover:bg-amber-500 text-white font-bold py-3.5 rounded-full text-base transition-colors"
          >
            登録する
          </motion.button>

          <p className="text-center text-xs text-gray-400 mt-3">
            入力内容はお店にのみ共有されます
          </p>
        </section>

        <section className="mb-6">
          <AnimatePresence>
            {anniversaries.map((ann) => (
              <motion.div
                key={ann.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="border border-gray-200 rounded-xl p-4 mb-3 relative"
              >
                <button
                  onClick={() => removeAnniversary(ann.id)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
                {ann.label ? (
                  <>
                    <p className="text-xs text-gray-500 mb-1">{ann.label}</p>
                    <p className="text-base font-medium">
                      {ann.month.replace("月", "")}月
                      {ann.day.replace("日", "")}日
                    </p>
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      placeholder="記念日名"
                      className="text-xs text-gray-500 mb-2 w-full focus:outline-none border-b border-gray-200 pb-1"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <select className="border border-gray-300 rounded-lg px-2 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-400">
                        {months.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                      <select className="border border-gray-300 rounded-lg px-2 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-400">
                        {days.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={addAnniversary}
            className="w-full border-2 border-amber-400 text-amber-500 font-bold py-3 rounded-full text-sm flex items-center justify-center gap-1 hover:bg-amber-50 transition-colors"
          >
            <Plus className="w-4 h-4" />
            記念日を追加する
          </motion.button>
        </section>

        <section>
          <h2 className="text-sm font-bold text-gray-900 mb-3">
            店舗へのひとこと（任意）
          </h2>
          <textarea
            placeholder="例：いちごアレルギーがあります"
            rows={4}
            className="w-full border border-gray-300 rounded-xl p-3 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          />
        </section>
      </div>
    </div>
  );
}
