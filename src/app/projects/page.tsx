'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreateProjectDialog } from '@/components/CreateProjectDialog';
import { AppLayout } from '@/components/AppLayout';
import { formatDistanceToNow } from 'date-fns';
import { Trash2, Play, Plus, Folder } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  templateId: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const result = await response.json();
      
      if (result.type === 'success') {
        setProjects(result.data);
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
    router.push(`/intro?projectId=${projectId}`);
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(projectId);
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      if (result.type === 'success') {
        setProjects(projects.filter(p => p.id !== projectId));
      } else {
        alert('Failed to delete project: ' + result.message);
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project');
    } finally {
      setIsDeleting(null);
    }
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B43F7] mx-auto mb-4"></div>
              <p className="text-gray-400">Loading your projects...</p>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
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
                    onClick={() => handleDeleteProject(project.id)}
                    disabled={isDeleting === project.id}
                    className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                  >
                    {isDeleting === project.id ? (
                      <div className="w-4 h-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
