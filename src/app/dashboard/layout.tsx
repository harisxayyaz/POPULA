import Sidebar from "../../components/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="flex h-screen bg-[#f4f7fe]">
          <Sidebar />
          {children}
        </main>
      </body>
    </html>
  );
}
