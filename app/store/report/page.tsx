"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Timer,
  CalendarDays,
  RefreshCw,
  Download,
  TrendingUp,
  TrendingDown,
  Award,
  User,
  MessageCircle,
  Eye,
  MousePointer,
  ShoppingCart,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const dailySalesData = [
  { day: "1日", value: 78000 },
  { day: "4日", value: 92000 },
  { day: "7日", value: 65000 },
  { day: "10日", value: 110000 },
  { day: "13日", value: 85000 },
  { day: "16日", value: 98000 },
  { day: "19日", value: 72000 },
  { day: "22日", value: 115000 },
  { day: "25日", value: 88000 },
  { day: "28日", value: 105000 },
];

const weekdayOrderData = [
  { day: "月", value: 65 },
  { day: "火", value: 72 },
  { day: "水", value: 48 },
  { day: "木", value: 82 },
  { day: "金", value: 95 },
  { day: "土", value: 88 },
  { day: "日", value: 55 },
];

const topProducts = [
  { rank: 1, name: "ショートケーキ（ホール）", orders: 87, revenue: 452100 },
  { rank: 2, name: "チョコレートムース", orders: 72, revenue: 324000 },
  { rank: 3, name: "フルーツタルト", orders: 65, revenue: 292500 },
  { rank: 4, name: "モンブラン", orders: 58, revenue: 261000 },
  { rank: 5, name: "ティラミス", orders: 51, revenue: 229500 },
];

const topCustomers = [
  { name: "田中 花子", visits: 12, lastVisit: "2025/03/28", total: 148500 },
  { name: "佐藤 太郎", visits: 8, lastVisit: "2025/03/27", total: 96200 },
  { name: "鈴木 美咲", visits: 7, lastVisit: "2025/03/26", total: 82400 },
  { name: "高橋 健", visits: 6, lastVisit: "2025/03/25", total: 71300 },
  { name: "伊藤 愛", visits: 5, lastVisit: "2025/03/24", total: 64800 },
];

const lineMessages = [
  {
    title: "春のケーキフェア開催中🌸",
    date: "2025/03/20",
    delivery: 1245,
    opened: 876,
    clicks: 234,
    orders: 67,
  },
  {
    title: "ホワイトデー限定商品のご案内",
    date: "2025/03/15",
    delivery: 1245,
    opened: 945,
    clicks: 312,
    orders: 89,
  },
  {
    title: "新商品「桜モンブラン」登場",
    date: "2025/03/08",
    delivery: 1245,
    opened: 823,
    clicks: 198,
    orders: 54,
  },
];

const rankColors = ["text-amber-500", "text-gray-400", "text-amber-700"];

export default function StoreReportPage() {
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(3);

  const prevMonth = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  };

  const nextMonth = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  };

  return (
    <div className="p-6 max-w-[1100px]">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">月次レポート</h1>
        <p className="text-sm text-gray-500">プレミアムプラン店舗向け</p>
      </div>

      <div className="flex items-center justify-between mb-8 bg-white border border-gray-200 rounded-xl px-5 py-3">
        <div className="flex items-center gap-3">
          <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-500" />
          </button>
          <span className="text-lg font-bold min-w-[140px] text-center">
            {year}年{month}月
          </span>
          <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          <Download className="w-4 h-4" />
          PDFダウンロード
        </button>
      </div>

      <Section title="今月パティモバがあなたに貢献したこと">
        <div className="grid grid-cols-4 gap-4">
          <ContributionCard
            icon={<Clock className="w-5 h-5 text-gray-500" />}
            value="127件"
            label="営業時間外に届いた注文"
            sub="あなたが寝ている間に注文が入りました"
          />
          <ContributionCard
            icon={<Timer className="w-5 h-5 text-gray-500" />}
            value="約340分"
            label="削減できた対応時間"
            sub="電話対応や予約管理の時間を削減"
          />
          <ContributionCard
            icon={<CalendarDays className="w-5 h-5 text-gray-500" />}
            value="89件"
            label="オプション追加注文"
            sub="ホールケーキのカスタマイズなど"
          />
          <ContributionCard
            icon={<RefreshCw className="w-5 h-5 text-gray-500" />}
            value="218件"
            label="リピーターからの注文"
            sub="全体の51%がリピーター"
          />
        </div>
      </Section>

      <Section title="今月の実績">
        <div className="grid grid-cols-4 gap-4">
          <MetricCard label="総注文件数" value="425件" change={12.5} />
          <MetricCard label="総売上金額" value="&yen;2,347,800" change={8.3} />
          <MetricCard label="平均客単価" value="&yen;5,524" change={-2.1} />
          <MetricCard label="新規顧客数" value="87名" change={15.8} />
        </div>
      </Section>

      <Section title="売上分析">
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-xl p-5">
            <h4 className="font-bold text-sm mb-4">日別売上</h4>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={dailySalesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis
                  tick={{ fontSize: 11 }}
                  tickFormatter={(v) => `&yen;${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(value: number) => [`&yen;${value.toLocaleString()}`, "売上"]}
                />
                <Bar dataKey="value" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="border border-gray-200 rounded-xl p-5">
            <h4 className="font-bold text-sm mb-4">曜日別注文数</h4>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={weekdayOrderData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(value: number) => [`${value}件`, "注文数"]}
                />
                <Bar dataKey="value" fill="#FBBF24" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Section>

      <Section title="詳細分析">
        <div className="grid grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-xl p-5">
            <h4 className="font-bold text-sm mb-4">商品ランキング TOP5</h4>
            <div className="space-y-4">
              {topProducts.map((p) => (
                <div key={p.rank} className="flex items-center gap-3">
                  <span
                    className={`text-sm font-bold w-5 text-center ${
                      p.rank <= 3 ? rankColors[p.rank - 1] : "text-gray-400"
                    }`}
                  >
                    {p.rank <= 3 ? (
                      <Award className="w-5 h-5 inline" />
                    ) : (
                      p.rank
                    )}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{p.name}</p>
                    <p className="text-xs text-gray-400">{p.orders}件の注文</p>
                  </div>
                  <span className="text-sm font-bold whitespace-nowrap">
                    &yen;{p.revenue.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-5">
            <h4 className="font-bold text-sm mb-4">優良顧客リスト</h4>
            <div className="space-y-4">
              {topCustomers.map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{c.name}</p>
                    <p className="text-xs text-gray-400">
                      {c.visits}回購入・最終: {c.lastVisit}
                    </p>
                  </div>
                  <span className="text-sm font-bold whitespace-nowrap">
                    &yen;{c.total.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-5">
            <h4 className="font-bold text-sm mb-4">LINE配信効果</h4>
            <div className="space-y-5">
              {lineMessages.map((m, i) => (
                <div key={i}>
                  <p className="text-sm font-medium mb-0.5">{m.title}</p>
                  <p className="text-xs text-gray-400 mb-2">{m.date}</p>
                  <div className="grid grid-cols-4 gap-1 text-center">
                    <LineMetric icon={<MessageCircle className="w-3.5 h-3.5" />} label="配信" value={m.delivery} />
                    <LineMetric icon={<Eye className="w-3.5 h-3.5" />} label="開封" value={m.opened} />
                    <LineMetric icon={<MousePointer className="w-3.5 h-3.5" />} label="クリック" value={m.clicks} />
                    <LineMetric icon={<ShoppingCart className="w-3.5 h-3.5" />} label="注文" value={m.orders} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <h3 className="font-bold text-base mb-3">{title}</h3>
      {children}
    </motion.div>
  );
}

function ContributionCard({
  icon,
  value,
  label,
  sub,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  sub: string;
}) {
  return (
    <div className="border border-gray-200 rounded-xl p-4">
      <div className="mb-2">{icon}</div>
      <p className="text-2xl font-bold mb-1">{value}</p>
      <p className="text-sm text-gray-700 mb-0.5">{label}</p>
      <p className="text-xs text-gray-400">{sub}</p>
    </div>
  );
}

function MetricCard({
  label,
  value,
  change,
}: {
  label: string;
  value: string;
  change: number;
}) {
  const isPositive = change >= 0;
  return (
    <div className="border border-gray-200 rounded-xl p-4">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-2xl font-bold mb-1" dangerouslySetInnerHTML={{ __html: value }} />
      <div className={`flex items-center gap-1 text-xs font-medium ${isPositive ? "text-green-600" : "text-red-500"}`}>
        {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
        {isPositive ? "+" : ""}
        {change}% <span className="text-gray-400 font-normal">前月比</span>
      </div>
    </div>
  );
}

function LineMetric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div>
      <div className="flex justify-center text-gray-400 mb-0.5">{icon}</div>
      <p className="text-[10px] text-gray-400">{label}</p>
      <p className="text-xs font-bold">{value.toLocaleString()}</p>
    </div>
  );
}
