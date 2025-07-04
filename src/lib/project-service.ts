import { eq, and } from 'drizzle-orm';
import { db } from '@/db';
import { project } from '@/db/schema';
import { generateProjectId } from './project-store';

export interface ProjectData {
  id: string;
  name: string;
  templateId: string;
  properties: Record<string, any>;
  description?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProjectData {
  name: string;
  templateId: string;
  properties: Record<string, any>;
  description?: string;
  userId: string;
}

export interface UpdateProjectData {
  name?: string;
  templateId?: string;
  properties?: Record<string, any>;
  description?: string;
}

export class ProjectService {
  // Create a new project
  async createProject(data: CreateProjectData): Promise<ProjectData> {
    const projectId = generateProjectId();
    const now = new Date();

    const [newProject] = await db
      .insert(project)
      .values({
        id: projectId,
        name: data.name,
        templateId: data.templateId,
        properties: data.properties,
        description: data.description,
        userId: data.userId,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    return newProject as ProjectData;
  }

  // Get all projects for a user
  async getUserProjects(userId: string): Promise<ProjectData[]> {
    const projects = await db
      .select()
      .from(project)
      .where(eq(project.userId, userId))
      .orderBy(project.updatedAt);

    return projects as ProjectData[];
  }

  // Get all projects (admin function)
  async getAllProjects(): Promise<ProjectData[]> {
    const projects = await db
      .select()
      .from(project)
      .orderBy(project.updatedAt);

    return projects as ProjectData[];
  }

  // Get a specific project by ID
  async getProject(id: string, userId?: string): Promise<ProjectData | null> {
    const conditions = userId 
      ? and(eq(project.id, id), eq(project.userId, userId))
      : eq(project.id, id);

    const [foundProject] = await db
      .select()
      .from(project)
      .where(conditions)
      .limit(1);

    return (foundProject as ProjectData) || null;
  }

  // Update a project
  async updateProject(
    id: string, 
    data: UpdateProjectData, 
    userId?: string
  ): Promise<ProjectData | null> {
    const conditions = userId 
      ? and(eq(project.id, id), eq(project.userId, userId))
      : eq(project.id, id);

    const [updatedProject] = await db
      .update(project)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(conditions)
      .returning();

    return (updatedProject as ProjectData) || null;
  }

  // Delete a project
  async deleteProject(id: string, userId?: string): Promise<boolean> {
    const conditions = userId 
      ? and(eq(project.id, id), eq(project.userId, userId))
      : eq(project.id, id);

    const result = await db
      .delete(project)
      .where(conditions)
      .returning({ id: project.id });

    return result.length > 0;
  }

  // Check if project exists
  async projectExists(id: string, userId?: string): Promise<boolean> {
    const foundProject = await this.getProject(id, userId);
    return foundProject !== null;
  }
}

// Export singleton instance
export const projectService = new ProjectService();
