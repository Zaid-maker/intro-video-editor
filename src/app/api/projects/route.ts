import { NextResponse } from 'next/server';
import { z } from 'zod';
import { CreateProjectRequest, ProjectResponse } from '@/types/schema';
import { executeApi } from '@/helpers/api-response';
import { templates } from '@/lib/data';
import { projectStore, generateProjectId } from '@/lib/project-store';

// GET - List all projects
export async function GET() {
  try {
    const allProjects = projectStore.getAll();
    return NextResponse.json({
      type: 'success',
      data: allProjects,
    });
  } catch {
    return NextResponse.json(
      { type: 'error', message: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST - Create a new project
export const POST = executeApi<z.infer<typeof ProjectResponse>, typeof CreateProjectRequest>(
  CreateProjectRequest,
  async (req, body) => {
    // Validate template exists
    const template = templates.find(t => t.id === body.templateId);
    if (!template) {
      throw new Error(`Template with ID '${body.templateId}' not found`);
    }

    // Merge default properties with provided properties
    const mergedProperties = {
      ...template.defaultProps,
      ...body.properties,
    };

    // Create new project
    const projectId = generateProjectId();
    const now = new Date();
    
    const newProject: z.infer<typeof ProjectResponse> = {
      id: projectId,
      name: body.name,
      templateId: body.templateId,
      properties: mergedProperties,
      description: body.description,
      createdAt: now,
      updatedAt: now,
    };

    // Store project
    projectStore.set(projectId, newProject);

    return newProject;
  }
);
