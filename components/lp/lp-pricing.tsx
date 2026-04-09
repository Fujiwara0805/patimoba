"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

export function LpPricing() {
  return (
    <section id="pricing" className="py-20 sm:py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs font-medium text-amber-600 tracking-widest uppercase mb-2">
            Pricing
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            初期費用も月額費用も、ゼロです。
          </h2>
          <p className="mt-3 text-gray-500 text-sm sm:text-base">
            注文が入ったときだけ手数料が発生する成果報酬型。
            <br className="hidden sm:block" />
            固定費がかからないから、小さなお店でも安心して始められます。
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl border border-gray-200 p-6 text-center"
          >
            <p className="text-sm text-gray-500 mb-1">初期費用</p>
            <p className="text-4xl font-bold text-gray-900">&yen;0</p>
            <p className="text-xs text-gray-400 mt-1">導入にかかる費用はゼロ</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-gray-200 p-6 text-center"
          >
            <p className="text-sm text-gray-500 mb-1">月額費用</p>
            <p className="text-4xl font-bold text-gray-900">&yen;0</p>
            <p className="text-xs text-gray-400 mt-1">毎月の固定費もゼロ</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto"
        >
          <div className="bg-white rounded-3xl border-2 border-amber-400 p-8 sm:p-10 shadow-lg shadow-amber-100/50">
            <h3 className="text-lg font-bold text-gray-900 text-center mb-4">
              売上が上がったときだけ、
              <br />
              一緒に成長する仕組み
            </h3>
            <p className="text-sm text-gray-600 text-center leading-relaxed mb-6">
              注文が入ったときにだけ手数料が発生します。売れた分だけコストが生まれるので、リスクなく始められます。初期設定はすべてパティモバが代行するため、ITが苦手でも安心です。
            </p>

            <div className="bg-amber-50 rounded-xl p-5 mb-6 text-center">
              <p className="text-4xl sm:text-5xl font-bold text-amber-500">
                3〜5%
              </p>
              <p className="text-sm text-gray-600 mt-1">
                注文手数料（売上連動）
              </p>
              <p className="text-xs text-gray-400 mt-1">
                ※別途、各決済会社への手数料がかかります
              </p>
            </div>

            <div className="border-t border-gray-100 pt-6 space-y-3">
              {[
                "注文が入ったときだけ手数料が発生",
                "売れた分だけコストが生まれるのでリスクなし",
                "初期設定はすべてパティモバが代行",
                "ITが苦手でも安心",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-amber-600" />
                  </div>
                  <p className="text-sm text-gray-700">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <a
                href="#contact"
                className="inline-block bg-amber-400 hover:bg-amber-500 text-white font-bold px-8 py-3.5 rounded-full text-base transition-all shadow-md"
              >
                まずは無料で相談してみる
              </a>
            </div>

            <p className="text-xs text-gray-400 text-center mt-4">
              最短2週間で受付開始 ・ 初期設定はすべてパティモバが代行
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
