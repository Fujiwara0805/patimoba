"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  FileText,
  Shield,
  Key,
  Bell,
  Save,
} from "lucide-react";

const notificationSettings = [
  {
    id: "churn",
    label: "解約リスク通知",
    description: "解約リスク店舗が検出された時",
    defaultChecked: true,
  },
  {
    id: "newStore",
    label: "新規加盟通知",
    description: "新しい店舗が加盟した時",
    defaultChecked: true,
  },
  {
    id: "mrr",
    label: "MRR目標達成通知",
    description: "月次目標を達成した時",
    defaultChecked: true,
  },
  {
    id: "weekly",
    label: "週次レポート",
    description: "毎週月曜日に送信",
    defaultChecked: false,
  },
  {
    id: "monthly",
    label: "月次レポート",
    description: "毎月1日に送信",
    defaultChecked: true,
  },
];

export default function AdminAccountPage() {
  const [notifications, setNotifications] = useState<Record<string, boolean>>(
    Object.fromEntries(
      notificationSettings.map((n) => [n.id, n.defaultChecked])
    )
  );

  return (
    <>
      <header className="bg-[#FFF9C4] px-6 py-4 border-b border-yellow-200">
        <h1 className="text-lg font-bold text-gray-900">アカウント設定</h1>
        <p className="text-xs text-gray-600">プロフィールと設定の管理</p>
      </header>

      <div className="p-6 space-y-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <User className="w-5 h-5 text-gray-500" />
            <h2 className="font-bold">プロフィール情報</h2>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full border-2 border-amber-400 bg-amber-50 flex items-center justify-center">
              <User className="w-8 h-8 text-amber-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg">管理者アカウント</h3>
                <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                  管理者
                </span>
              </div>
              <p className="text-sm text-gray-500">Crafted Glow Inc.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">
                氏名
              </label>
              <input
                type="text"
                defaultValue="山田 太郎"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">
                メールアドレス
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  defaultValue="admin@craftedglow.jp"
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">
                電話番号
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  defaultValue="03-1234-5678"
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">
                部署
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  defaultValue="営業本部"
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-5 h-5 text-gray-500" />
              <h2 className="font-bold">セキュリティ設定</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">
                  現在のパスワード
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    defaultValue="password123"
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">
                  新しいパスワード
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    defaultValue="password123"
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">
                  新しいパスワード（確認）
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    defaultValue="password123"
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  />
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full bg-amber-400 hover:bg-amber-500 text-white font-bold py-2.5 rounded-lg text-sm transition-colors"
              >
                パスワードを変更
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <Bell className="w-5 h-5 text-gray-500" />
              <h2 className="font-bold">通知設定</h2>
            </div>

            <div className="space-y-4">
              {notificationSettings.map((setting) => (
                <label
                  key={setting.id}
                  className="flex items-start justify-between cursor-pointer group"
                >
                  <div>
                    <p className="text-sm font-bold">{setting.label}</p>
                    <p className="text-xs text-gray-500">
                      {setting.description}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications[setting.id]}
                    onChange={(e) =>
                      setNotifications((prev) => ({
                        ...prev,
                        [setting.id]: e.target.checked,
                      }))
                    }
                    className="w-5 h-5 accent-blue-600 rounded mt-0.5 cursor-pointer"
                  />
                </label>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="flex items-center justify-end gap-3 pb-4">
          <button className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
            キャンセル
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors"
          >
            <Save className="w-4 h-4" />
            変更を保存
          </motion.button>
        </div>
      </div>
    </>
  );
}
