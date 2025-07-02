"use client";
import { usePathname } from "next/navigation";
import Sidebar from "./(landing)/components/Sidebar";
import { Navbar } from "./(landing)/components/Navbar";
import { Analytics } from "@vercel/analytics/next";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) {
    return (
      <>
        {children}
        <Analytics />
      </>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="h-screen">
        <Sidebar />
      </aside>
      <div className="flex-1 flex flex-col">
        <header>
          <Navbar />
        </header>
        <main className="flex-1 overflow-y-auto">
          {children}
          <Analytics />
        </main>
      </div>
    </div>
  );
} 