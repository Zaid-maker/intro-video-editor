import { z } from "zod";
import { CompositionProps } from "@/types/constants";

export const RenderRequest = z.object({
	id: z.string(),
	inputProps: CompositionProps,
});

export const ProgressRequest = z.object({
	bucketName: z.string(),
	id: z.string(),
});

export const CreateProjectRequest = z.object({
	name: z
		.string()
		.min(1, "Project name is required")
		.max(100, "Project name too long"),
	templateId: z.string().min(1, "Template ID is required"),
	properties: z.record(z.any()).default({}),
	description: z.string().optional(),
});

export const UpdateProjectRequest = z.object({
	id: z.string(),
	name: z
		.string()
		.min(1, "Project name is required")
		.max(100, "Project name too long")
		.optional(),
	templateId: z.string().optional(),
	properties: z.record(z.any()).optional(),
	description: z.string().optional(),
});

export const ProjectResponse = z.object({
	id: z.string(),
	name: z.string(),
	templateId: z.string(),
	properties: z.record(z.any()),
	description: z.string().optional(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type ProgressResponse =
	| {
			type: "error";
			message: string;
	  }
	| {
			type: "progress";
			progress: number;
	  }
	| {
			type: "done";
			url: string;
			size: number;
	  };
