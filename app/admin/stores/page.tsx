"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, SlidersHorizontal, Mail, Phone, MoveVertical as MoreVertical, ArrowUpRight, ArrowDownRight, MapPin, Plus } from "lucide-react";

interface StoreItem {
  id: string;
  name: string;
  owner: string;
  location: string;
  mrr: number;
  orders: number;
  orderTrend: "up" | "down" | "flat";
  status: "active" | "risk";
  plan: "ベーシック" | "スタンダード" | "プレミアム";
  joinDate: string;
  lastLogin: string;
}

const stores: StoreItem[] = [
  {
    id: "1",
    name: "パティスリー花",
    owner: "山田太郎",
    location: "東京都渋谷区",
    mrr: 150000,
    orders: 45,
    orderTrend: "down",
    status: "risk",
    plan: "プレミアム",
    joinDate: "2024/04/15",
    lastLogin: "2026/03/15",
  },
  {
    id: "2",
    name: "スイーツ工房ミル",
    owner: "佐藤花子",
    location: "大阪府大阪市",
    mrr: 98000,
    orders: 38,
    orderTrend: "up",
    status: "active",
    plan: "スタンダード",
    joinDate: "2024/06/22",
    lastLogin: "2026/03/29",
  },
  {
    id: "3",
    name: "ケーキハウス桜",
    owner: "鈴木一郎",
    location: "神奈川県横浜市",
    mrr: 150000,
    orders: 52,
    orderTrend: "up",
    status: "active",
    plan: "プレミアム",
    joinDate: "2023/11/10",
    lastLogin: "2026/03/28",
  },
  {
    id: "4",
    name: "洋菓子店ラパン",
    owner: "田中美咲",
    location: "愛知県名古屋市",
    mrr: 98000,
    orders: 29,
    orderTrend: "down",
    status: "risk",
    plan: "スタンダード",
    joinDate: "2025/01/18",
    lastLogin: "2026/03/22",
  },
  {
    id: "5",
    name: "ドルチェ小町",
    owner: "伊藤健太",
    location: "福岡県福岡市",
    mrr: 58000,
    orders: 21,
    orderTrend: "flat",
    status: "active",
    plan: "ベーシック",
    joinDate: "2025/03/05",
    lastLogin: "2026/03/30",
  },
  {
    id: "6",
    name: "パティスリー銀座",
    owner: "高橋次郎",
    location: "東京都中央区",
    mrr: 150000,
    orders: 67,
    orderTrend: "up",
    status: "active",
    plan: "プレミアム",
    joinDate: "2023/08/12",
    lastLogin: "2026/03/30",
  },
  {
    id: "7",
    name: "スイーツアトリエ",
    owner: "渡辺愛子",
    location: "京都府京都市",
    mrr: 98000,
    orders: 42,
    orderTrend: "up",
    status: "active",
    plan: "スタンダード",
    joinDate: "2024/02/28",
    lastLogin: "2026/03/29",
  },
  {
    id: "8",
    name: "カフェ&ケーキ モモ",
    owner: "中村雄介",
    location: "北海道札幌市",
    mrr: 58000,
    orders: 18,
    orderTrend: "flat",
    status: "active",
    plan: "ベーシック",
    joinDate: "2025/07/14",
    lastLogin: "2026/03/27",
  },
];

const summaryCards = [
  { label: "総店舗数", value: "247店舗", color: "text-gray-900" },
  { label: "稼働中", value: "234店舗", color: "text-green-600" },
  { label: "リスク", value: "5店舗", color: "text-red-600" },
  { label: "非稼働", value: "8店舗", color: "text-gray-900" },
];

function PlanBadge({ plan }: { plan: string }) {
  const colors =
    plan === "プレミアム"
      ? "bg-amber-100 text-amber-700 border-amber-200"
      : plan === "スタンダード"
      ? "bg-yellow-100 text-yellow-700 border-yellow-200"
      : "bg-gray-100 text-gray-600 border-gray-200";
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${colors}`}>
      {plan}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
        status === "active"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {status === "active" ? "稼働中" : "リスク"}
    </span>
  );
}

export default function AdminStoresPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = stores.filter(
    (s) =>
      s.name.includes(searchQuery) ||
      s.owner.includes(searchQuery) ||
      s.location.includes(searchQuery)
  );

  return (
    <>
      <header className="bg-[#FFF9C4] px-6 py-4 border-b border-yellow-200 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900">店舗一覧</h1>
          <p className="text-xs text-gray-600">全247店舗</p>
        </div>
        <Link href="/admin/stores/new">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            店舗を追加
          </motion.button>
        </Link>
      </header>

      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="店舗名、オーナー名、所在地で検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-1.5 border border-gray-300 rounded-lg px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors">
            <SlidersHorizontal className="w-4 h-4" />
            フィルター
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {summaryCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl border border-gray-200 p-4"
            >
              <p className="text-xs text-gray-500">{card.label}</p>
              <p className={`text-xl font-bold mt-1 ${card.color}`}>
                {card.value}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((store, i) => (
            <motion.div
              key={store.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-base">{store.name}</h3>
                    <StatusBadge status={store.status} />
                    <PlanBadge plan={store.plan} />
                  </div>

                  <div className="grid grid-cols-[1.5fr_1.5fr_1fr_1fr] gap-4 items-start">
                    <div>
                      <p className="text-xs text-gray-500">オーナー</p>
                      <p className="text-sm">{store.owner}</p>
                    </div>
                    <div className="flex items-start gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">所在地</p>
                        <p className="text-sm">{store.location}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">MRR</p>
                      <p className="text-sm font-bold">
                        &yen;{store.mrr.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">今月の注文</p>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-bold">{store.orders}件</span>
                        {store.orderTrend === "up" ? (
                          <ArrowUpRight className="w-3.5 h-3.5 text-green-500" />
                        ) : store.orderTrend === "down" ? (
                          <ArrowDownRight className="w-3.5 h-3.5 text-red-500" />
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                    <span>加盟日: {store.joinDate}</span>
                    <span>最終ログイン: {store.lastLogin}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 ml-4">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Mail className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Phone className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
