import { NextResponse } from 'next/server';
import { z } from 'zod';
import { UpdateProjectRequest } from '@/types/schema';
import { templates } from '@/lib/data';
import { projectService } from '@/lib/project-service';
import { requireUserId } from '@/lib/auth-utils';

// GET - Get a specific project
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = await requireUserId();
    const project = await projectService.getProject(id, userId);
    
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
  } catch (error) {
    console.error('Error fetching project:', error);
    
    if (error instanceof Error && error.message.includes('Authentication required')) {
      return NextResponse.json(
        { type: 'error', message: error.message },
        { status: 401 }
      );
    }
    
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
    const userId = await requireUserId();
    const existingProject = await projectService.getProject(id, userId);
    
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
    const updatedProject = await projectService.updateProject(id, updateData, userId);

    if (!updatedProject) {
      return NextResponse.json(
        { type: 'error', message: 'Failed to update project' },
        { status: 500 }
      );
    }

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
    
    console.error('Error updating project:', error);
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
    const userId = await requireUserId();
    const project = await projectService.getProject(id, userId);
    
    if (!project) {
      return NextResponse.json(
        { type: 'error', message: 'Project not found' },
        { status: 404 }
      );
    }

    const deleted = await projectService.deleteProject(id, userId);

    if (!deleted) {
      return NextResponse.json(
        { type: 'error', message: 'Failed to delete project' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      type: 'success',
      data: { message: 'Project deleted successfully', id },
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { type: 'error', message: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
