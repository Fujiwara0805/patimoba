"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const painPoints = [
  {
    percent: 82,
    text: "「来店したのに欲しいケーキがなく、何も買わずに帰ったことがある」",
    detail:
      "特に夕方〜閉店前の時間帯に多い経験。ショーケースが空でがっかりした、という声が多数。",
  },
  {
    percent: 87,
    text: "「電話での予約・注文が面倒に感じたことがある」",
    detail:
      "営業時間内に電話をかけること自体へのハードルが高い。手が離せないときに折り返しが来ても対応しにくい、という声も多い。",
  },
  {
    percent: 71,
    text: "「その日に何のケーキがあるかわからないので行きづらい」",
    detail:
      "売り切れている可能性を考えると足が向かず、結果としてコンビニで済ませた、という経験を持つ人が7割以上。",
  },
];

const testimonials = [
  {
    quote:
      "仕事終わりに立ち寄ったら、もうショーケースがほぼ空で…。せっかく楽しみにしていたのに残念でした。売り切れてるか不安だし、わざわざ行って何もないのがつらくて、最近はコンビニで済ませることが増えてしまいました。",
    author: "30代・会社員・女性",
  },
  {
    quote:
      "誕生日ケーキの注文で電話したら、サイズや文字の確認だけで30分近くかかってしまいました。しかも受け取ったらメッセージプレートの名前が間違えていて…。大切な日だっただけにショックでした。",
    author: "40代・主婦・女性",
  },
];

export function LpCustomerVoice() {
  return (
    <section className="py-20 sm:py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <p className="text-xs font-medium text-amber-600 tracking-widest uppercase mb-2">
            Customer Survey
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            お客さんは、こんなことを求めています
          </h2>
          <p className="mt-3 text-gray-500 text-sm sm:text-base">
            洋菓子店を利用するお客さん300名へのアンケート調査より。
            <br className="hidden sm:block" />
            お客さんの「不便」を知ることが、選ばれるお店への第一歩です。
          </p>
          <p className="mt-1 text-xs text-gray-400">
            ※ 数値はパティモバが実施したユーザーアンケートに基づく参考値です
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-5 mt-12 mb-14">
          {painPoints.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <p className="text-4xl sm:text-5xl font-bold text-amber-500 mb-3">
                {p.percent}
                <span className="text-2xl">%</span>
              </p>
              <p className="text-sm font-bold text-gray-900 leading-snug mb-3">
                {p.text}
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                {p.detail}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm"
            >
              <Quote className="w-5 h-5 text-amber-300 mb-3" />
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                {t.quote}
              </p>
              <p className="text-xs text-gray-400 font-medium">{t.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
