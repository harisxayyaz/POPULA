import Sidebar from "../../components/Sidebar";
import NextTopLoader from "nextjs-toploader";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="flex w-screen h-screen bg-[#f4f7fe]">
          <NextTopLoader />
          <Sidebar />
          {children}
        </main>
      </body>
    </html>
  );
}
