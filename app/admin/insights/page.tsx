"use client";

import { motion } from "framer-motion";
import { Clock, Mail, Plus, Target } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
  Area,
} from "recharts";

const topMetrics = [
  {
    icon: Clock,
    label: "時間外注文率",
    badge: "営業強み",
    badgeColor: "bg-green-100 text-green-700",
    value: "38%",
    valueColor: "text-green-600",
    description: "全店舗平均で38%が営業時間外注文",
    point: "夜間・早朝の注文機会を逃さない強み",
  },
  {
    icon: Mail,
    label: "LINE配信72h転換",
    badge: "即効性",
    badgeColor: "bg-blue-100 text-blue-700",
    value: "24件",
    valueColor: "text-blue-600",
    description: "配信後72時間以内に平均24件",
    point: "キャンペーン効果が即座に売上直結",
  },
  {
    icon: Plus,
    label: "オプション追加率",
    badge: "単価UP",
    badgeColor: "bg-amber-100 text-amber-700",
    value: "+23%",
    valueColor: "text-amber-600",
    description: "客単価が平均23%UP",
    point: "カスタマイズで収益を底上げ",
  },
];

const orderByTime = [
  { time: "6-9時", orders: 120 },
  { time: "9-12時", orders: 240 },
  { time: "12-15時", orders: 360 },
  { time: "15-18時", orders: 200 },
  { time: "18-21時", orders: 120 },
  { time: "21-6時", orders: 80 },
];

const lineDeliveryData = [
  { day: "配信当日", orders: 100, rate: 14 },
  { day: "1日後", orders: 140, rate: 12 },
  { day: "2日後", orders: 100, rate: 8 },
  { day: "3日後", orders: 80, rate: 6 },
  { day: "4日後", orders: 40, rate: 4 },
];

const optionRates = [
  { name: "デコレーション", rate: 45, avgPrice: "+¥2,800" },
  { name: "サイズアップ", rate: 38, avgPrice: "+¥1,500" },
  { name: "メッセージ", rate: 67, avgPrice: "+¥500" },
  { name: "ギフト包装", rate: 52, avgPrice: "+¥800" },
  { name: "配達指定", rate: 29, avgPrice: "+¥300" },
];

const radarData = [
  { subject: "顧客満足度", value: 92 },
  { subject: "リピート率", value: 78 },
  { subject: "注文頻度", value: 85 },
  { subject: "単価向上", value: 73 },
  { subject: "機能活用", value: 68 },
  { subject: "問い合わせ", value: 81 },
];

const radarScores = [
  { label: "顧客満足度", value: 92, color: "text-gray-900" },
  { label: "リピート率", value: 78, color: "text-amber-600" },
  { label: "注文頻度", value: 85, color: "text-gray-900" },
  { label: "単価向上", value: 73, color: "text-amber-600" },
  { label: "機能活用", value: 68, color: "text-gray-900" },
  { label: "問い合わせ", value: 81, color: "text-amber-600" },
];

const successCases = [
  {
    name: "パティスリー銀座様",
    result: "LINE配信を週2回実施し、月間注文数が+45%増加",
    note: "導入8ヶ月目で成果",
  },
  {
    name: "スイーツアトリエ様",
    result: "オプション提案強化で客単価+28%向上",
    note: "デコレーションが好評",
  },
  {
    name: "ケーキハウス桜様",
    result: "24時間受付で時間外注文月52件獲得",
    note: "機会損失を削減",
  },
];

export default function AdminInsightsPage() {
  return (
    <>
      <header className="bg-[#FFF9C4] px-6 py-4 border-b border-yellow-200">
        <h1 className="text-lg font-bold text-gray-900">営業インサイト</h1>
        <p className="text-xs text-gray-600">営業トーク用データ集</p>
      </header>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-3 gap-4">
          {topMetrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-xl border border-gray-200 p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <metric.icon className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium">{metric.label}</span>
                </div>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${metric.badgeColor}`}
                >
                  {metric.badge}
                </span>
              </div>
              <p className={`text-3xl font-bold ${metric.valueColor}`}>
                {metric.value}
              </p>
              <p className="text-xs text-gray-500 mt-2">{metric.description}</p>
              <p className="text-xs text-gray-400 mt-1">
                ・{metric.point}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-gray-500" />
            <h2 className="font-bold text-sm">時間帯別注文分布</h2>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={orderByTime}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="time" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="orders" fill="#F59E0B" radius={[4, 4, 0, 0]} name="注文件数" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-600">
              <span className="font-bold">営業トークポイント：</span>
              営業時間外（6-9時、18時以降）でも17%の注文があり、24時間体制の予約受付が機会損失を防ぎます。
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Mail className="w-4 h-4 text-gray-500" />
            <h2 className="font-bold text-sm">LINE配信後の注文推移</h2>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={lineDeliveryData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="orders"
                fill="#FEF3C7"
                stroke="#F59E0B"
                strokeWidth={2}
                name="注文件数"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="rate"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ fill: "#10B981", r: 4 }}
                name="転換率 (%)"
              />
            </ComposedChart>
          </ResponsiveContainer>
          <div className="mt-4 bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-600">
              <span className="font-bold">営業トークポイント：</span>
              LINE配信後1-2日で注文がピークに達し、3日間で効果の大半を獲得。定期的な配信で安定的な集客が可能です。
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4 text-gray-500" />
              <h2 className="font-bold text-sm">オプション別追加率</h2>
            </div>
            <div className="space-y-4">
              {optionRates.map((opt) => (
                <div key={opt.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{opt.name}</span>
                    <span className="text-sm font-bold">{opt.rate}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${opt.rate}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full bg-amber-400 rounded-full"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    平均単価増加: {opt.avgPrice}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-amber-50 rounded-lg p-3">
              <p className="text-xs text-gray-600">
                <span className="font-bold">営業トークポイント：</span>
                メッセージは67%が追加する人気オプション。デコレーションは単価を大きく押し上げます。
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4 text-gray-500" />
              <h2 className="font-bold text-sm">営業効果スコア</h2>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Radar
                  dataKey="value"
                  stroke="#F59E0B"
                  fill="#FEF3C7"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 mt-2">
              {radarScores.map((score) => (
                <div
                  key={score.label}
                  className="flex items-center justify-between text-xs"
                >
                  <span className="text-gray-600">{score.label}</span>
                  <span className={`font-bold ${score.color}`}>
                    {score.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <h2 className="font-bold text-base mb-3">活用成功事例</h2>
          <div className="grid grid-cols-3 gap-4">
            {successCases.map((c) => (
              <div
                key={c.name}
                className="bg-white rounded-xl border border-gray-200 p-5"
              >
                <h3 className="font-bold text-sm mb-2">{c.name}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {c.result}
                </p>
                <p className="text-xs text-gray-400 mt-2">{c.note}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}
