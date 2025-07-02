import { Button } from "@/components/ui/button";
import { Play, SkipBack, SkipForward } from "lucide-react";
import { Icons } from "../../../assets/Icons";
import Link from "next/link";
import EditorTextPanel from "./components/EditorTextPanel";

export default function Editor() {
    return (
        <>
            <div className="bg-[#111113] p-4">
                <Link href='/dashboard'><Button className=" flex items-center justify-center gap-x-2 cursor-pointer hover:bg-white/30 ease-in-out transition-all px-3 py-2 rounded-lg text-white">
                    <span className="bg-white/30 p-1 backdrop-blur-md rounded-full text-white">
                        <Icons.ArrowLeft className="size-4" />
                    </span>Back</Button>
                </Link>
                <div className="relative h-[calc(100vh-7vh)] flex items-start justify-evenly gap-4">
                    <div className="max-w-4xl w-full flex flex-col gap-6">
                        {/* Video Area */}
                        <div className="bg-[#111] rounded-2xl overflow-hidden shadow-lg">
                            <div className="relative w-full aspect-video bg-black">
                                {/* Placeholder for future Remotion/HTML5 Video */}
                                <video
                                    className="w-full h-full object-cover"
                                    src="/placeholder-video.mp4"
                                    controls={false}
                                    autoPlay={false}
                                    muted
                                />
                                <div className="absolute top-4 left-4 w-5 h-5 border-2 border-[#8B43F7] rounded-full" />
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex flex-col items-center gap-2 w-full">
                            <div className="flex justify-center items-center gap-4">
                                <Button size="icon" variant="ghost" className="text-white">
                                    <SkipBack className="w-5 h-5" />
                                </Button>
                                <Button
                                    size="icon"
                                    className="bg-[#8B43F7] text-white hover:bg-[#8B43F7]/90"
                                >
                                    <Play className="w-5 h-5" />
                                </Button>
                                <Button size="icon" variant="ghost" className="text-white">
                                    <SkipForward className="w-5 h-5" />
                                </Button>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full h-2 mt-3 bg-gray-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#8B43F7]"
                                    style={{ width: "25%" }}
                                ></div>
                            </div>
                        </div>
                    </div>
                    <EditorTextPanel />
                </div>
            </div> {/* closing video/controls wrapper */}
        </>
    );
}
