"use client"

import { StoreSidebar } from "@/components/store/sidebar";
import { StoreProvider } from "@/lib/store-context";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <div className="flex min-h-screen bg-white">
        <StoreSidebar />
        <main className="flex-1 overflow-auto store-scope">{children}</main>
      </div>
    </StoreProvider>
  );
}
