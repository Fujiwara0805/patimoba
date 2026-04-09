"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Cake, Smartphone } from "lucide-react";

export default function CustomerLoginPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        router.push("/customer/takeout");
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [progress, router]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="bg-[#FFEB3B] h-10" />

      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-10"
        >
          <div className="relative w-24 h-24 mb-4">
            <div className="w-full h-full border-3 border-amber-400 rounded-2xl flex items-center justify-center bg-white">
              <div className="relative">
                <Smartphone className="w-10 h-10 text-amber-400" />
                <Cake className="w-5 h-5 text-amber-400 absolute -top-3 -right-2" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-blue-600 tracking-wide">
            パティモバ
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-xs text-center"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            LINEログイン中...
          </h2>

          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mb-3">
            <motion.div
              className="h-full bg-amber-400 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          <p className="text-lg font-bold text-gray-900">{progress}%</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center pb-10 space-y-3"
      >
        <button className="text-sm text-blue-600 underline block mx-auto">
          利用規約を読む
        </button>
        <button className="text-sm text-blue-600 underline block mx-auto">
          プライバシーポリシーを読む
        </button>
        <button className="text-sm text-blue-600 underline block mx-auto">
          特定商取引法を読む
        </button>
      </motion.div>
    </div>
  );
}
