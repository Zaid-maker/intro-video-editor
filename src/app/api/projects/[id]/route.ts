import { NextResponse } from 'next/server';
import { z } from 'zod';
import { UpdateProjectRequest, ProjectResponse } from '@/types/schema';
import { templates } from '@/lib/data';
import { projectStore } from '@/lib/project-store';

// GET - Get a specific project
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = projectStore.get(id);
    
    if (!project) {
      return NextResponse.json(
        { type: 'error', message: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      type: 'success',
      data: project,
    });
  } catch {
    return NextResponse.json(
      { type: 'error', message: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

// PUT - Update a project
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const existingProject = projectStore.get(id);
    
    if (!existingProject) {
      return NextResponse.json(
        { type: 'error', message: 'Project not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const updateData = UpdateProjectRequest.parse(body);

    // Validate template if provided
    if (updateData.templateId && updateData.templateId !== existingProject.templateId) {
      const template = templates.find(t => t.id === updateData.templateId);
      if (!template) {
        return NextResponse.json(
          { type: 'error', message: `Template with ID '${updateData.templateId}' not found` },
          { status: 400 }
        );
      }
    }

    // Update project
    const updatedProject: z.infer<typeof ProjectResponse> = {
      ...existingProject,
      name: updateData.name ?? existingProject.name,
      templateId: updateData.templateId ?? existingProject.templateId,
      properties: updateData.properties ?? existingProject.properties,
      description: updateData.description ?? existingProject.description,
      updatedAt: new Date(),
    };

    projectStore.set(id, updatedProject);

    return NextResponse.json({
      type: 'success',
      data: updatedProject,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { type: 'error', message: error.errors[0].message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { type: 'error', message: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a project
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = projectStore.get(id);
    
    if (!project) {
      return NextResponse.json(
        { type: 'error', message: 'Project not found' },
        { status: 404 }
      );
    }

    projectStore.delete(id);

    return NextResponse.json({
      type: 'success',
      data: { message: 'Project deleted successfully', id },
    });
  } catch {
    return NextResponse.json(
      { type: 'error', message: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
