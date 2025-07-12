import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

const DEMO_USER_ID = "demo-user-id";

export async function ensureDemoUser() {
	if (process.env.NODE_ENV !== "development") {
		return null;
	}

	try {
		// Check if demo user exists
		const [existingUser] = await db
			.select()
			.from(user)
			.where(eq(user.id, DEMO_USER_ID))
			.limit(1);

		if (existingUser) {
			console.log("Demo user already exists");
			return existingUser;
		}

		// Create demo user
		const [newUser] = await db
			.insert(user)
			.values({
				id: DEMO_USER_ID,
				name: "Demo User",
				email: "demo@example.com",
				emailVerified: true,
				image: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			})
			.returning();

		console.log("Created demo user for development");
		return newUser;
	} catch (error) {
		console.error("Error ensuring demo user exists:", error);
		return null;
	}
}

export { DEMO_USER_ID };
