"use client";

import { motion } from "framer-motion";

export function LpHero() {
  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden bg-gradient-to-b from-amber-50/60 to-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-100 rounded-full opacity-30 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-100 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
          >
            ケーキを作る時間が、
            <br />
            <span className="text-amber-500">もっと増える。</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-gray-600 leading-relaxed"
          >
            洋菓子店の「売れない理由」と「時間のなさ」を、同時に解決します。
            <br className="hidden sm:block" />
            電話注文・来店接客・夕方の売り逃し。その仕組みをまるごと変えるのがパティモバです。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-6 flex items-center justify-center gap-3"
          >
            <span className="text-sm text-gray-500">初期費用</span>
            <span className="text-sm text-gray-500">月額</span>
            <span className="text-2xl sm:text-3xl font-bold text-amber-500">&yen;0</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#contact"
              className="bg-amber-400 hover:bg-amber-500 text-white font-bold px-8 py-3.5 rounded-full text-base transition-all shadow-lg shadow-amber-200/50 hover:shadow-xl hover:shadow-amber-200/60"
            >
              無料で相談してみる
            </a>
            <a
              href="#capabilities"
              className="text-amber-600 hover:text-amber-700 font-medium text-sm underline underline-offset-4"
            >
              できることを見る
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-14 max-w-4xl mx-auto"
        >
          <img
            src="https://patisseriemobile.com/Group_53.png"
            alt="パティモバ アプリ画面"
            className="w-full rounded-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
