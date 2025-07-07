"use client";
import { useState, useRef } from "react";
import Link from "next/link.js";
import { Icons } from "../../../../assets/Icons";
import { authClient } from "@/lib/auth-client";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { data } = authClient.useSession();

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    } setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setTooltipVisible(false);
    }, 200);
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logout");
    setTooltipVisible(false);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <header className="hidden md:flex bg-[#0C0C0E] justify-between items-center py-4 px-6 border-b border-white/10">
        {/* Logo & Welcome */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#8B43F7] to-[#6B2FE8] rounded-lg flex items-center justify-center">
              <Icons.Video className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-semibold text-lg">VideoGen</span>
          </div>
          <div className="h-4 w-px bg-white/20" />
          <span className="text-white/70 text-sm">
            {data?.user ? `Welcome back, ${data.user.name}` : "Welcome Guest"}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <Link
            href="/intro"
            className="flex items-center space-x-2 bg-gradient-to-r from-[#8B43F7] to-[#6B2FE8] hover:from-[#7A3AE6] hover:to-[#5A28D7] px-5 py-2.5 rounded-lg text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Icons.Video className="w-4 h-4" />
            <span>Create Video</span>
          </Link>

          <button className="relative p-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-all duration-200">
            <Icons.Bell className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#8B43F7] rounded-full animate-pulse" />
          </button>

          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button className="p-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-all duration-200">
              <Icons.UserCircle className="w-5 h-5 text-white" />
            </button>

            {tooltipVisible && (
              <div className="absolute right-0 top-12 z-50 bg-[#1A1A1D] border border-white/10 shadow-xl rounded-lg py-2 w-40 backdrop-blur-sm">
                <Link
                  href="/settings"
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                >
                  <Icons.Settings className="w-4 h-4" />
                  <span>Settings</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-white/10 text-white/70 hover:text-white transition-colors w-full text-left"
                >
                  <Icons.LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden flex bg-[#0C0C0E] justify-between items-center py-4 px-4 border-b border-white/10">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <Icons.PanelLeft className="w-6 h-6 text-white" />
        </button>

        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gradient-to-br from-[#8B43F7] to-[#6B2FE8] rounded-md flex items-center justify-center">
            <Icons.Video className="w-3 h-3 text-white" />
          </div>
          <span className="text-white font-semibold">VideoGen</span>
        </div>

        <button className="relative p-2 hover:bg-white/10 rounded-lg transition-colors">
          <Icons.Bell className="w-5 h-5 text-white" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#8B43F7] rounded-full animate-pulse" />
        </button>
      </header>

      {/* Mobile Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </>
  );
}
