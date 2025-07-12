import { z } from "zod";

export const RecentProjectSchema = z.object({
	id: z.string(),
	name: z.string(),
	templateId: z.string(),
	updatedAt: z.string(),
});

export type RecentProject = z.infer<typeof RecentProjectSchema>;
