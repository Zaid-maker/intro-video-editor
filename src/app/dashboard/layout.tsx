import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

interface LayoutProps {
	children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		if (!session) redirect("/sign-in");
	} catch (error) {
		console.error("Error fetching session:", error);
		redirect("/sign-in");
	}

	return <div className="bg-[#111113] lg:pt-24 pt-20 p-6">{children}</div>;
}
