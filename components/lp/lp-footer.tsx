"use client";

import { Mail } from "lucide-react";

export function LpFooter() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src="/スクリーンショット_2026-04-09_14.48.26.png"
              alt="パティモバ"
              className="h-8 w-auto brightness-0 invert"
            />
            <div>
              <p className="font-bold text-sm">パティモバ</p>
              <p className="text-xs text-gray-400">
                洋菓子店の販売を、これひとつで。
              </p>
            </div>
          </div>

          <div className="text-center sm:text-right">
            <p className="text-xs text-gray-400">Crafted Glow株式会社</p>
            <div className="flex items-center gap-1.5 mt-1 justify-center sm:justify-end">
              <Mail className="w-3.5 h-3.5 text-gray-400" />
              <a
                href="mailto:info@patisseriemobile.com"
                className="text-xs text-gray-400 hover:text-amber-400 transition-colors"
              >
                info@patisseriemobile.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Crafted Glow Inc. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
