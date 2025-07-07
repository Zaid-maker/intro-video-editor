import { z } from 'zod'

export const ProjectSchema = z.object({
    id: z.string(),
    name: z.string(),
    templateId: z.string(),
    description: z.string().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export type Project = z.infer<typeof ProjectSchema>;