'use client';

import { CreateProjectDialog } from "@/components/CreateProjectDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { ArrowRight, Folder } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { z } from "zod";
import Template from "./components/Template";

// Zod schema for runtime validation of RecentProject
export const RecentProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  templateId: z.string(),
  updatedAt: z.string(),
});

export type RecentProject = z.infer<typeof RecentProjectSchema>;

function Dashboard() {
  const [recentProjects, setRecentProjects] = useState<RecentProject[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [projectsError, setProjectsError] = useState<string | null>(null);

  useEffect(() => {
    loadRecentProjects();
  }, []);

  const loadRecentProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const result = await response.json();

      if (result.type === 'success') {
        // Get the 3 most recently updated projects
        const recent = (result.data as RecentProject[])
          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
          .slice(0, 3);
        setRecentProjects(recent);
      }
    } catch (error) {
      console.error('Error loading recent projects:', error);
      setProjectsError('Failed to load recent projects');
    } finally {
      setIsLoadingProjects(false);
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row w-full gap-6">
        {/* Card 1 */}
        <div className="relative w-full lg:flex-[3] h-auto lg:h-96 rounded-lg bg-[#232327]">
          <Image
            width={100}
            height={100}
            src="/cardLines.webp"
            alt="Background lines"
            className="absolute inset-0 w-full h-48 object-cover opacity-20"
          />
          <div className="relative z-10 p-6 h-full flex flex-col justify-between">
            <div className="flex justify-center mr-5  mb-0 lg:mb-4">
              <Image
                height={130}
                width={130}

                src="/file1.webp"
                alt="File icon"
              />
            </div>
            <div className=" lg:absolute lg:bottom-20 -lg:mt-0 -mt-6 left-32 lg:left-52 xl:left-[19rem] 2xl:left-[25rem]">
              <h3 className="text-white text-md lg:text-2xl font-semibold mb-2">
                Start with your own file
              </h3>
              <p className="text-gray-300 lg:text-lg text-xs lg:w-96 mb-4">
                Upload your videos or images, select a template and see what brainstorm is capable to do.
              </p>
              <button className="px-4 py-2 bg-[#8B43F7] rounded-lg text-white text-xs font-medium">
                Browse files to upload your videos or images
              </button>
            </div>
            <div className="flex items-center mt-4 italic justify-center lg:ml-6">
              <span className="text-gray-500 text-sm text-center">
                JPG, PNG and Webp formats up to 5 MB.
              </span>
            </div>
          </div>
          <div className="absolute bottom-0">
            <Image height={100}
              width={100} src="/cardshadow1.webp" alt="" />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col w-full lg:flex-[2] space-y-3">
          {/* Card 2 */}
          <div className="relative h-auto lg:h-48 rounded-lg bg-[#232327]">
            <div className="relative z-10 p-4 sm:p-6 h-full flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <Image
                height={100}
                width={100}
                src="/file2.webp"
                alt="File icon"
                className="w-20 h-20 sm:w-24 sm:h-24"
              />              <div className="text-center lg:text-left">
                <h3 className="text-white text-lg font-semibold mb-1">
                  Create Your First Project
                </h3>
                <p className="text-gray-300 text-sm mb-2">
                  Create your first project, discover tons of templates and generate any video you want.
                </p>
                <CreateProjectDialog>
                  <Button
                    className="bg-[#8B43F7] text-white text-sm font-medium rounded px-4 py-2 transition-colors duration-200 hover:bg-[#a366fa] cursor-pointer"
                  >
                    Create Project
                  </Button>
                </CreateProjectDialog>
              </div>
            </div>
            <div className="absolute bottom-0">
              <Image height={100}
                width={100} src="/cardshadow2.webp" alt="" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative h-auto lg:h-[179px] rounded-lg overflow-hidden bg-[#232327]">
            <div className="relative z-10 p-6 h-full flex flex-col lg:flex-row items-center gap-4">
              <div className="relative">
                {/* <Image height={100}
                  width={100} src="/shape1.webp" alt="shape1" className="w-12 hidden lg:block absolute -top-5 rotate-[30deg] -left-[35px] h-12" />
              <Image
  height={100}
  width={100}
  src="/shape2.webp"
  alt="shape2"
  className="hidden lg:block absolute -top-10 h-12 w-[30px] lg:w-[40px] xl:w-[48px] 2xl:w-[55px] left-[6px] lg:left-[20px] xl:left-[28px]"
/>
<Image height={100}
                  width={100} src="/shape3.webp" alt="shape3" className="w-[45px] hidden lg:block absolute -top-8 rotate-[-6deg] left-[68px] h-[65px]" /> */}
                <Image
                  height={100}
                  width={100}
                  src="/file3.webp"
                  alt="file3"
                  className="lg:w-24 lg:h-24 h-20 2xl:w-[90px] w-20 md:w-24 md:h-24 "
                />
              </div>
              <div className=" text-center lg:text-left   -mt-2 sm:-mt-4">
                <h3 className="text-white  text-md font-semibold mb-1">
                  Explore Templates and Start Kickstarting Your Project
                </h3>
                <p className="text-gray-300 lg:text-sm text-xs   mb-2">
                  Create your first project, discover tons of templates and generate any video you want.
                </p>
                <button className="px-4 py-2 rounded  text-white text-sm font-medium bg-[#8B43F7]">
                  Explore Project
                </button>
              </div>
            </div>
            <div className="absolute bottom-0">
              <Image height={100}
                width={100} src="/cardshadow3.webp" alt="card-shadow-bg" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Projects Section */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Recent Projects</h2>
          <Link href="/projects">
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {isLoadingProjects ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-[#232327] border-gray-700">
                <CardHeader>
                  <div className="h-4 bg-gray-600 rounded animate-pulse mb-2" />
                  <div className="h-3 bg-gray-700 rounded animate-pulse w-2/3" />
                </CardHeader>
                <CardContent>
                  <div className="h-3 bg-gray-700 rounded animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : recentProjects.length === 0 ? (
          <Card className="bg-[#232327] border-gray-700">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4">
                <Folder className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">No projects yet</h3>
              <p className="text-gray-400 text-center mb-4">
                Create your first project to get started with video creation.
              </p>
              <CreateProjectDialog>
                <Button className="bg-[#8B43F7] hover:bg-[#a366fa] text-white">
                  Create First Project
                </Button>
              </CreateProjectDialog>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentProjects.map((project) => (
              <Card key={project.id} className="bg-[#232327] border-gray-700 hover:border-gray-600 transition-colors">
                <CardHeader>
                  <CardTitle className="text-white text-lg truncate">
                    {project.name}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {project.templateId} • Updated {formatDistanceToNow(new Date(project.updatedAt))} ago
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/intro?projectId=${project.id}`}>
                    <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800">
                      Open Project
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Template />
    </>
  );
}

export default Dashboard;