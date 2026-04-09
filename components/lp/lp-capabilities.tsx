"use client";

import { motion } from "framer-motion";
import { ClipboardList, CreditCard, Bell } from "lucide-react";

const features = [
  {
    icon: ClipboardList,
    number: "01",
    title: "テイクアウトからイベント予約まで\n全部まとめて管理",
    description:
      "テイクアウト受付・ホールケーキ予約・焼き菓子EC・クリスマス/バレンタインなどのイベント受付まで、ひとつの管理画面で完結。複数のツールをバラバラに使う必要がありません。",
    tags: ["テイクアウト受付", "ホールケーキ予約", "イベント予約", "焼き菓子EC"],
    image: "https://patisseriemobile.com/v46_166.png",
    imageAlt: "パティモバ 予約・注文管理画面",
    reverse: false,
  },
  {
    icon: CreditCard,
    number: "02",
    title: "注文〜決済まで事前に完結\n無断キャンセルをゼロに",
    description:
      "注文と同時にオンライン決済が完了するため、「作ったのに来なかった」という無駄がなくなります。店頭でのやり取りも最小限になり、混雑が緩和されます。",
    tags: ["事前決済", "無断キャンセル防止", "混雑緩和", "各種カード対応"],
    image: "https://patisseriemobile.com/v46_167.png",
    imageAlt: "パティモバ 注文・決済完了画面",
    reverse: true,
  },
  {
    icon: Bell,
    number: "03",
    title: "記念日リマインドなど\n販売促進を自動で",
    description:
      "以前ホールケーキを注文してくれたお客様に、誕生日や記念日が近づいたタイミングで自動的に通知を送れます。「今年もいかがですか？」という一言が、リピート購入につながります。手間なく継続できる販促の仕組みが、売上の底上げを支えます。",
    tags: ["記念日リマインド", "自動通知", "リピーター獲得", "販促自動化"],
    image: "https://patisseriemobile.com/LINE%E8%A8%98%E5%BF%B5%E6%97%A5.png",
    imageAlt: "パティモバ 記念日リマインド・販促通知画面",
    reverse: false,
  },
];

export function LpCapabilities() {
  return (
    <section id="capabilities" className="py-20 sm:py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-medium text-amber-600 tracking-widest uppercase mb-2">
            Features
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            パティモバでできること
          </h2>
          <p className="mt-3 text-gray-500">
            洋菓子店の「売り方」に必要なことを、ひとつにまとめました。
          </p>
        </motion.div>

        <div className="space-y-20">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`flex flex-col gap-8 items-center ${
                f.reverse ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              <div className="flex-1 w-full">
                <p className="text-xs font-bold text-amber-500 mb-2">
                  {f.number}
                </p>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 whitespace-pre-line leading-snug mb-4">
                  {f.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {f.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {f.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-amber-700 bg-amber-100 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-1 w-full">
                <img
                  src={f.image}
                  alt={f.imageAlt}
                  className="w-full rounded-2xl shadow-lg"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
