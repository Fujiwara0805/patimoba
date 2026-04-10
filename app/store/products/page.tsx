"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { useProducts } from "@/hooks/use-products";
import { useProductMutations } from "@/hooks/use-product-mutations";
import { useStoreContext } from "@/lib/store-context";
import type { ManagedProduct } from "@/lib/types";
import { ToggleSwitch } from "@/components/store/toggle-switch";
import { ProductDetailPanel } from "@/components/store/product-detail-panel";

type Tab = "takeout" | "ec";

export default function StoreProductsPage() {
  const { storeId } = useStoreContext();
  const { managedProducts, loading, refetch } = useProducts({ storeId });
  const { toggleAcceptOrders, toggleTodayAvailable } = useProductMutations();

  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<Tab>("takeout");
  const [selectedProduct, setSelectedProduct] = useState<ManagedProduct | null>(null);
  const [dailyOrderMax, setDailyOrderMax] = useState(30);
  const [perOrderMax, setPerOrderMax] = useState(10);
  const [showSettings, setShowSettings] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setShowSettings(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = managedProducts.filter((p) => {
    if (!search) return true;
    return p.name.includes(search);
  });

  const toggleAccept = async (id: string) => {
    const product = managedProducts.find((p) => p.id === id);
    if (!product) return;
    await toggleAcceptOrders(Number(id), !product.acceptOrders);
    refetch();
  };

  const toggleToday = async (id: string) => {
    const product = managedProducts.find((p) => p.id === id);
    if (!product) return;
    await toggleTodayAvailable(Number(id), !product.todayAvailable);
    refetch();
  };

  const handleProductSave = (updated: ManagedProduct) => {
    setSelectedProduct(updated);
    refetch();
  };

  const showDescription = tab === "ec";

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <p className="text-gray-500">読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1 overflow-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="商品名"
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-[240px]"
            />
            <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-5 py-2 rounded-lg transition-colors text-sm">
              検索
            </button>
          </div>

          <div className="flex items-center gap-3 text-sm" ref={settingsRef}>
            <span>1日の注文可能数 <b>{dailyOrderMax}個</b></span>
            <span>1回の注文可能数 <b>{perOrderMax}個</b></span>
            <div className="relative">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="border border-amber-500 text-amber-600 font-bold px-4 py-1.5 rounded-lg hover:bg-amber-50 transition-colors text-sm"
              >
                変更
              </button>
              <AnimatePresence>
                {showSettings && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl p-4 z-50 w-[240px]"
                  >
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-bold block mb-1">1日の注文可能数</label>
                        <select
                          value={dailyOrderMax}
                          onChange={(e) => setDailyOrderMax(Number(e.target.value))}
                          className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
                        >
                          {Array.from({ length: 80 }, (_, i) => i + 1).map((n) => (
                            <option key={n} value={n}>{n} 個</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-bold block mb-1">1回の注文可能数</label>
                        <select
                          value={perOrderMax}
                          onChange={(e) => setPerOrderMax(Number(e.target.value))}
                          className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
                        >
                          {Array.from({ length: 50 }, (_, i) => i + 1).map((n) => (
                            <option key={n} value={n}>{n} 個</option>
                          ))}
                        </select>
                      </div>
                      <button
                        onClick={() => setShowSettings(false)}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 rounded-lg transition-colors text-sm"
                      >
                        変更
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="flex mb-4 border-b border-gray-200">
          <button
            onClick={() => setTab("takeout")}
            className={`px-6 py-2 text-sm font-bold border border-b-0 rounded-t-lg transition-colors ${
              tab === "takeout"
                ? "bg-white text-gray-900 border-gray-200"
                : "bg-gray-50 text-gray-400 border-transparent hover:text-gray-600"
            }`}
          >
            ケーキ登録
          </button>
          <button
            onClick={() => setTab("ec")}
            className={`px-6 py-2 text-sm font-bold border border-b-0 rounded-t-lg transition-colors ${
              tab === "ec"
                ? "bg-white text-gray-900 border-gray-200"
                : "bg-gray-50 text-gray-400 border-transparent hover:text-gray-600"
            }`}
          >
            EC
          </button>
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div
            className={`grid ${
              showDescription
                ? "grid-cols-[1.2fr_70px_1.5fr_0.8fr_80px_80px_80px_70px]"
                : "grid-cols-[1.2fr_70px_0.8fr_80px_80px_80px_70px]"
            } bg-[#FFF176] px-4 py-2.5 text-xs font-bold text-gray-700`}
          >
            <span>商品名</span>
            <span>商品画像</span>
            {showDescription && <span>商品の説明</span>}
            <span>金額</span>
            <span className="text-center">受付状況</span>
            <span className="text-center">当日状況</span>
            <span className="text-center">1日の最大</span>
            <span className="text-center">準備日数</span>
          </div>

          {filtered.map((product, i) => {
            const isInactive = !product.acceptOrders;
            const isSelected = selectedProduct?.id === product.id;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.02 }}
                onClick={() => setSelectedProduct(product)}
                className={`grid ${
                  showDescription
                    ? "grid-cols-[1.2fr_70px_1.5fr_0.8fr_80px_80px_80px_70px]"
                    : "grid-cols-[1.2fr_70px_0.8fr_80px_80px_80px_70px]"
                } px-4 py-2.5 items-center border-t border-gray-100 cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-amber-50"
                    : isInactive
                    ? "bg-pink-50 hover:bg-pink-100"
                    : "hover:bg-gray-50"
                }`}
              >
                <span className="text-sm font-medium truncate pr-2">{product.name}</span>

                <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {showDescription && (
                  <span className="text-xs text-gray-500 line-clamp-2 pr-2">
                    {product.description}
                  </span>
                )}

                <span className="text-sm">{product.price}</span>

                <div className="flex justify-center">
                  <ToggleSwitch
                    enabled={product.acceptOrders}
                    onToggle={() => toggleAccept(product.id)}
                    colorOn="bg-green-500"
                  />
                </div>

                <div className="flex justify-center">
                  <ToggleSwitch
                    enabled={product.todayAvailable}
                    onToggle={() => toggleToday(product.id)}
                    colorOn="bg-red-500"
                  />
                </div>

                <span className="text-sm text-center">{product.dailyMax} 個</span>

                <span className="text-sm text-center">{product.prepDays}日</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ x: 280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 280, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ProductDetailPanel
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
              onSave={handleProductSave}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
