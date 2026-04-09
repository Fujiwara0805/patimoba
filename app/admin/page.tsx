"use client";

import { motion } from "framer-motion";
import {
  TriangleAlert as AlertTriangle,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Activity,
  LogIn,
  ChartBar as BarChart3,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const alerts = [
  {
    type: "danger",
    shop: "Patisserie Soleil",
    message: "14日間ログインなし - 解約リスク高",
  },
  {
    type: "warning",
    shop: "洋菓子店ラパン",
    message: "注文数が先月比50%減少",
  },
  {
    type: "info",
    shop: "Patisserie KANATA",
    message: "今月のMRR目標達成",
  },
];

const kpiData = [
  {
    label: "MRR",
    value: "¥2,847万",
    change: "+5.8%",
    trend: "up",
    icon: DollarSign,
  },
  {
    label: "アクティブ店舗数",
    value: "234",
    change: "+3",
    trend: "up",
    icon: Users,
  },
  {
    label: "月間注文数",
    value: "12,847",
    change: "+12.3%",
    trend: "up",
    icon: BarChart3,
  },
  {
    label: "解約率",
    value: "1.2%",
    change: "-0.3%",
    trend: "down",
    icon: Activity,
  },
];

const shopInsights = [
  { name: "パティスリー銀座", mrr: 150000, orders: 67, lastLogin: "2026/03/30", status: "active" },
  { name: "Patisserie KANATA", mrr: 150000, orders: 45, lastLogin: "2026/03/15", status: "active" },
  { name: "スイーツ工房ミル", mrr: 98000, orders: 38, lastLogin: "2026/03/29", status: "active" },
  { name: "ケーキハウス桜", mrr: 150000, orders: 52, lastLogin: "2026/03/28", status: "active" },
  { name: "洋菓子店ラパン", mrr: 98000, orders: 29, lastLogin: "2026/03/22", status: "warning" },
  { name: "Patisserie Soleil", mrr: 150000, orders: 12, lastLogin: "2026/03/15", status: "danger" },
  { name: "ドルチェ小町", mrr: 58000, orders: 21, lastLogin: "2026/03/30", status: "active" },
  { name: "スイーツアトリエ", mrr: 98000, orders: 42, lastLogin: "2026/03/29", status: "active" },
];

export default function AdminDashboardPage() {
  return (
    <>
      <header className="bg-[#FFF9C4] px-6 py-4 border-b border-yellow-200">
        <h1 className="text-lg font-bold text-gray-900">ダッシュボード</h1>
        <p className="text-xs text-gray-600">
          {new Date().toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "short",
          })}
        </p>
      </header>

      <div className="p-6 space-y-6">
        <section>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
            Alerts
          </h2>
          <div className="space-y-2">
            {alerts.map((alert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex items-start gap-3 p-4 rounded-xl border ${
                  alert.type === "danger"
                    ? "bg-red-50 border-red-200"
                    : alert.type === "warning"
                    ? "bg-amber-50 border-amber-200"
                    : "bg-green-50 border-green-200"
                }`}
              >
                <AlertTriangle
                  className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                    alert.type === "danger"
                      ? "text-red-500"
                      : alert.type === "warning"
                      ? "text-amber-500"
                      : "text-green-500"
                  }`}
                />
                <div>
                  <p className="font-bold text-sm">{alert.shop}</p>
                  <p className="text-sm text-gray-600">{alert.message}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
            KPI
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiData.map((kpi, i) => (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl border border-gray-200 p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <kpi.icon className="w-5 h-5 text-gray-400" />
                  <span
                    className={`flex items-center gap-1 text-xs font-bold ${
                      kpi.label === "解約率"
                        ? "text-green-600"
                        : kpi.trend === "up"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {kpi.trend === "up" ? (
                      <TrendingUp className="w-3.5 h-3.5" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5" />
                    )}
                    {kpi.change}
                  </span>
                </div>
                <p className="text-2xl font-bold">{kpi.value}</p>
                <p className="text-xs text-gray-500 mt-1">{kpi.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
            Shop Insights
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_80px] px-5 py-3 bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">
              <span>店舗名</span>
              <span>MRR</span>
              <span>月間注文数</span>
              <span>最終ログイン</span>
              <span className="text-center">Status</span>
            </div>
            {shopInsights.map((shop, i) => (
              <motion.div
                key={shop.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="grid grid-cols-[2fr_1fr_1fr_1fr_80px] px-5 py-3.5 items-center border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors"
              >
                <span className="text-sm font-medium">{shop.name}</span>
                <span className="text-sm">
                  &yen;{shop.mrr.toLocaleString()}
                </span>
                <div className="flex items-center gap-1 text-sm">
                  {shop.orders}件
                  {shop.status === "active" ? (
                    <ArrowUpRight className="w-3.5 h-3.5 text-green-500" />
                  ) : shop.status === "danger" ? (
                    <ArrowDownRight className="w-3.5 h-3.5 text-red-500" />
                  ) : (
                    <ArrowDownRight className="w-3.5 h-3.5 text-amber-500" />
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <LogIn className="w-3.5 h-3.5" />
                  {shop.lastLogin}
                </div>
                <div className="flex justify-center">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      shop.status === "active"
                        ? "bg-green-100 text-green-700"
                        : shop.status === "warning"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {shop.status === "active"
                      ? "Active"
                      : shop.status === "warning"
                      ? "Warning"
                      : "At Risk"}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
