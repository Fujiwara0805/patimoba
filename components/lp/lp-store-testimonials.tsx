"use client";

import { motion } from "framer-motion";
import { Quote, MapPin, Check } from "lucide-react";

const testimonials = [
  {
    quote:
      "電話対応が本当に減りました。以前はホールケーキの注文のたびに、サイズ・ろうそく・メッセージ・アレルギーの確認で20〜30分とられていたんですが、今はそれが全部フォームで完結するので、製造に集中できています。繁忙期のクリスマスシーズンも、管理画面を見れば一目で状況がわかるので、以前のように「今何件入ってるんだっけ？」という不安がなくなりました。",
    author: "神奈川県・洋菓子店オーナー",
    detail: "スタッフ3名",
    highlights: [
      "ホールケーキの電話対応がほぼゼロに",
      "クリスマス予約を管理画面だけで完結",
      "製造に集中できる時間が増えた",
    ],
  },
  {
    quote:
      "夕方以降のお客さんが「何もない…」という残念そうな顔をするのが辛かったんです。ネット予約が入るようになってから、どれだけ作ればいいかが読めるようになって、閉店近くまでショーケースに並べられるようになりました。操作もシンプルで、うちのスタッフでも覚えやすかったです。オプションの注文もネットで受け付けるようになってから件数が増えて、客単価が上がった実感があります。",
    author: "東京都・洋菓子店",
    detail: "スタッフ4名",
    highlights: [
      "夕方以降の売上が向上",
      "ホールケーキのオプション注文が増加、客単価アップ",
      "スタッフ全員がすぐに使いこなせた",
    ],
  },
];

export function LpStoreTestimonials() {
  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs font-medium text-amber-600 tracking-widest uppercase mb-2">
            Shop Voice
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            導入した店舗の声
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-amber-50/50 rounded-2xl p-6 sm:p-8 border border-amber-100"
            >
              <Quote className="w-6 h-6 text-amber-300 mb-4" />
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                <MapPin className="w-3.5 h-3.5" />
                <span className="font-medium">{t.author}</span>
                <span>({t.detail})</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed mb-5">
                {t.quote}
              </p>
              <div className="border-t border-amber-100 pt-4 space-y-2">
                {t.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 text-amber-600" />
                    </div>
                    <span className="text-xs font-medium text-gray-700">{h}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
