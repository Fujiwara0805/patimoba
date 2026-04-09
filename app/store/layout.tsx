import { StoreSidebar } from "@/components/store/sidebar";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white">
      <StoreSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
