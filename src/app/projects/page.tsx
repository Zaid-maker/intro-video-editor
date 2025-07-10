'use client';

import { CreateProjectDialog } from '@/components/CreateProjectDialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { formatDistanceToNow } from 'date-fns';
import { Folder, Play, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Project, ProjectSchema } from './schema';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const result = await response.json();

      if (result.type === 'success') {
        const validated = (result.data as unknown[])
          .map(item => {
            try {
              return ProjectSchema.parse(item);
            } catch (e) {
              console.error('Invalid project data:', e);
              return null;
            }
          })
          .filter((item): item is Project => item !== null);
        setProjects(validated);
      } else {
        console.error('Failed to load projects:', result.message);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenProject = (projectId: string) => {
    router.push(`/editor?projectId=${projectId}`);
  };

  const handleDeleteProject = async (projectId: string) => {
    setIsDeleting(projectId);
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      if (result.type === 'success') {
        setProjects(projects.filter(p => p.id !== projectId));
      } else {
        toast.error('Failed to delete project', {
          description: result.message || 'An error occurred while deleting the project.',
        });
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project', {
        description: 'An error occurred while deleting the project.',
      });
    } finally {
      setIsDeleting(null);
      setDeleteTarget(null);
      setShowDeleteDialog(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B43F7] mx-auto mb-4"></div>
            <p className="text-gray-400">Loading your projects...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Projects</h1>
          <p className="text-gray-400">
            {projects.length === 0
              ? "You haven't created any projects yet"
              : `${projects.length} project${projects.length === 1 ? '' : 's'}`
            }
          </p>
        </div>
        <CreateProjectDialog>
          <Button className="bg-[#8B43F7] hover:bg-[#a366fa] text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </CreateProjectDialog>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <Folder className="w-12 h-12 text-gray-600" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No projects yet</h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Create your first intro video project and start building amazing content for your brand.
          </p>
          <CreateProjectDialog>
            <Button className="bg-[#8B43F7] hover:bg-[#a366fa] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Project
            </Button>
          </CreateProjectDialog>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="bg-[#232327] border-gray-700 hover:border-gray-600 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-white text-lg truncate">
                      {project.name}
                    </CardTitle>
                    <CardDescription className="text-gray-400 mt-1">
                      {project.description || 'No description'}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="ml-2 bg-gray-700 text-gray-300">
                    {project.templateId}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>Created {formatDistanceToNow(new Date(project.createdAt))} ago</p>
                  <p>Updated {formatDistanceToNow(new Date(project.updatedAt))} ago</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenProject(project.id)}
                  className="flex-1 border-gray-600 text-white hover:bg-gray-800"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Open
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setDeleteTarget(project);
                    setShowDeleteDialog(true);
                  }}
                  disabled={isDeleting === project.id}
                  className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                >
                  {isDeleting === project.id ? (
                    <div className="w-4 h-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </Button>
                {/* Delete Confirmation Dialog */}
                <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Project</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete <span className="font-semibold text-white">{deleteTarget?.name}</span>? This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowDeleteDialog(false);
                          setDeleteTarget(null);
                        }}
                        className="border-gray-600 text-gray-300 hover:bg-gray-800"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => deleteTarget && handleDeleteProject(deleteTarget.id)}
                        disabled={isDeleting === deleteTarget?.id}
                        className="bg-red-600 text-white hover:bg-red-700"
                      >
                        {isDeleting === deleteTarget?.id ? (
                          <div className="w-4 h-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        ) : (
                          'Delete'
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
