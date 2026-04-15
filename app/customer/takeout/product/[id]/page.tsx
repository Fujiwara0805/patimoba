"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { CustomerHeader } from "@/components/customer/customer-header";
import { StepProgress } from "@/components/customer/step-progress";
import { CartDrawer } from "@/components/customer/cart-drawer";
import { useProductRegistration } from "@/hooks/use-product-registrations";
import { useCustomerContext } from "@/lib/customer-context";
import { useCart } from "@/lib/cart-context";

const steps = ["店舗選択", "商品選択", "受取日時", "注文確認"];

function formatLimitDate(dateStr: string | null): string | null {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}月${d.getDate()}日`;
}

export default function TakeoutProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { selectedStoreId, profile } = useCustomerContext();
  const { product, loading } = useProductRegistration(params.id as string);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showQuantityDropdown, setShowQuantityDropdown] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [optionSelections, setOptionSelections] = useState<Record<number, string[]>>({});
  const [optionTexts, setOptionTexts] = useState<Record<number, string>>({});

  const handleStepClick = (step: number) => {
    if (step === 1) router.push("/customer/takeout");
    if (step === 2 && selectedStoreId) router.push(`/customer/takeout/products?store=${selectedStoreId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <CustomerHeader
          userName={profile?.lineName}
          avatarUrl={profile?.avatar || undefined}
          points={0}
          onCartClick={() => setCartOpen(true)}
        />
        <StepProgress currentStep={2} steps={steps} onStepClick={handleStepClick} />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-amber-400 animate-spin" />
        </div>
      </div>
    );
  }

  if (!product) return null;

  const isLimited = false;
  const limitDateStr: string | null = null;
  const maxQty = 10;

  const customOptions = product.custom_options || [];

  const missingRequired = customOptions.some((opt, i) => {
    if (!opt.required) return false;
    if (opt.type === "text") return !(optionTexts[i] || "").trim();
    return !(optionSelections[i] && optionSelections[i].length > 0);
  });

  const optionsAdditional = customOptions.reduce((sum, opt, i) => {
    if (opt.type === "text") return sum;
    const selectedLabels = optionSelections[i] || [];
    return (
      sum +
      opt.values
        .filter((v) => selectedLabels.includes(v.label))
        .reduce((s, v) => s + (v.additional_price || 0), 0)
    );
  }, 0);

  const handleAddToCart = () => {
    if (missingRequired) {
      alert("必須のオプションを選択してください");
      return;
    }
    const cartCustomOptions = customOptions
      .map((opt, i) => {
        if (opt.type === "text") {
          const v = (optionTexts[i] || "").trim();
          return v
            ? { name: opt.name, values: [v], additionalPrice: 0 }
            : null;
        }
        const selectedLabels = optionSelections[i] || [];
        if (selectedLabels.length === 0) return null;
        const additionalPrice = opt.values
          .filter((v) => selectedLabels.includes(v.label))
          .reduce((s, v) => s + (v.additional_price || 0), 0);
        return { name: opt.name, values: selectedLabels, additionalPrice };
      })
      .filter((v): v is { name: string; values: string[]; additionalPrice: number } => v != null);

    const res = addItem({
      productId: product.id,
      name: product.name,
      price: product.base_price,
      image: product.image || "",
      quantity,
      storeId: product.store_id,
      isTakeout: true,
      customization: cartCustomOptions.length > 0 ? { customOptions: cartCustomOptions } : undefined,
    });
    if (!res.ok) {
      alert(res.error || "カートに追加できませんでした");
      return;
    }

    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setCartOpen(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <CustomerHeader
        userName={profile?.lineName}
        avatarUrl={profile?.avatar || undefined}
        points={0}
        onCartClick={() => setCartOpen(true)}
      />

      <StepProgress currentStep={2} steps={steps} onStepClick={handleStepClick} />

      <div className="px-5 pb-10 flex-1 max-w-lg mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-square shadow-[0_8px_30px_rgba(0,0,0,0.08)] ring-1 ring-black/5 mb-6"
        >
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              No Image
            </div>
          )}
          {isLimited && (
            <span className="absolute top-3 left-3 bg-[#A855B7] text-white text-[11px] font-bold tracking-wide px-3.5 py-1.5 rounded-md shadow-sm">
              期間限定
            </span>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-0"
        >
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight leading-snug">
            {product.name}
          </h1>

          {isLimited && limitDateStr && (
            <p className="text-sm mt-3 leading-relaxed">
              <span className="text-red-500 font-bold">{limitDateStr}</span>
              <span className="text-gray-800">までの日付から予約日を選択できます</span>
            </p>
          )}

          {product.description && (
            <p className="text-gray-600 text-sm mt-5 whitespace-pre-line leading-[1.75]">
              {product.description}
            </p>
          )}

          {customOptions.length > 0 && (
            <div className="mt-6 space-y-5">
              {customOptions.map((opt, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-gray-900">{opt.name}</h3>
                    {opt.required && (
                      <span className="text-[10px] font-bold text-white bg-red-500 px-1.5 py-0.5 rounded">
                        必須
                      </span>
                    )}
                    {!opt.required && (
                      <span className="text-[10px] font-medium text-gray-500">任意</span>
                    )}
                  </div>

                  {opt.type === "text" && (
                    <textarea
                      value={optionTexts[i] || ""}
                      onChange={(e) =>
                        setOptionTexts((prev) => ({ ...prev, [i]: e.target.value }))
                      }
                      rows={2}
                      placeholder="メッセージを入力"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400"
                    />
                  )}

                  {opt.type === "single" && (
                    <div className="space-y-1.5">
                      {opt.values.map((v) => {
                        const active = (optionSelections[i] || [])[0] === v.label;
                        return (
                          <button
                            key={v.label}
                            type="button"
                            onClick={() =>
                              setOptionSelections((prev) => ({ ...prev, [i]: [v.label] }))
                            }
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border text-sm transition-colors ${
                              active
                                ? "border-amber-400 bg-amber-50 text-gray-900"
                                : "border-gray-200 bg-white text-gray-700 hover:border-amber-300"
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <span
                                className={`w-4 h-4 rounded-full border-2 ${
                                  active ? "border-amber-500 bg-amber-500" : "border-gray-300"
                                }`}
                              />
                              {v.label}
                            </span>
                            {v.additional_price > 0 && (
                              <span className="text-xs text-gray-600">
                                +¥{v.additional_price.toLocaleString()}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {opt.type === "multiple" && (
                    <div className="space-y-1.5">
                      {opt.values.map((v) => {
                        const active = (optionSelections[i] || []).includes(v.label);
                        return (
                          <button
                            key={v.label}
                            type="button"
                            onClick={() =>
                              setOptionSelections((prev) => {
                                const cur = prev[i] || [];
                                return {
                                  ...prev,
                                  [i]: active ? cur.filter((x) => x !== v.label) : [...cur, v.label],
                                };
                              })
                            }
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border text-sm transition-colors ${
                              active
                                ? "border-amber-400 bg-amber-50 text-gray-900"
                                : "border-gray-200 bg-white text-gray-700 hover:border-amber-300"
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <span
                                className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                                  active ? "border-amber-500 bg-amber-500 text-white" : "border-gray-300"
                                }`}
                              >
                                {active && <span className="text-[10px] leading-none">✓</span>}
                              </span>
                              {v.label}
                            </span>
                            {v.additional_price > 0 && (
                              <span className="text-xs text-gray-600">
                                +¥{v.additional_price.toLocaleString()}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="flex items-end justify-between gap-4 mt-8">
            <p className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-gray-900 tabular-nums">
                {(product.base_price + optionsAdditional).toLocaleString()}
              </span>
              <span className="text-xl font-bold text-gray-900">円</span>
            </p>

            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setShowQuantityDropdown(!showQuantityDropdown)}
                className="rounded-lg px-4 py-2.5 min-w-[4.5rem] flex items-center justify-center gap-2 bg-[#FFF9C4] border border-amber-200/80 shadow-sm"
              >
                <span className="font-bold text-lg text-gray-900 tabular-nums">{quantity}</span>
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform ${showQuantityDropdown ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {showQuantityDropdown && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-40"
                      onClick={() => setShowQuantityDropdown(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-full right-0 mb-2 bg-white border border-gray-100 rounded-xl shadow-xl z-50 py-1.5 min-w-[5.5rem] max-h-52 overflow-y-auto"
                    >
                      {Array.from({ length: maxQty }, (_, i) => i + 1).map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => {
                            setQuantity(num);
                            setShowQuantityDropdown(false);
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm hover:bg-[#FFFDE7] transition-colors flex items-center gap-2"
                        >
                          {quantity === num && (
                            <span className="text-amber-600 font-bold">&#10003;</span>
                          )}
                          <span className="font-medium text-gray-900">{num}</span>
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          <motion.div
            className="mt-20 pt-8 pb-6 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="w-[72%] max-w-xs bg-amber-400 hover:bg-amber-500 text-white font-bold py-3.5 rounded-full text-base shadow-md shadow-amber-200/60 transition-colors"
            >
              カートに追加
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center pointer-events-none bg-black/25"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 8 }}
              transition={{ type: "spring", damping: 24, stiffness: 320 }}
              className="bg-white rounded-2xl shadow-2xl px-12 py-10 mx-6"
            >
              <p className="text-lg font-bold text-gray-900 text-center whitespace-nowrap">
                カートに追加されました
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
