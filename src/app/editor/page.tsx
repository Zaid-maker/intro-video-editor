"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Pause, Play, SkipBack, SkipForward } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import EditorTextPanel, {
	DefaultTextProps,
} from "./components/EditorTextPanel";
import VideoPreview from "./components/VideoPreview";
import type { TextProps } from "./schema";

export default function Editor() {
	const [textProps, setTextProps] = useState<TextProps>(DefaultTextProps);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const duration = textProps.videoDuration; // Use duration from settings
	const [isLoading, setIsLoading] = useState(false);
	const [projectId, setProjectId] = useState<string | null>(null);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const searchParams = useSearchParams();

	// Effect to load project from URL parameter
	useEffect(() => {
		const projectIdFromUrl = searchParams.get("projectId");
		if (projectIdFromUrl) {
			setProjectId(projectIdFromUrl);
			loadProject(projectIdFromUrl);
		}
	}, [searchParams]);

	// Function to load project data
	const loadProject = async (id: string) => {
		setIsLoading(true);
		try {
			const response = await fetch(`/api/projects/${id}`);
			if (!response.ok) {
				throw new Error("Failed to load project");
			}
			const result = await response.json();
			if (result.type === "success") {
				// Update text properties with project data
				setTextProps({
					...DefaultTextProps,
					...result.data.properties,
					templateId: result.data.templateId,
				});
				toast.success("Project loaded successfully!");
			} else {
				throw new Error(result.message || "Failed to load project");
			}
		} catch (error) {
			console.error("Error loading project:", error);
			const errorMessage =
				error instanceof Error ? error.message : "An unexpected error occurred";
			toast.error(`Failed to load project: ${errorMessage}`);
		} finally {
			setIsLoading(false);
		}
	};

	// Effect to handle playback timer
	useEffect(() => {
		if (isPlaying && currentTime < duration) {
			intervalRef.current = setInterval(() => {
				setCurrentTime((prev) => {
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
			<div className="bg-[#111113] pt-20 min-h-screen">
				<div className="flex flex-col xl:flex-row gap-4 sm:gap-6 h-[calc(100vh-120px)]">
					{/* Video Section */}
					<div className="flex-1 flex flex-col gap-3 sm:gap-4 min-w-0">
						{/* Video Area */}
						<div className="bg-[#111] rounded-lg sm:rounded-2xl overflow-hidden shadow-lg flex-1">
							<div className="relative w-full h-full min-h-[200px] sm:min-h-[300px] lg:min-h-[400px] bg-black">
								{/* Loading indicator */}
								{isLoading && (
									<div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
										<div className="flex items-center gap-2 text-white">
											<Loader2 className="w-6 h-6 animate-spin" />
											<span>Loading project...</span>
										</div>
									</div>
								)}
								{/* Placeholder for future Remotion/HTML5 Video */}
								<VideoPreview
									textProps={textProps}
									isPlaying={isPlaying}
									currentTime={currentTime}
								/>
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
							<div
								className="w-full max-w-2xl h-1.5 sm:h-2 mt-2 sm:mt-3 bg-gray-700 rounded-full overflow-hidden cursor-pointer"
								onClick={handleProgressClick}
							>
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
						<EditorTextPanel
							textProps={textProps}
							setTextProps={setTextProps}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
