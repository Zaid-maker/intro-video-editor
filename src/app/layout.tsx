import "../../styles/global.css";
import { Metadata, Viewport } from "next";
import AppShell from "./AppShell";
import { Toaster } from "sonner";

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
      <body>
        <AppShell>
          {children}
          <Toaster />
        </AppShell>
      </body>
    </html>
  );
}
