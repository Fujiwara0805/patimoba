"use client";

import { motion } from "framer-motion";
import { MessageCircle, Settings, Rocket } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    number: "01",
    day: "Day 1〜3",
    title: "ご相談",
    description:
      "お店の現状・課題・ご要望を丁寧にお伺いします。お気軽にフォームからご連絡ください。",
  },
  {
    icon: Settings,
    number: "02",
    day: "Day 4〜12",
    title: "初期設定（全代行）",
    description:
      "商品登録・予約設定・決済連携など、すべてパティモバが設定します。オーナーの作業はほぼゼロ。",
  },
  {
    icon: Rocket,
    number: "03",
    day: "Day 14〜",
    title: "運用開始・伴走サポート",
    description:
      "受付開始後も継続的にフォロー。困ったことがあればすぐに相談できる体制を整えています。",
  },
];

export function LpTimeline() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs font-medium text-amber-600 tracking-widest uppercase mb-2">
            How to Start
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            最短2週間で受付開始できます
          </h2>
          <p className="mt-3 text-gray-500">
            ITが苦手でも大丈夫。設定はすべてパティモバが代行します。
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-amber-200 hidden sm:block" />

            <div className="space-y-10">
              {steps.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex items-start gap-5 relative"
                >
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-amber-400 flex items-center justify-center">
                      <s.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="pt-1.5">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="text-xs font-bold text-amber-500">
                        STEP {s.number}
                      </p>
                      <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                        {s.day}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1.5">
                      {s.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
