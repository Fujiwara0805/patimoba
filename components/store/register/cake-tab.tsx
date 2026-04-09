"use client";

import { useState } from "react";
import { X } from "lucide-react";

const categories = ["生菓子", "ホール", "焼き菓子", "ドリンク", "期間限定", "その他"];

const existingProducts = [
  "ショートケーキ",
  "チーズケーキ",
  "抹茶ケーキ",
  "チョコレートケーキ",
  "ロールケーキ",
  "カスタードプリン",
  "マドレーヌ",
  "マフィン",
];

type OrderType =
  | "always"
  | "sameDay"
  | "manual"
  | "reserveOnly"
  | "todayOnly";

export function CakeTab() {
  const [selectedProduct, setSelectedProduct] = useState("ショートケーキ");
  const [category, setCategory] = useState("生菓子");
  const [productName, setProductName] = useState("ショートケーキ");
  const [description, setDescription] = useState(
    "ふわふわのスポンジに、ほどよい甘さの生クリームと新鮮ないちごを重ねた、王道のショートケーキ。素材の良さを引き立てた、毎日でも食べたくなるやさしい味わいです。"
  );
  const [price, setPrice] = useState("¥700");
  const [orderType, setOrderType] = useState<OrderType>("always");
  const [reserveDays, setReserveDays] = useState("10");
  const [isLimited, setIsLimited] = useState(false);
  const [mainImage, setMainImage] = useState(
    "https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=300"
  );

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-lg font-bold">商品登録画面</h2>
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-[200px]"
        >
          {existingProducts.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div className="bg-[#FFF9C4] rounded-xl p-6 max-w-[640px] space-y-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-[340px] border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="商品名"
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
        />

        <div className="flex gap-3">
          <div className="w-[160px] h-[160px] rounded-lg overflow-hidden bg-gray-100 border border-gray-300 shrink-0">
            {mainImage ? (
              <img src={mainImage} alt="メイン画像" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-gray-400 text-center px-2">
                メイン画像をアップロード
              </div>
            )}
          </div>
          <div className="relative">
            <div className="w-[160px] h-[160px] rounded-lg bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-xs text-gray-400 text-center px-2">
              断面の画像をアップロード
            </div>
            <button className="absolute -top-2 -right-2 bg-white rounded-full shadow p-0.5">
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="商品説明"
          rows={4}
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm resize-none"
        />

        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="金額"
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
        />

        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {([
            { value: "always" as const, label: "常に注文を受け付ける" },
            { value: "sameDay" as const, label: "当日注文を受け付ける" },
            { value: "manual" as const, label: "注文を手動で受け付ける" },
            { value: "reserveOnly" as const, label: "予約のみ受け付ける" },
            { value: "todayOnly" as const, label: "本日限定受付" },
          ]).map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="radio"
                name="orderType"
                checked={orderType === opt.value}
                onChange={() => setOrderType(opt.value)}
                className="accent-blue-600 w-4 h-4"
              />
              {opt.label}
            </label>
          ))}
        </div>

        {orderType === "reserveOnly" && (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={reserveDays}
              onChange={(e) => setReserveDays(e.target.value)}
              className="w-[100px] border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
            <span className="text-sm">日前</span>
          </div>
        )}

        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={isLimited}
            onChange={(e) => setIsLimited(e.target.checked)}
            className="w-4 h-4"
          />
          期間限定
        </label>

        <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-lg text-sm transition-colors">
          商品を登録する
        </button>
      </div>
    </div>
  );
}
