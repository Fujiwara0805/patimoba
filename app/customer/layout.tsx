"use client"

import { CustomerProvider } from "@/lib/customer-context";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CustomerProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="min-h-screen bg-white w-full max-w-[430px] mx-auto sm:shadow-lg relative">
          {children}
        </div>
      </div>
    </CustomerProvider>
  );
}
