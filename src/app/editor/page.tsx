import { Button } from "@/components/ui/button";
import { Play, SkipBack, SkipForward } from "lucide-react";
import { Icons } from "../../../assets/Icons";
import Link from "next/link";
import EditorTextPanel from "./components/EditorTextPanel";

export default function Editor() {
    return (
        <>
            <div className="bg-[#111113] p-2 sm:p-4 min-h-screen">
                <Link href='/dashboard'>
                    <Button className="flex items-center justify-center gap-x-2 cursor-pointer hover:bg-white/30 ease-in-out transition-all px-3 py-2 rounded-lg text-white mb-4">
                        <span className="bg-white/30 p-1 backdrop-blur-md rounded-full text-white">
                            <Icons.ArrowLeft className="size-4" />
                        </span>
                        Back
                    </Button>
                </Link>

                <div className="flex flex-col xl:flex-row gap-4 sm:gap-6 h-[calc(100vh-120px)]">
                    {/* Video Section */}
                    <div className="flex-1 flex flex-col gap-3 sm:gap-4 min-w-0">
                        {/* Video Area */}
                        <div className="bg-[#111] rounded-lg sm:rounded-2xl overflow-hidden shadow-lg flex-1">
                            <div className="relative w-full h-full min-h-[200px] sm:min-h-[300px] lg:min-h-[400px] bg-black">
                                {/* Placeholder for future Remotion/HTML5 Video */}
                                <video
                                    className="w-full h-full object-cover"
                                    src="/placeholder-video.mp4"
                                    controls={false}
                                    autoPlay={false}
                                    muted
                                />
                                <div className="absolute top-2 sm:top-4 left-2 sm:left-4 w-4 h-4 sm:w-5 sm:h-5 border-2 border-[#8B43F7] rounded-full" />
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex flex-col items-center gap-2 w-full py-2">
                            <div className="flex justify-center items-center gap-3 sm:gap-6">
                                <Button size="icon" variant="ghost" className="text-white w-8 h-8 sm:w-10 sm:h-10 hover:bg-white/10">
                                    <SkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
                                </Button>
                                <Button
                                    size="icon"
                                    className="bg-[#8B43F7] text-white hover:bg-[#8B43F7]/90 w-12 h-12 sm:w-14 sm:h-14"
                                >
                                    <Play className="w-5 h-5 sm:w-6 sm:h-6" />
                                </Button>
                                <Button size="icon" variant="ghost" className="text-white w-8 h-8 sm:w-10 sm:h-10 hover:bg-white/10">
                                    <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
                                </Button>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full max-w-2xl h-1.5 sm:h-2 mt-2 sm:mt-3 bg-gray-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#8B43F7] transition-all duration-300"
                                    style={{ width: "25%" }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* Settings Panel */}
                    <div className="w-full xl:w-auto xl:min-w-[320px] xl:max-w-[400px]">
                        <EditorTextPanel />
                    </div>
                </div>
            </div>
        </>
    );
}