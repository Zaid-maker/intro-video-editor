import "../../styles/global.css";
import type { Metadata, Viewport } from "next";
import AppShell from "./AppShell";
import { Toaster } from "sonner";

export const metadata: Metadata = {
	title: "Advance Remotion Editor",
	description: "A powerful editor for Remotion projects",
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
};

/**
 * Defines the root layout for the application, wrapping all pages with the main app shell and global providers.
 *
 * Renders the provided children inside the `AppShell` component and includes a global toast notification system.
 *
 * @param children - The content to be rendered within the application layout
 */
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
