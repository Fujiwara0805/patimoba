"use client";

import { motion } from "framer-motion";
import { Clock, TrendingUp } from "lucide-react";

const values = [
  {
    icon: Clock,
    title: "電話対応と接客対応、\n両方の時間を削減する",
    description:
      "来店以外の注文方法がほぼ電話しかないため、ホールケーキの注文では1件20〜40分かかることも。さらに来店後も、ショーケースで選んで詰めて会計するまでに時間がかかり、ショーケース前はすぐに行列になりがち。「後ろの人を待たせて申し訳ない」という声もよく聞かれます。パティモバは電話をネット注文に移し、接客をスムーズにする仕組みで、この2つを同時に解決します。",
  },
  {
    icon: TrendingUp,
    title: "夕方以降の売り逃しを\nなくして売上を上げる",
    description:
      "仕事終わり・学校終わりに来店するお客さんが多い夕方以降。「売れ残ったらロスになる」という不安からショーケースを早めに空にするのは当然の判断です。でもパティモバでネット予約が入れば、どれだけ出せるかが前もってわかる。ロスを恐れずに対応できるから、夕方以降の売り逃しが防げて、そのまま売上アップにつながります。",
  },
];

export function LpTwoValues() {
  return (
    <section id="features" className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs font-medium text-amber-600 tracking-widest uppercase mb-2">
            Why Pattimoba
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            パティモバが変える2つのこと
          </h2>
          <p className="mt-3 text-gray-500">
            業務効率化と売上アップ。どちらも同時に実現します。
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-amber-50/60 rounded-2xl p-8 sm:p-10"
            >
              <div className="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center mb-5">
                <v.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 whitespace-pre-line leading-snug mb-4">
                {v.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {v.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
