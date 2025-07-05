"use client";
import { useState, useRef } from "react";
import Link from "next/link.js";
import { Icons } from "../../../../assets/Icons";

export function Navbar() {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  return (
    <header className="flex bg-[#0C0C0E] justify-between items-center py-3 px-4 tracking-wide">
                            <div className="flex items-center justify-center space-x-1">

                                      <img src="/logo.webp"  alt="Logo"  />

      <span className="text-white">Welcome Back, {"name"}</span>
                            </div>

      <div className="flex space-x-3 items-center justify-center relative">
        <Link href="/intro" className="rounded-lg text-white bg-[#8B43F7] px-4 py-2">
          Create
        </Link>

        <div className="p-2 bg-white/30 backdrop-blur-md rounded-md">
          <Icons.Bell className="size-6 text-white" />
        </div>

        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Icons.UserCircle className="w-7 h-7 text-white cursor-pointer" />

          {tooltipVisible && (
            <div className="absolute right-0 top-9 z-50 flex flex-col bg-white text-black shadow-md rounded-md py-2 w-32">
              <Link href="/settings" className="px-4 py-2 hover:bg-gray-100">
                Settings
              </Link>
              <button className="px-4 py-2 text-left hover:bg-gray-100 w-full">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
