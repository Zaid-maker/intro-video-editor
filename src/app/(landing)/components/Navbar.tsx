"use client";
import { useState, useRef } from "react";
import Link from "next/link.js";
import { Icons } from "../../../../assets/Icons";
import { authClient } from "@/lib/auth-client";
import { IMAGES } from "../../../../assets/Images";
import Image from "next/image";
import { useRouter } from "next/navigation";

/**
 * Renders a fixed navigation bar that displays a logo, a personalized welcome message, and user-specific navigation options for authenticated users.
 *
 * Shows a "Create Project" link and a user icon with a hover-activated tooltip containing a logout button. Handles user session state, displays navigation options based on authentication, and redirects to the sign-in page upon logout.
 *
 * Returns `null` while session data is loading or if no user is authenticated.
 */
export default function Navbar() {
  const router = useRouter()
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { data, isPending , error } = authClient.useSession();
if(error) {
  console.log(error)
}
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

  if (isPending || !data?.user) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push('/sign-in');
          },
        },
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    
    <header className="fixed top-0 left-0 right-0 z-50 flex bg-[#0C0C0E] justify-between items-center py-4 px-6 tracking-wide border-b border-white/10">
      <div className="flex items-center space-x-4">
        <Image
          height={24}
          width={25}
          src={IMAGES.logo}
          alt="Logo"
        />
        {data?.user && (
          <span className="text-white font-medium">Welcome Back, {data.user.name}</span>
        )}
      </div>

      <div className="flex space-x-4 items-center">
        {data?.user  && (
          <>
            <Link
              href="/dashboard"
              className="bg-[#8B43F7] hover:bg-[#7A3DE6] text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 shadow-lg"
            >
              Create Project
            </Link>

            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 cursor-pointer">
                <Icons.UserCircle className="size-6 text-white" />
              </div>

              {tooltipVisible && (
                <div className="absolute right-0 cursor-pointer top-12 z-50 bg-white text-black shadow-xl rounded-lg py-2 w-28 border border-gray-200">
                  <button onClick={handleLogout} className="flex items-center px-4 py-2.5 hover:bg-gray-50 transition-colors duration-150 w-full text-left">
                    <Icons.LogOut className="size-4 mr-3 text-gray-600" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) }
      </div>
    </header>
  );


}