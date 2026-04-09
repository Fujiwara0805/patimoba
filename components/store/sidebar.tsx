"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Store } from "lucide-react";

interface MenuItem {
  label: string;
  href: string;
  hasNotification?: boolean;
  children?: { label: string; href: string }[];
}

const menuItems: MenuItem[] = [
  { label: "ダッシュボード", href: "/store/dashboard" },
  {
    label: "予約管理",
    href: "/store/orders",
    children: [{ label: "注文履歴", href: "/store/orders/history" }],
  },
  { label: "顧客管理", href: "/store/customers" },
  { label: "商品管理", href: "/store/products" },
  { label: "商品登録", href: "/store/register" },
  { label: "営業日設定", href: "/store/business-days", hasNotification: true },
];

const bottomItems = [
  { label: "アカウント", href: "/store/account" },
  { label: "ログアウト", href: "/" },
];

export function StoreSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[180px] min-h-screen border-r border-gray-200 bg-white flex flex-col shrink-0">
      <div className="flex flex-col">
        <div className="w-full h-24 bg-gray-100 overflow-hidden">
          <img
            src="https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?auto=compress&cs=tinysrgb&w=400"
            alt="店舗ロゴ"
            className="w-full h-full object-cover"
          />
        </div>
        <Link href="/" className="flex items-center gap-2 px-4 py-3">
          <img
            src="/スクリーンショット_2026-04-09_14.48.26.png"
            alt="パティモバ"
            className="h-6 w-auto"
          />
          <span className="text-sm font-bold text-amber-600">パティモバ</span>
        </Link>
      </div>

      <nav className="flex flex-col flex-1">
        <div className="flex flex-col">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/") || (item.children?.some((c) => pathname === c.href));
            return (
              <div key={item.href}>
                <Link href={item.href} className="relative">
                  <motion.div
                    className={`px-5 py-3 text-sm transition-colors relative ${
                      isActive
                        ? "font-bold text-gray-900 bg-gray-50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.15 }}
                  >
                    {item.hasNotification && (
                      <span className="absolute left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full" />
                    )}
                    {item.label}
                  </motion.div>
                </Link>
                {isActive && item.children && (
                  <div className="flex flex-col">
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href}>
                        <div className="px-8 py-1.5 text-xs text-gray-500 hover:text-gray-800 transition-colors">
                          {child.label}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-auto flex flex-col pb-6">
          {bottomItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  className={`px-5 py-3 text-sm transition-colors ${
                    isActive
                      ? "font-bold text-gray-900 bg-gray-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.15 }}
                >
                  {item.label}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
