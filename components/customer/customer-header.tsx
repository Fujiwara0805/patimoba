"use client";

import Link from "next/link";
import { User, ShoppingCart, LogOut } from "lucide-react";

interface CustomerHeaderProps {
  shopName?: string;
  userName?: string;
  points?: number;
  avatarUrl?: string;
  cartCount?: number;
  showCart?: boolean;
}

export function CustomerHeader({
  shopName,
  userName = "美咲",
  points = 69,
  avatarUrl,
  cartCount = 0,
  showCart = false,
}: CustomerHeaderProps) {
  return (
    <header className="bg-[#FFEB3B] px-4 py-3 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-2.5">
        <Link href="/" className="flex items-center mr-1">
          <img
            src="/スクリーンショット_2026-04-09_14.49.59.png"
            alt="パティモバ"
            className="h-6 w-auto"
          />
        </Link>
        {shopName && (
          <h1 className="font-bold text-gray-900 text-base">{shopName}</h1>
        )}
      </div>
      <div className="flex items-center gap-2.5">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="avatar"
            className="w-9 h-9 rounded-full object-cover border-2 border-white"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        )}
        <Link
          href="/customer/profile"
          className="font-bold text-gray-900 text-sm hover:underline"
        >
          {userName}
        </Link>
        <span className="font-bold text-gray-900 text-sm">{points}PT</span>
        {showCart && (
          <Link href="/customer/takeout/confirm" className="relative ml-1">
            <ShoppingCart className="w-6 h-6 text-gray-900" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold min-w-[18px] min-h-[18px] rounded-full flex items-center justify-center leading-none px-1">
                {cartCount}
              </span>
            )}
          </Link>
        )}
        <Link href="/" className="ml-1 p-1.5 rounded-full hover:bg-amber-400/40 transition-colors" title="ログアウト">
          <LogOut className="w-4.5 h-4.5 text-gray-800" />
        </Link>
      </div>
    </header>
  );
}
