'use client';

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { Icons } from "../../../assets/Icons";
import Link from "next/link";
import EditorTextPanel, { DefaultTextProps } from "./components/EditorTextPanel";
import VideoPreview from "./components/VideoPreview";
import { TextProps } from "./schema";

export default function Editor() {
    const [textProps, setTextProps] = useState<TextProps>(DefaultTextProps);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration] = useState(5); // 5 seconds video duration
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Effect to handle playback timer
    useEffect(() => {
        if (isPlaying && currentTime < duration) {
            intervalRef.current = setInterval(() => {
                setCurrentTime(prev => {
                    if (prev >= duration) {
                        setIsPlaying(false);
                        return duration;
                    }
                    return prev + 0.1;
                });
            }, 100);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [isPlaying, currentTime]);

    // Control functions
    const togglePlayPause = () => {
        if (currentTime >= duration) {
            setCurrentTime(0);
        }
        setIsPlaying(!isPlaying);
    };

    const skipBackward = () => {
        setCurrentTime(Math.max(0, currentTime - 5));
    };

    const skipForward = () => {
        setCurrentTime(Math.min(duration, currentTime + 5));
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const newTime = (clickX / rect.width) * duration;
        setCurrentTime(Math.max(0, Math.min(duration, newTime)));
    };

    const progressPercentage = (currentTime / duration) * 100;

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
                                <VideoPreview textProps={textProps} isPlaying={isPlaying} currentTime={currentTime} />
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex flex-col items-center gap-2 w-full py-2">
                            <div className="flex justify-center items-center gap-3 sm:gap-6">
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="text-white w-8 h-8 sm:w-10 sm:h-10 hover:bg-white/10"
                                    onClick={skipBackward}
                                >
                                    <SkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
                                </Button>
                                <Button
                                    size="icon"
                                    className="bg-[#8B43F7] text-white hover:bg-[#8B43F7]/90 w-12 h-12 sm:w-14 sm:h-14"
                                    onClick={togglePlayPause}
                                >
                                    {isPlaying ? (
                                        <Pause className="w-5 h-5 sm:w-6 sm:h-6" />
                                    ) : (
                                        <Play className="w-5 h-5 sm:w-6 sm:h-6" />
                                    )}
                                </Button>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="text-white w-8 h-8 sm:w-10 sm:h-10 hover:bg-white/10"
                                    onClick={skipForward}
                                >
                                    <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
                                </Button>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full max-w-2xl h-1.5 sm:h-2 mt-2 sm:mt-3 bg-gray-700 rounded-full overflow-hidden cursor-pointer" onClick={handleProgressClick}>
                                <div
                                    className="h-full bg-[#8B43F7] transition-all duration-300"
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                            </div>

                            {/* Time Display */}
                            <div className="text-white text-xs sm:text-sm opacity-70">
                                {Math.floor(currentTime)}s / {duration}s
                            </div>
                        </div>
                    </div>

                    {/* Settings Panel */}
                    <div className="w-full xl:w-auto xl:min-w-[320px] xl:max-w-[400px]">
                        <EditorTextPanel textProps={textProps} setTextProps={setTextProps} />
                    </div>
                </div>
            </div>
        </>
    );
}
