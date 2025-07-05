'use client';

import { Navigation } from './Navigation';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      <main>{children}</main>
    </div>
  );
}
