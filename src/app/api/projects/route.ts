import { NextResponse } from "next/server";
import { z } from "zod";
import { CreateProjectRequest, ProjectResponse } from "@/types/schema";
import { executeApi } from "@/helpers/api-response";
import { templates } from "@/lib/data";
import { projectService } from "@/lib/project-service";
import { requireUserId } from "@/lib/auth-utils";

// GET - List all projects for the current user
export async function GET() {
	try {
		const userId = await requireUserId();
		const allProjects = await projectService.getUserProjects(userId);

		return NextResponse.json({
			type: "success",
			data: allProjects,
		});
	} catch (error) {
		console.error("Error fetching projects:", error);

		if (
			error instanceof Error &&
			error.message.includes("Authentication required")
		) {
			return NextResponse.json(
				{ type: "error", message: error.message },
				{ status: 401 },
			);
		}

		return NextResponse.json(
			{ type: "error", message: "Failed to fetch projects" },
			{ status: 500 },
		);
	}
}

// POST - Create a new project
export const POST = executeApi<
	z.infer<typeof ProjectResponse>,
	typeof CreateProjectRequest
>(CreateProjectRequest, async (req, body) => {
	console.log("Creating project for body:", body);

	// Check authentication
	const userId = await requireUserId();
	console.log("Authenticated user ID:", userId);

	// Validate template exists
	const template = templates.find((t) => t.id === body.templateId);
	if (!template) {
		throw new Error(`Template with ID '${body.templateId}' not found`);
	}
	console.log("Using template:", template.id);

	// Merge default properties with provided properties
	const mergedProperties = {
		...template.defaultProps,
		...body.properties,
	};

	// Create new project
	const newProject = await projectService.createProject({
		name: body.name,
		templateId: body.templateId,
		properties: mergedProperties,
		description: body.description,
		userId,
	});

	console.log("Created project:", newProject.id);
	return newProject;
});
