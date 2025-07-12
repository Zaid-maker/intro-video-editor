import { z } from "zod";
import { ProjectResponse } from "@/types/schema";

export type Project = z.infer<typeof ProjectResponse>;

// In-memory storage for projects (replace with database in production)
class ProjectStore {
	private projects = new Map<string, Project>();

	// Get all projects
	getAll(): Project[] {
		return Array.from(this.projects.values());
	}

	// Get project by ID
	get(id: string): Project | undefined {
		return this.projects.get(id);
	}

	// Create or update project
	set(id: string, project: Project): void {
		this.projects.set(id, project);
	}

	// Delete project
	delete(id: string): boolean {
		return this.projects.delete(id);
	}

	// Check if project exists
	has(id: string): boolean {
		return this.projects.has(id);
	}

	// Get projects count
	size(): number {
		return this.projects.size;
	}
}

// Export singleton instance
export const projectStore = new ProjectStore();

// Generate unique ID for projects
export function generateProjectId(): string {
	return `project_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}
