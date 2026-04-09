"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { ManagedProduct } from "@/lib/product-management-data";
import { cakeCategories } from "@/lib/product-management-data";

interface ProductDetailPanelProps {
  product: ManagedProduct;
  onClose: () => void;
  onSave: (updated: ManagedProduct) => void;
}

export function ProductDetailPanel({ product, onClose, onSave }: ProductDetailPanelProps) {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [prepDays, setPrepDays] = useState(product.prepDays.toString());
  const [maxPerOrder, setMaxPerOrder] = useState(product.maxPerOrder.toString());
  const [dailyMax, setDailyMax] = useState(product.dailyMax.toString());
  const [category, setCategory] = useState(product.category);

  useEffect(() => {
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setPrepDays(product.prepDays.toString());
    setMaxPerOrder(product.maxPerOrder.toString());
    setDailyMax(product.dailyMax.toString());
    setCategory(product.category);
  }, [product]);

  const handleSave = () => {
    onSave({
      ...product,
      name,
      description,
      price,
      prepDays: parseInt(prepDays) || 0,
      maxPerOrder: parseInt(maxPerOrder) || 10,
      dailyMax: parseInt(dailyMax) || 30,
      category,
    });
  };

  return (
    <div className="w-[280px] bg-white border-l border-gray-200 p-5 overflow-y-auto shrink-0">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold">商品情報</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-bold block mb-1">商品名</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="text-sm font-bold block mb-1">商品の画像</label>
          <div className="flex items-center gap-2">
            <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <button className="border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-1">
              画像
              <br />追加
            </button>
            <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        <div>
          <label className="text-sm font-bold block mb-1">商品の説明</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none"
          />
        </div>

        <div>
          <label className="text-sm font-bold block mb-1">商品の金額</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="text-sm font-bold block mb-1">予約締切日数</label>
          <input
            type="text"
            value={prepDays}
            onChange={(e) => setPrepDays(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="text-sm font-bold block mb-1">1回の最大注文数</label>
          <input
            type="text"
            value={maxPerOrder}
            onChange={(e) => setMaxPerOrder(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="text-sm font-bold block mb-1">1日の最大注文数</label>
          <input
            type="text"
            value={dailyMax}
            onChange={(e) => setDailyMax(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="text-sm font-bold block mb-1">ケーキのタイプ</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            {cakeCategories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2.5 rounded-lg transition-colors text-sm"
        >
          変更
        </button>
      </div>
    </div>
  );
}
