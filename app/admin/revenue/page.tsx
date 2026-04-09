"use client";

import { motion } from "framer-motion";
import { DollarSign, TrendingUp, Calendar } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const kpis = [
  {
    label: "今月のMRR",
    value: "¥2,847万",
    sub: "+5.8%",
    subColor: "text-green-600",
    icon: DollarSign,
  },
  {
    label: "年間ARR予測",
    value: "¥3.42億",
    sub: "現在の成長率で試算",
    subColor: "text-gray-500",
    icon: null,
  },
  {
    label: "平均客単価",
    value: "¥115,263",
    sub: "店舗あたり/月",
    subColor: "text-gray-500",
    icon: null,
  },
  {
    label: "顧客生涯価値",
    value: "¥2,150万",
    sub: "推定LTV",
    subColor: "text-gray-500",
    icon: null,
  },
];

const monthlyRevenue = [
  { month: "9月", newStores: 320, existingStores: 1930 },
  { month: "10月", newStores: 380, existingStores: 1920 },
  { month: "11月", newStores: 420, existingStores: 1980 },
  { month: "12月", newStores: 350, existingStores: 2000 },
  { month: "1月", newStores: 300, existingStores: 2050 },
  { month: "2月", newStores: 340, existingStores: 2100 },
  { month: "3月", newStores: 380, existingStores: 2120 },
];

const planBreakdown = [
  { name: "ベーシック", value: 30, amount: 840, stores: 145, color: "#F59E0B" },
  { name: "スタンダード", value: 41, amount: 1176, stores: 78, color: "#FDE68A" },
  { name: "プレミアム", value: 29, amount: 831, stores: 24, color: "#D97706" },
];

const regionData = [
  { region: "東京", stores: 68, revenue: 895 },
  { region: "大阪", stores: 42, revenue: 512 },
  { region: "神奈川", stores: 35, revenue: 428 },
  { region: "愛知", stores: 29, revenue: 367 },
  { region: "福岡", stores: 24, revenue: 298 },
  { region: "その他", stores: 49, revenue: 347 },
];

const momGrowth = [
  { month: "9月", rate: 0 },
  { month: "10月", rate: 2.1 },
  { month: "11月", rate: 2.9 },
  { month: "12月", rate: 1.5 },
  { month: "1月", rate: 0.8 },
  { month: "2月", rate: 0.7 },
  { month: "3月", rate: 1.1 },
];

export default function AdminRevenuePage() {
  const maxRegionRevenue = Math.max(...regionData.map((r) => r.revenue));

  return (
    <>
      <header className="bg-[#FFF9C4] px-6 py-4 border-b border-yellow-200 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900">収益分析</h1>
          <p className="text-xs text-gray-600">2026年3月期</p>
        </div>
        <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-1.5 bg-white">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-sm">2026年3月</span>
        </div>
      </header>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-4 gap-4">
          {kpis.map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl border border-gray-200 p-5"
            >
              <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                {kpi.icon && <kpi.icon className="w-3.5 h-3.5" />}
                {kpi.label}
              </div>
              <p className="text-2xl font-bold">{kpi.value}</p>
              <p className={`text-xs mt-1 flex items-center gap-1 ${kpi.subColor}`}>
                {kpi.subColor === "text-green-600" && (
                  <TrendingUp className="w-3 h-3" />
                )}
                {kpi.sub}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <h2 className="font-bold text-sm mb-4">月次収益推移（万円）</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend
                wrapperStyle={{ fontSize: 12 }}
                formatter={(value) =>
                  value === "newStores" ? "新規店舗" : "既存店舗"
                }
              />
              <Bar
                dataKey="existingStores"
                stackId="a"
                fill="#FDE68A"
                name="existingStores"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="newStores"
                stackId="a"
                fill="#F59E0B"
                name="newStores"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <div className="grid grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <h2 className="font-bold text-sm mb-4">プラン別収益内訳</h2>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={planBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    dataKey="value"
                    label={({ name, value }) => `${name} ${value}%`}
                    labelLine={false}
                  >
                    {planBreakdown.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {planBreakdown.map((plan) => (
                <div
                  key={plan.name}
                  className="flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: plan.color }}
                    />
                    <span className="font-medium">{plan.name}</span>
                  </div>
                  <span className="text-gray-500">
                    &yen;{plan.amount}万 ({plan.stores}店舗)
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <h2 className="font-bold text-sm mb-4">地域別収益ランキング</h2>
            <div className="space-y-3">
              {regionData.map((region) => (
                <div key={region.region}>
                  <div className="flex items-center gap-3">
                    <span className="text-xs w-10 text-right text-gray-600">
                      {region.region}
                    </span>
                    <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(region.revenue / maxRegionRevenue) * 100}%`,
                        }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-amber-400 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-1">
              {regionData.map((region, i) => (
                <div
                  key={region.region}
                  className="flex items-center justify-between text-xs text-gray-600"
                >
                  <span>
                    #{i + 1} {region.region}
                  </span>
                  <span>
                    {region.stores}店舗 / &yen;{region.revenue}万
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <h2 className="font-bold text-sm mb-4">月次成長率（MoM）</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={momGrowth}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="#F59E0B"
                strokeWidth={2}
                dot={{ fill: "#F59E0B", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </>
  );
}
