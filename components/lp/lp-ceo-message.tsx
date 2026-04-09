"use client";

import { motion } from "framer-motion";

export function LpCeoMessage() {
  return (
    <section className="py-20 sm:py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-shrink-0"
          >
            <img
              src="https://patisseriemobile.com/IMG_1775.JPG"
              alt="Crafted Glow株式会社 代表取締役 神田丈"
              className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl object-cover shadow-lg"
            />
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-400">代表取締役</p>
              <p className="font-bold text-gray-900">神田 丈</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-medium text-amber-600 tracking-widest uppercase mb-3">
              Message
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug mb-5">
              パティシエが「つくること」に
              <br />
              集中できる世界を。
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              私たちは、町の洋菓子店とパティシエの方々が大切にしているこだわりや想いを、きちんとお客さんに届けることを大事にしています。
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              パティモバは「販売の仕組みを整えることで、もっとケーキ作りに向き合える時間を作りたい」という思いから生まれました。町の洋菓子店の魅力を、近くのお客さまへ、そして全国へ。その土台づくりをお手伝いしています。
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
