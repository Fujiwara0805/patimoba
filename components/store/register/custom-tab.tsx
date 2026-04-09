"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "lucide-react";

type SubTab = "基本" | "ろうそく" | "オプション";

interface ListItem {
  id: string;
  name: string;
  price: number;
  allowMultiple?: boolean;
}

const initialCandles: ListItem[] = [
  { id: "c1", name: "ナンバーキャンドル", price: 150 },
  { id: "c2", name: "ノーマルキャンドル(大)", price: 0 },
  { id: "c3", name: "ノーマルキャンドル(小)", price: 0 },
];

const initialOptions: ListItem[] = [
  { id: "o1", name: "おまかせフルーツアップ(1)", price: 1000 },
  { id: "o2", name: "おまかせフルーツアップ(2)", price: 2000 },
  { id: "o3", name: "プレート追加(ホワイトチョコ)", price: 150, allowMultiple: true },
  { id: "o4", name: "プレート追加(ダークチョコ)", price: 200, allowMultiple: true },
  { id: "o5", name: "ギフトラッピング", price: 100 },
];

const messagePlateTypes = ["ホワイトチョコ", "ダークチョコ", "クッキー"];

export function CustomTab() {
  const [subTab, setSubTab] = useState<SubTab>("基本");
  const [candles, setCandles] = useState(initialCandles);
  const [options, setOptions] = useState(initialOptions);

  const [holeCakeOrderDays, setHoleCakeOrderDays] = useState("1");
  const [holeCakeMaxDaily, setHoleCakeMaxDaily] = useState("10");
  const [printDecoEnabled, setPrintDecoEnabled] = useState(true);
  const [printDecoOrderDays, setPrintDecoOrderDays] = useState("7");
  const [printDecoMaxDaily, setPrintDecoMaxDaily] = useState("10");
  const [printDecoPrice, setPrintDecoPrice] = useState("¥1,500");
  const [selectedPlates, setSelectedPlates] = useState<Set<string>>(
    new Set(["ホワイトチョコ"])
  );

  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");

  const currentItems = subTab === "ろうそく" ? candles : options;
  const setCurrentItems = subTab === "ろうそく" ? setCandles : setOptions;

  const handleRemove = (id: string) => {
    setCurrentItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAdd = () => {
    if (!newName) return;
    const newItem: ListItem = {
      id: Date.now().toString(),
      name: newName,
      price: parseInt(newPrice) || 0,
    };
    setCurrentItems((prev) => [...prev, newItem]);
    setNewName("");
    setNewPrice("");
  };

  const togglePlate = (plate: string) => {
    setSelectedPlates((prev) => {
      const next = new Set(prev);
      if (next.has(plate)) next.delete(plate);
      else next.add(plate);
      return next;
    });
  };

  const numberOptions = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div>
      <h2 className="text-lg font-bold mb-6">商品登録画面</h2>

      <div className="flex gap-6">
        <div className="flex-1">
          <div className="bg-[#FFF9C4] rounded-xl p-4">
            <div className="flex border-b border-amber-300 mb-4">
              {(["基本", "ろうそく", "オプション"] as SubTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSubTab(tab)}
                  className={`px-5 py-2 text-sm font-bold transition-colors ${
                    subTab === tab
                      ? "text-gray-900 border-b-2 border-gray-900"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {subTab === "基本" && (
              <div className="space-y-6">
                <div className="flex gap-12">
                  <div className="flex-1 space-y-4">
                    <h3 className="text-base font-bold text-amber-700">
                      〈ホールケーキ〉
                    </h3>
                    <div>
                      <label className="text-sm font-medium block mb-1">
                        ホールケーキの受付日
                      </label>
                      <div className="flex items-center gap-2">
                        <select
                          value={holeCakeOrderDays}
                          onChange={(e) => setHoleCakeOrderDays(e.target.value)}
                          className="w-[120px] border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
                        >
                          {numberOptions.map((n) => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                        <span className="text-sm">日前</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">
                        ホールケーキの1日の最大個数
                      </label>
                      <div className="flex items-center gap-2">
                        <select
                          value={holeCakeMaxDaily}
                          onChange={(e) => setHoleCakeMaxDaily(e.target.value)}
                          className="w-[120px] border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
                        >
                          {numberOptions.map((n) => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                        <span className="text-sm">個まで</span>
                      </div>
                    </div>
                    <button className="bg-amber-400 hover:bg-amber-500 text-white font-bold px-6 py-2 rounded-lg text-sm transition-colors">
                      保存
                    </button>
                  </div>

                  <div className="flex-1 space-y-4">
                    <h3 className="text-base font-bold text-amber-700">
                      〈プリントデコレーション〉
                    </h3>
                    <div>
                      <label className="text-sm font-medium block mb-1">
                        プリントデコレーション
                      </label>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                          <input
                            type="radio"
                            checked={printDecoEnabled}
                            onChange={() => setPrintDecoEnabled(true)}
                            className="accent-blue-600 w-4 h-4"
                          />
                          できる
                        </label>
                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                          <input
                            type="radio"
                            checked={!printDecoEnabled}
                            onChange={() => setPrintDecoEnabled(false)}
                            className="accent-blue-600 w-4 h-4"
                          />
                          できない
                        </label>
                      </div>
                    </div>
                    {printDecoEnabled && (
                      <>
                        <div>
                          <label className="text-sm font-medium block mb-1">
                            プリントデコの受付日
                          </label>
                          <div className="flex items-center gap-2">
                            <select
                              value={printDecoOrderDays}
                              onChange={(e) => setPrintDecoOrderDays(e.target.value)}
                              className="w-[120px] border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
                            >
                              {numberOptions.map((n) => (
                                <option key={n} value={n}>{n}</option>
                              ))}
                            </select>
                            <span className="text-sm">日前</span>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium block mb-1">
                            プリントデコの1日の最大注文数
                          </label>
                          <div className="flex items-center gap-2">
                            <select
                              value={printDecoMaxDaily}
                              onChange={(e) => setPrintDecoMaxDaily(e.target.value)}
                              className="w-[120px] border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
                            >
                              {numberOptions.map((n) => (
                                <option key={n} value={n}>{n}</option>
                              ))}
                            </select>
                            <span className="text-sm">個まで</span>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium block mb-1">
                            プリントデコレーションの金額
                          </label>
                          <input
                            type="text"
                            value={printDecoPrice}
                            onChange={(e) => setPrintDecoPrice(e.target.value)}
                            className="w-[160px] border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
                          />
                        </div>
                      </>
                    )}
                    <button className="bg-amber-400 hover:bg-amber-500 text-white font-bold px-6 py-2 rounded-lg text-sm transition-colors">
                      保存
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base font-bold text-amber-700">
                    〈メッセージプレートの種類〉
                  </h3>
                  {messagePlateTypes.map((plate) => (
                    <label key={plate} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedPlates.has(plate)}
                        onChange={() => togglePlate(plate)}
                        className="w-4 h-4 accent-blue-600"
                      />
                      {plate}
                    </label>
                  ))}
                  <button className="bg-amber-400 hover:bg-amber-500 text-white font-bold px-6 py-2 rounded-lg text-sm transition-colors">
                    保存
                  </button>
                </div>
              </div>
            )}

            {(subTab === "ろうそく" || subTab === "オプション") && (
              <div className="space-y-3">
                <AnimatePresence>
                  {currentItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-3"
                    >
                      <input
                        type="text"
                        value={item.name}
                        readOnly
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
                      />
                      <input
                        type="text"
                        value={`¥${item.price.toLocaleString()}`}
                        readOnly
                        className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
                      />
                      {subTab === "オプション" && (
                        <label className="flex items-center gap-1 text-xs cursor-pointer whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={item.allowMultiple || false}
                            readOnly
                            className="w-3.5 h-3.5"
                          />
                          複数
                        </label>
                      )}
                      <button className="bg-amber-400 hover:bg-amber-500 text-white font-bold px-4 py-2 rounded-lg text-sm transition-colors">
                        保存
                      </button>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-gray-500 hover:text-gray-700 p-1"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <div className="flex items-center gap-3 pt-2 border-t border-amber-200">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="名前"
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                  <input
                    type="text"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="¥0"
                    className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                  <button
                    onClick={handleAdd}
                    className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {(subTab === "ろうそく" || subTab === "オプション") && (
          <div className="w-72">
            <div className="flex flex-wrap gap-2">
              {currentItems.map((item) => (
                <motion.span
                  key={item.id}
                  layout
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                >
                  {item.name}
                </motion.span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
