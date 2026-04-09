"use client";

import { useState } from "react";
import { CakeTab } from "@/components/store/register/cake-tab";
import { CustomTab } from "@/components/store/register/custom-tab";
import { EcTab } from "@/components/store/register/ec-tab";

type MainTab = "ケーキ登録" | "カスタム" | "EC";

export default function StoreRegisterPage() {
  const [mainTab, setMainTab] = useState<MainTab>("ケーキ登録");

  return (
    <div className="p-6">
      <div className="flex border-b border-gray-200 mb-6">
        {(["ケーキ登録", "カスタム", "EC"] as MainTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setMainTab(tab)}
            className={`px-6 py-2.5 text-sm font-bold border border-b-0 rounded-t-lg transition-colors ${
              mainTab === tab
                ? "bg-white text-gray-900 border-gray-200"
                : "bg-gray-50 text-gray-400 border-transparent hover:text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {mainTab === "ケーキ登録" && <CakeTab />}
      {mainTab === "カスタム" && <CustomTab />}
      {mainTab === "EC" && <EcTab />}
    </div>
  );
}
