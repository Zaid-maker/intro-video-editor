import { NextResponse } from 'next/server';
import { z } from 'zod';
import { CreateProjectRequest, ProjectResponse } from '@/types/schema';
import { executeApi } from '@/helpers/api-response';
import { templates } from '@/lib/data';
import { projectService } from '@/lib/project-service';
import { getCurrentUserId } from '@/lib/auth-utils';

// GET - List all projects for the current user
export async function GET() {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json(
        { type: 'error', message: 'Authentication required' },
        { status: 401 }
      );
    }

    const allProjects = await projectService.getUserProjects(userId);
    return NextResponse.json({
      type: 'success',
      data: allProjects,
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
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
    // Check authentication
    const userId = await getCurrentUserId();
    if (!userId) {
      throw new Error('Authentication required');
    }

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
    const newProject = await projectService.createProject({
      name: body.name,
      templateId: body.templateId,
      properties: mergedProperties,
      description: body.description,
      userId,
    });

    return newProject;
  }
);
