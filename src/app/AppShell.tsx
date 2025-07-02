"use client";
import { usePathname } from "next/navigation";
import Sidebar from "./(landing)/components/Sidebar";
import { Navbar } from "./(landing)/components/Navbar";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

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
          <Script
            src="https://cdn.databuddy.cc/databuddy.js"
            data-client-id="_vGEJMoaX9IPXri9OWPjS"
            data-track-hash-changes="true"
            data-track-attributes="true"
            data-track-outgoing-links="true"
            data-track-interactions="true"
            data-track-engagement="true"
            data-track-scroll-depth="true"
            data-track-exit-intent="true"
            data-track-bounce-rate="true"
            data-track-web-vitals="true"
            data-track-errors="true"
            data-enable-batching="true"
            crossOrigin="anonymous"
            async
          />
          <Analytics />
        </main>
      </div>
    </div>
  );
} 