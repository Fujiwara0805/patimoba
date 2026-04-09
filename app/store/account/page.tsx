"use client";

import { motion } from "framer-motion";
import { Store, Mail, Phone, MapPin, Globe } from "lucide-react";

export default function StoreAccountPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6">アカウント設定</h1>

      <div className="max-w-xl space-y-6">
        <div className="bg-amber-50 rounded-xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-amber-400 rounded-xl flex items-center justify-center">
              <Store className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Patisserie KANATA</h2>
              <p className="text-sm text-gray-500">プレミアムプラン</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-gray-700">店舗情報</h3>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <Store className="w-4 h-4" />
              店舗名
            </label>
            <input
              type="text"
              defaultValue="Patisserie KANATA"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <Mail className="w-4 h-4" />
              メールアドレス
            </label>
            <input
              type="email"
              defaultValue="info@patisserie-kanata.com"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <Phone className="w-4 h-4" />
              電話番号
            </label>
            <input
              type="tel"
              defaultValue="03-1234-5678"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <MapPin className="w-4 h-4" />
              住所
            </label>
            <input
              type="text"
              defaultValue="東京都渋谷区神宮前3-1-1"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <Globe className="w-4 h-4" />
              LINE公式アカウントID
            </label>
            <input
              type="text"
              defaultValue="@patisserie-kanata"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-amber-400 hover:bg-amber-500 text-white font-bold px-8 py-2.5 rounded-lg text-sm transition-colors"
          >
            保存する
          </motion.button>
        </div>
      </div>
    </div>
  );
}
