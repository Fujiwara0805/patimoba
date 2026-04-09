"use client";

import { useState } from "react";
import { X } from "lucide-react";

const shippingMethods = ["常温便", "冷蔵便", "冷凍便"];
const storageMethods = ["常温保存", "冷蔵保存", "冷凍保存"];
const expiryOptions = [
  "1日", "2日", "3日", "5日", "7日", "10日", "14日", "30日", "60日", "90日",
];

const ecProducts = ["登録済み商品リスト(EC)", "焼き菓子セット", "ショコラ", "クッキーの詰め合わせ"];

export function EcTab() {
  const [selectedProduct, setSelectedProduct] = useState(ecProducts[0]);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [shippingMethod, setShippingMethod] = useState("");
  const [storageMethod, setStorageMethod] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [expiry, setExpiry] = useState("");
  const [volume, setVolume] = useState("");
  const [price, setPrice] = useState("");

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-lg font-bold">商品登録画面</h2>
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-[240px]"
        >
          {ecProducts.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div className="bg-[#FFF9C4] rounded-xl p-6 max-w-[640px] space-y-4">
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="商品名"
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
        />

        <div className="flex gap-3">
          <div className="w-[150px] h-[150px] rounded-lg bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-xs text-gray-400 text-center px-2 shrink-0">
            メイン画像をアップロード
          </div>
          <div className="relative">
            <div className="w-[150px] h-[150px] rounded-lg bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-xs text-gray-400 text-center px-2">
              断面の画像をアップロード
            </div>
            <button className="absolute -top-2 -right-2 bg-white rounded-full shadow p-0.5">
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <div className="relative">
            <div className="w-[150px] h-[150px] rounded-lg bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-xs text-gray-400 text-center px-2">
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

        <select
          value={shippingMethod}
          onChange={(e) => setShippingMethod(e.target.value)}
          className="w-[340px] border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white"
        >
          <option value="" disabled>発送方法を選択</option>
          {shippingMethods.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <select
          value={storageMethod}
          onChange={(e) => setStorageMethod(e.target.value)}
          className="w-[340px] border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white"
        >
          <option value="" disabled>保存方法を選択</option>
          {storageMethods.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="原材料を選択"
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
        />

        <div className="flex items-center gap-2">
          <select
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            className="w-[160px] border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white"
          >
            <option value="" disabled>賞味期限を選択</option>
            {expiryOptions.map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
          <span className="text-sm">発送日からの日数</span>
        </div>

        <textarea
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          placeholder={"内容量を入力\n例) マドレーヌ:3個\n　　フィナンシェ、ドーナツ、チョコパイ:各1個"}
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm resize-none"
        />

        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="金額"
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
        />

        <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-lg text-sm transition-colors">
          商品を登録する
        </button>
      </div>
    </div>
  );
}
