const { execSync } = require("child_process");

try {
	console.log("Running database migration...");
	execSync("npx drizzle-kit migrate", { stdio: "inherit" });
	console.log("✅ Migration completed successfully!");
} catch (error) {
	console.error("❌ Migration failed:", error.message);
	process.exit(1);
}
