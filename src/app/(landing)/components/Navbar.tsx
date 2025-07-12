"use client";
import { useState, useRef } from "react";
import Link from "next/link.js";
import { Icons } from "../../../../assets/Icons";
import { authClient } from "@/lib/auth-client";
import { IMAGES } from "../../../../assets/Images";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CreateProjectDialog } from "@/components/CreateProjectDialog";

/**
 * Renders a fixed navigation bar that displays a logo, a personalized welcome message, and user-specific navigation options for authenticated users.
 *
 * Shows a "Create Project" link and a user icon with a hover-activated tooltip containing a logout button. Handles user session state, displays navigation options based on authentication, and redirects to the sign-in page upon logout.
 *
 * Returns `null` while session data is loading or if no user is authenticated.
 */
export default function Navbar() {
  const router = useRouter()
  const pathName = usePathname()
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { data, isPending } = authClient.useSession();

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
        <Link href={'/dashboard'}>
          <Image
            height={24}
            width={25}
            src={IMAGES.logo}
            alt="Logo"
          />
        </Link>
        {
          pathName === '/dashboard' ? (
            <>

              {data?.user && (
                <span className="text-white font-medium lg:text-md text-xs">Welcome Back, {data.user.name}</span>
              )}

            </>
          ) :
            (
              <>
                <div className="flex items-center justify-between ">
                  <Link href='/dashboard'>
                    <Button className="flex items-center justify-center gap-x-2 cursor-pointer  hover:bg-gradient-to-tr backdrop-blur-lg from-[#ffffff]/30  via-transparent to-[#1C1B20]/50 ease-in-out transition-all px-3 py-2 rounded-lg text-white">
                      <span className="bg-white/30 p-1 backdrop-blur-md rounded-full text-white">
                        <Icons.ArrowLeft className="size-4" />
                      </span>
                      Back
                    </Button>
                  </Link>

                </div>
              </>
            )
        }
      </div>
      {
        pathName === '/editor' ? (
          <>
            <div className="flex items-center space-x-4">
              <CreateProjectDialog>

              <Button className="flex items-center justify-center gap-x-2 cursor-pointer  bg-gradient-to-tr backdrop-blur-lg from-[#ffffff]/30  via-transparent to-[#1C1B20]/50 ease-in-out transition-all px-3 py-2 rounded-lg text-white">
               
                Change Template
              </Button>
              </CreateProjectDialog>
              <Link
                href="/dashboard"
                className="bg-[#8B43F7] hover:bg-[#7A3DE6] text-white lg:px-6 px-3 lg:py-2.5 py-1 rounded-lg whitespace-nowrap"
              >
                Save
              </Link>



            </div>

          </>
        ) :
          (
            <>
              <div className="flex space-x-4 items-center">
                {data?.user && (
                  <>
                    <Link
                      href="/dashboard"
                      className="bg-[#8B43F7] hover:bg-[#7A3DE6] text-white lg:px-6 px-3 lg:py-2.5 py-1 rounded-lg whitespace-nowrap"
                    >
                      Create
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
                )}
              </div>
            </>
          )
      }

    </header>
  );


}