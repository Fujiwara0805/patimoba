"use client"

import { CustomerProvider } from "@/lib/customer-context";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CustomerProvider>
      <div className="min-h-screen bg-white max-w-[430px] mx-auto shadow-lg relative">
        {children}
      </div>
    </CustomerProvider>
  );
}
