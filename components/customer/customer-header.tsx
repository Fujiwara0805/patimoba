"use client";

import Link from "next/link";
import { User, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";

interface CustomerHeaderProps {
  shopName?: string;
  userName?: string;
  avatarUrl?: string;
  points?: number;
  showCart?: boolean;
  onCartClick?: () => void;
}

export function CustomerHeader({
  shopName,
  userName,
  avatarUrl,
  points,
  showCart = true,
  onCartClick,
}: CustomerHeaderProps) {
  const { itemCount } = useCart();

  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-[#FFEB3B] px-4 py-3 flex items-center justify-between sticky top-0 z-50"
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <Link href="/customer/profile" className="flex-shrink-0">
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
        </Link>
        <span className="font-bold text-gray-900 text-sm truncate">
          {userName || shopName || "ゲスト"}
        </span>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        {points !== undefined && (
          <span className="font-bold text-gray-900 text-sm tracking-wide">
            {points.toLocaleString()}PT
          </span>
        )}
        {showCart && (
          <button onClick={onCartClick} className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-900" />
            {itemCount > 0 && (
              <motion.span
                key={itemCount}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold min-w-[18px] min-h-[18px] rounded-full flex items-center justify-center leading-none px-1"
              >
                {itemCount > 99 ? "99+" : itemCount}
              </motion.span>
            )}
          </button>
        )}
      </div>
    </motion.header>
  );
}
