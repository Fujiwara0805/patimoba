"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Cake,
  Smartphone,
  Store,
  ShieldCheck,
  Users,
  Eye,
  EyeOff,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";

type Role = "store" | "admin" | "customer" | null;

const roles = [
  {
    id: "store" as const,
    label: "店舗ログイン",
    description: "店舗管理画面にアクセス",
    icon: Store,
    color: "bg-amber-50 border-amber-200 hover:border-amber-400 hover:bg-amber-100/60",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    redirect: "/store/dashboard",
  },
  {
    id: "admin" as const,
    label: "管理者ログイン",
    description: "社内管理画面にアクセス",
    icon: ShieldCheck,
    color: "bg-sky-50 border-sky-200 hover:border-sky-400 hover:bg-sky-100/60",
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
    redirect: "/admin",
  },
  {
    id: "customer" as const,
    label: "顧客ログイン",
    description: "テイクアウト・EC注文",
    icon: Users,
    color: "bg-emerald-50 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-100/60",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    redirect: "/customer/takeout",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const currentRole = roles.find((r) => r.id === selectedRole);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentRole) {
      router.push(currentRole.redirect);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/60 to-white flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Link
          href="/"
          className="flex items-center justify-center gap-2.5 mb-10"
        >
          <div className="relative w-10 h-10">
            <div className="w-full h-full border-2 border-amber-400 rounded-xl flex items-center justify-center bg-white">
              <Smartphone className="w-5 h-5 text-amber-400" />
              <Cake className="w-3 h-3 text-amber-400 absolute -top-1 -right-1" />
            </div>
          </div>
          <span className="font-bold text-xl text-gray-900">パティモバ</span>
        </Link>

        <AnimatePresence mode="wait">
          {!selectedRole ? (
            <motion.div
              key="role-select"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-lg shadow-gray-200/60 p-6"
            >
              <h2 className="text-lg font-bold text-center text-gray-900 mb-2">
                ログイン
              </h2>
              <p className="text-sm text-gray-500 text-center mb-6">
                アカウントの種類を選択してください
              </p>

              <div className="space-y-3">
                {roles.map((role, i) => (
                  <motion.button
                    key={role.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.08 }}
                    onClick={() => setSelectedRole(role.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 ${role.color}`}
                  >
                    <div
                      className={`w-11 h-11 rounded-lg flex items-center justify-center ${role.iconBg}`}
                    >
                      <role.icon className={`w-5 h-5 ${role.iconColor}`} />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-bold text-gray-900 text-sm">
                        {role.label}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {role.description}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="login-form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-lg shadow-gray-200/60 p-6"
            >
              <button
                onClick={() => {
                  setSelectedRole(null);
                  setEmail("");
                  setPassword("");
                }}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-5"
              >
                <ArrowLeft className="w-4 h-4" />
                戻る
              </button>

              {currentRole && (
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${currentRole.iconBg}`}
                  >
                    <currentRole.icon
                      className={`w-5 h-5 ${currentRole.iconColor}`}
                    />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">
                    {currentRole.label}
                  </h2>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    メールアドレス
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-shadow"
                    placeholder="example@patimoba.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    パスワード
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-shadow"
                      placeholder="パスワードを入力"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="w-full bg-amber-400 hover:bg-amber-500 text-white font-bold py-3 rounded-lg transition-colors mt-2"
                >
                  ログイン
                </motion.button>
              </form>

              <button className="w-full text-center text-sm text-amber-600 hover:underline mt-4">
                パスワードをお忘れですか？
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-center text-xs text-gray-400 mt-6">
          <Link href="/" className="hover:text-amber-600 transition-colors">
            トップページに戻る
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
