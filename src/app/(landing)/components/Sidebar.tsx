"use client";

import Image from "next/image";
import { Icons } from "../../../../assets/Icons";
import Link from "next/link";

export default function Sidebar() {
    return (
        <div className="w-14 h-screen bg-[#0C0C0E] flex flex-col justify-between items-center py-4">
            {/* Top section */}
            <div className="flex flex-col items-center space-y-5">
               <Link href='/'>
                <Image src="/logo.webp" alt="logo" width={25} height={24} className="mt-1"/>
               </Link>
                <div className=" mt-6 space-y-4">

                    <div className="p-2  rounded-full bg-white/30 backdrop-blur-md">
                        <Icons.Plus className="text-white w-6 h-6 " />
                    </div>

                    <Icons.Blocks className="text-gray-600 ml-2 w-6 h-6" />
                    <div className="p-2  rounded-full bg-white/30 backdrop-blur-md">
                        <Icons.PanelLeft className="text-white w-6 h-6" />
                    </div>
                    <Icons.Mail className="text-gray-600 ml-2 w-6 h-6" />
                    <Icons.Power className="text-gray-600 ml-2 w-6 h-6" />
                    <Icons.BookOpen className="text-gray-600 ml-2 w-6 h-6" />
                </div>
            </div>

            {/* Bottom section */}
            <div className="flex flex-col items-center space-y-5">
                <Icons.Chrome className="text-gray-600 w-6 h-6" />
                <Icons.Headset className="text-gray-600 w-6 h-6" />
                <Icons.Settings className="text-gray-600 w-6 h-6" />
            </div>
        </div>
    );
}
