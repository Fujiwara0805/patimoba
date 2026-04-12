"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LineLoginScreen } from "@/components/auth/line-login-screen";

export default function CustomerLoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLineLogin = () => {
    setIsLoading(true);
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <LineLoginScreen
            redirectTo="/customer/takeout"
            onBack={() => setIsLoading(false)}
            backLabel="戻る"
          />
        </motion.div>
      ) : (
        <motion.div
          key="login"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen flex flex-col bg-white"
        >
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-300 px-4 sm:px-5 py-2.5 flex items-center"
          >
            <Link
              href="/"
              className="flex items-center gap-1 text-sm font-bold text-gray-800 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              戻る
            </Link>
          </motion.div>

          <div className="flex-1 flex flex-col items-center justify-center px-5 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-full max-w-sm flex flex-col items-center"
            >
              <Link href="/" className="flex items-center justify-center mb-8 sm:mb-10">
                <Image
                  src="/スクリーンショット_2026-04-09_14.49.59.png"
                  alt="パティモバ"
                  width={240}
                  height={68}
                  className="h-12 sm:h-14 w-auto"
                  priority
                />
              </Link>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="w-full text-center mb-8 sm:mb-10"
              >
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2">
                  ログイン
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  LINEアカウントでログインしてください
                </p>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35 }}
                whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(6, 199, 85, 0.3)" }}
                whileTap={{ scale: 0.97 }}
                onClick={handleLineLogin}
                className="w-full flex items-center justify-center gap-3 bg-[#06C755] hover:bg-[#05b34d] text-white font-bold text-sm sm:text-base py-3 sm:py-3.5 rounded-xl transition-colors duration-200 shadow-lg shadow-green-200/50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 sm:w-6 sm:h-6 fill-current"
                >
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.271.173-.508.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
                LINEでログイン
              </motion.button>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="mt-6 sm:mt-8 flex flex-col items-center gap-3 sm:gap-4"
              >
                <div className="flex items-center gap-3 w-full max-w-xs">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs text-gray-400">または</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                <Link
                  href="/login"
                  className="text-xs sm:text-sm text-gray-500 hover:text-amber-600 transition-colors"
                >
                  メールアドレスでログイン（店舗・管理者向け）
                </Link>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="mt-10 sm:mt-12 text-[10px] sm:text-xs text-gray-400 text-center leading-relaxed"
              >
                ログインすることで、
                <br />
                <span className="underline underline-offset-2">利用規約</span>
                および
                <span className="underline underline-offset-2">プライバシーポリシー</span>
                に同意したものとみなします
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
