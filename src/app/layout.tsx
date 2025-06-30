import "../../styles/global.css";
import { Metadata, Viewport } from "next";
import { Navbar } from "@/app/(landing)/components/Navbar";
import Sidebar from "@/app/(landing)/components/Sidebar";
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: "Remotion and Next.js",
  description: "Remotion and Next.js",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex h-screen overflow-hidden">
        <aside className=" h-screen ">
          <Sidebar />
        </aside>

        <div className="flex-1 flex flex-col">
          <header className="">
            <Navbar />
          </header>

          <main className="flex-1 overflow-y-auto p-4 ">
            {children}
            <Analytics />
          </main>
        </div>
      </body>
    </html>
  );
}
