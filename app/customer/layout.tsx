export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white max-w-[430px] mx-auto shadow-lg relative">
      {children}
    </div>
  );
}
