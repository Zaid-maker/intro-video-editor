"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Icons } from "../../../../assets/Icons";
import { IMAGES } from "../../../../assets/Images";
import { useRouter } from "next/navigation";

const LandingPageNavbar = () => {
  const router = useRouter();
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { data, isPending, error } = authClient.useSession();
  if (error) {
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

  if (isPending) {
    return <div className="px-6 py-4 bg-[#0C0C0E] border-b border-white/10" />;
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
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 bg-[#0C0C0E] border-b border-white/10">
      {/* Left Side: Logo */}
      <div>
        <Image
          src={IMAGES.logo} // Ensure this path points to your logo in the public folder
          alt="Logo"
          height={24}
          width={25}
        />
      </div>

      <div className="flex space-x-4 items-center">
        {data?.user && (
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
                <div className="absolute right-0  top-12 z-50 bg-white text-black shadow-xl rounded-lg py-2 w-28 border border-gray-200">
                  <button onClick={handleLogout} className="flex cursor-pointer items-center px-4 py-2.5 hover:bg-gray-50 transition-colors duration-150 w-full text-left">
                    <Icons.LogOut className="size-4 mr-3 text-gray-600" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
        {!data?.user &&
          (
            <div className="flex space-x-4">
              <Link
                href="/sign-in"
                className="text-white px-6 py-2.5 rounded-lg font-medium hover:bg-white/10 transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                href="/sign-up"
                className="bg-[#8B43F7] hover:bg-[#7A3DE6] text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 shadow-lg"
              >
                Sign Up
              </Link>
            </div>)}

      </div>

      {/* Right Side: Login and Sign Up Buttons
      <div className="flex space-x-4 items-center">
        {data?.user && (
          
        )}
      </div> */}
    </header>
  );
};

export default LandingPageNavbar;
