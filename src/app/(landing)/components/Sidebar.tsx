"use client";

import { Icons } from "../../../../assets/Icons";

export default function Sidebar() {
    return (
        <div className="w-14 h-screen bg-black flex flex-col justify-between items-center py-4">
            {/* Top section */}
            <div className="flex flex-col items-center space-y-5">
                <span className="text-gray-600 text-xs">logo</span>
                <div className=" mt-6 space-y-4">

                    <div className="p-2  rounded-full bg-white/30 backdrop-blur-md">
                        <Icons.Plus className="text-white w-6 h-6" />
                    </div>

                    <Icons.Blocks className="text-gray-600 ml-1 w-6 h-6" />
                    <div className="p-2  rounded-full bg-white/30 backdrop-blur-md">
                        <Icons.PanelLeft className="text-white w-6 h-6" />
                    </div>
                    <Icons.Mail className="text-gray-600 ml-1 w-6 h-6" />
                    <Icons.Power className="text-gray-600 ml-1 w-6 h-6" />
                    <Icons.BookOpen className="text-gray-600 ml-1 w-6 h-6" />
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
