"use client";
import { usePathname } from "next/navigation";
import  Navbar  from "./(landing)/components/Navbar";
import { Analytics } from "@vercel/analytics/next";

/**
 * Provides a layout wrapper that conditionally renders either a minimal or full application shell based on the current route.
 *
 * If the current path is the root ("/"), renders only the children and analytics. For all other routes, displays a layout with a header containing the navigation bar, a scrollable main content area, and analytics.
 *
 * @param children - The content to be rendered within the layout
 */
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
      {/* <aside className="h-screen">
        <Sidebar />
      </aside> */}
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