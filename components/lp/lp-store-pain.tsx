"use client";

import { motion } from "framer-motion";
import { Phone, CalendarX, SunDim, Sparkles, ArrowRight } from "lucide-react";

const painPoints = [
  {
    icon: Phone,
    title: "電話対応が作業を止める",
    description:
      "仕込みや製造の最中に電話が鳴る。サイズ確認・アレルギー対応・メッセージの聞き取りで、1件あたり20〜40分。積み重なると、1日の製造時間が大きく削られる。",
  },
  {
    icon: CalendarX,
    title: "繁忙期の予約管理が混乱する",
    description:
      "クリスマス・バレンタイン・誕生日シーズンに、手書きメモや電話対応での管理が限界に。ダブルブッキングやミスへの不安がストレスになる。",
  },
  {
    icon: SunDim,
    title: "夕方以降の売上を取り逃している",
    description:
      "「売れ残ったらロスになる」という不安から、早い時間にショーケースを空にしてしまう。しかし仕事帰り・学校帰りのお客さんが来る夕方こそ、実はチャンスの時間帯。",
  },
];

const solutions = [
  {
    problem: "電話対応・接客対応が作業を止める",
    solution: "注文・オプション確認がオンライン完結。電話が鳴らなくなり、製造に集中できる",
  },
  {
    problem: "繁忙期の予約管理が混乱する",
    solution: "管理画面で全予約を一元管理。ダブルブッキング・記入ミスがなくなる",
  },
  {
    problem: "夕方以降の売上を取り逃している",
    solution: "ネット予約で販売数が読めるから、ロスを恐れず夕方まで商品を出せる",
  },
];

export function LpStorePain() {
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
            Pain Points
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            お店側の「もったいない」も
            <br />
            積み重なっていませんか
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {painPoints.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
                <p.icon className="w-7 h-7 text-red-400" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{p.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {p.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-8 sm:p-12"
        >
          <div className="text-center mb-8">
            <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
              パティモバがあれば、
              <br />
              その「もやもや」がなくなります。
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed max-w-xl mx-auto">
              洋菓子店のために設計されたシステムだから、ITが苦手でも現場の延長感覚で使えます。導入から運用まで、私たちが伴走します。
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            {solutions.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/80 rounded-xl p-4"
              >
                <p className="text-xs text-red-400 font-medium mb-2 line-through">
                  {s.problem}
                </p>
                <ArrowRight className="w-3 h-3 text-amber-400 mb-2" />
                <p className="text-sm text-gray-800 font-medium leading-snug">
                  {s.solution}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
