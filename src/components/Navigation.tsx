'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Home, Folder, Video, User } from 'lucide-react';
import { CreateProjectDialog } from '@/components/CreateProjectDialog';

export function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/projects', label: 'My Projects', icon: Folder },
    { href: '/intro', label: 'Editor', icon: Video },
  ];

  return (
    <nav className="bg-[#0C0C0E] border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#8B43F7] rounded-lg flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Intro Editor</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={`text-gray-300 hover:text-white hover:bg-gray-800 ${
                      isActive ? 'bg-gray-800 text-white' : ''
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <CreateProjectDialog>
              <Button size="sm" className="bg-[#8B43F7] hover:bg-[#a366fa] text-white">
                New Project
              </Button>
            </CreateProjectDialog>
            
            {/* Profile placeholder */}
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-800 py-2">
          <div className="flex items-center justify-around">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`text-gray-300 hover:text-white flex flex-col items-center gap-1 h-auto py-2 ${
                      isActive ? 'text-[#8B43F7]' : ''
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-xs">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
