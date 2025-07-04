'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { templates } from '@/lib/data';
import { CreateProjectRequest } from '@/types/schema';
import { Loader2 } from 'lucide-react';

const createProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required').max(100, 'Project name too long'),
  templateId: z.string().min(1, 'Please select a template'),
  description: z.string().optional(),
});

type CreateProjectForm = z.infer<typeof createProjectSchema>;

interface CreateProjectDialogProps {
  children: React.ReactNode;
}

export function CreateProjectDialog({ children }: CreateProjectDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<CreateProjectForm>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: '',
      templateId: '',
      description: '',
    },
  });

  async function onSubmit(data: CreateProjectForm) {
    setIsLoading(true);
    try {
      const template = templates.find(t => t.id === data.templateId);
      
      const projectData: z.infer<typeof CreateProjectRequest> = {
        name: data.name,
        templateId: data.templateId,
        description: data.description,
        properties: template?.defaultProps || {},
      };

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      const result = await response.json();
      
      if (result.type === 'success') {
        // Redirect to editor with project ID
        router.push(`/intro?projectId=${result.data.id}`);
      } else {
        throw new Error(result.message || 'Failed to create project');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      // You might want to show a toast notification here
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-white text-lg font-semibold">Create New Project</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            Give your project a name and select a template to get started.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-200 font-medium">Project Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter project name" 
                      {...field}
                      disabled={isLoading}
                      className="bg-white dark:bg-[#2a2a2a] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                    />
                  </FormControl>
                  <FormDescription className="text-gray-500 dark:text-gray-400 text-sm">
                    Choose a descriptive name for your project
                  </FormDescription>
                  <FormMessage className="text-red-600 dark:text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="templateId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-200 font-medium">Template</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white dark:bg-[#2a2a2a] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                        <SelectValue placeholder="Select a template" className="text-gray-500 dark:text-gray-400" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white dark:bg-[#2a2a2a] border-gray-300 dark:border-gray-600">
                      {templates.map((template) => (
                        <SelectItem 
                          key={template.id} 
                          value={template.id}
                          className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700"
                        >
                          {template.id}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-gray-500 dark:text-gray-400 text-sm">
                    Choose the template for your intro video
                  </FormDescription>
                  <FormMessage className="text-red-600 dark:text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-200 font-medium">Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your project..." 
                      {...field}
                      disabled={isLoading}
                      className="bg-white dark:bg-[#2a2a2a] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 min-h-[80px]"
                    />
                  </FormControl>
                  <FormDescription className="text-gray-500 dark:text-gray-400 text-sm">
                    Add a brief description of your project
                  </FormDescription>
                  <FormMessage className="text-red-600 dark:text-red-400" />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={isLoading}
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="bg-[#8B43F7] hover:bg-[#a366fa] text-white border-0"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Project
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
