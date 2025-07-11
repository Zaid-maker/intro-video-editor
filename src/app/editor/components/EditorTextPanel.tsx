import type React from "react";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Upload, Volume2, Music, Image } from "lucide-react";
import {
	FONT_WEIGHTS,
	FONTS,
	FONT_SIZES,
	COLORS,
	TRANSITIONS,
	templates,
} from "@/lib/data";
import type { TextProps } from "../schema";
import { toast } from "sonner";

export const DefaultTextProps: TextProps = {
	templateId: "Typewriter",
	text: "Your Text Here",
	title: "Default Title - Change Me",
	body: "Default body text goes here. You can edit this to add your own content.",
	reviewTitle: "",
	reviewBody: "",
	fontFamily: FONTS[0],
	fontWeight: FONT_WEIGHTS[2].value, // Default to 'Regular'
	fontSize: 70,
	color: "#ffffff",
	backgroundColor: "#000000",
	letterSpacing: 5,
	opacity: 100,
	textAlign: "center",
	animationType: "fade",
	transition: "ease",
	duration: 3,
	speed: 5,
	fadeType: "simple",
	slideType: "simple",
	direction: "left",
	easing: "easeOut",
	rotationEffect: false,
	scaleEffect: false,
	colorShift: false,
	glowEffect: false,
	particleEffect: false,
	positionX: 0,
	positionY: 0,
	backgroundMedia: "none",
	backgroundMediaType: "image",
	backgroundMediaOpacity: 100,
	backgroundMusic: "none",
	musicVolume: 70,
	videoDuration: 5,
	videoQuality: "1080p",
	aspectRatio: "16:9",
};

export type EditorTextPanelProps = {
	textProps: TextProps;
	setTextProps: React.Dispatch<React.SetStateAction<TextProps>>;
};

export default function EditorTextPanel({
	textProps,
	setTextProps,
}: EditorTextPanelProps) {
	const [isDragOver, setIsDragOver] = useState(false);
	const [isUploading, setIsUploading] = useState(false);

	const handleFileUpload = (file: File) => {
		// Prevent multiple simultaneous uploads
		if (isUploading) {
			toast.warning("Please wait for the current upload to complete.");
			return;
		}

		// File size limits (in bytes)
		const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB for images
		const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB for videos

		// Allowed MIME types
		const ALLOWED_IMAGE_TYPES = [
			"image/jpeg",
			"image/jpg",
			"image/png",
			"image/gif",
			"image/webp",
			"image/bmp",
		];

		const ALLOWED_VIDEO_TYPES = [
			"video/mp4",
			"video/webm",
			"video/ogg",
			"video/avi",
			"video/mov",
			"video/wmv",
		];

		// Validate file type
		const isValidImage = ALLOWED_IMAGE_TYPES.includes(file.type);
		const isValidVideo = ALLOWED_VIDEO_TYPES.includes(file.type);

		if (!isValidImage && !isValidVideo) {
			toast.error(
				`Unsupported file type: ${file.type}. Please use supported image (JPEG, PNG, GIF, WebP) or video (MP4, WebM, OGG) formats.`,
			);
			return;
		}

		// Validate file size
		if (isValidImage && file.size > MAX_IMAGE_SIZE) {
			toast.error(
				`Image file too large. Maximum size is ${MAX_IMAGE_SIZE / (1024 * 1024)}MB. Your file is ${(file.size / (1024 * 1024)).toFixed(1)}MB.`,
			);
			return;
		}

		if (isValidVideo && file.size > MAX_VIDEO_SIZE) {
			toast.error(
				`Video file too large. Maximum size is ${MAX_VIDEO_SIZE / (1024 * 1024)}MB. Your file is ${(file.size / (1024 * 1024)).toFixed(1)}MB.`,
			);
			return;
		}

		// Additional validation for file name
		if (file.name.length > 255) {
			toast.error(
				"File name too long. Please rename the file to less than 255 characters.",
			);
			return;
		}

		// Process the validated file
		setIsUploading(true);

		if (isValidImage) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setTextProps((prev) => ({
					...prev,
					backgroundMedia: e.target?.result as string,
					backgroundMediaType: "image",
				}));
				toast.success("Image uploaded successfully!");
				setIsUploading(false);
			};
			reader.onerror = () => {
				toast.error("Failed to read image file. Please try again.");
				setIsUploading(false);
			};
			reader.readAsDataURL(file);
		} else if (isValidVideo) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setTextProps((prev) => ({
					...prev,
					backgroundMedia: e.target?.result as string,
					backgroundMediaType: "video",
				}));
				toast.success("Video uploaded successfully!");
				setIsUploading(false);
			};
			reader.onerror = () => {
				toast.error("Failed to read video file. Please try again.");
				setIsUploading(false);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragOver(false);
		const files = Array.from(e.dataTransfer.files);
		if (files.length > 0) {
			handleFileUpload(files[0]);
		}
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragOver(true);
	};

	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragOver(false);
	};

	const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files && files.length > 0) {
			handleFileUpload(files[0]);
		}
	};
	return (
		<div className="bg-[#0C0C0E] text-white w-full lg:w-80 xl:w-96 p-3 sm:p-4 rounded-lg sm:rounded-xl space-y-3 sm:space-y-4 h-fit max-h-[calc(100vh-120px)] custom-scrollbar overflow-y-auto">
			<Tabs defaultValue="text">
				<TabsList className="w-full justify-start gap-1 sm:gap-2 bg-[#1c1c1e] p-1 rounded-md">
					<TabsTrigger
						value="text"
						className="text-xs sm:text-sm   py-1.5  data-[state=active]:border data-[state=active]:shadow-lg data-[state=active]:border-black data-[state=active]:bg-gradient-to-tr backdrop-blur-lg from-[#ffffff]/30  via-transparent to-[#1C1B20]/70 data-[state=active]:text-white"
					>
						Text
					</TabsTrigger>

					<TabsTrigger
						value="style"
						className="text-xs sm:text-sm data-[state=active]:shadow-lg   py-1.5  data-[state=active]:border data-[state=active]:border-black data-[state=active]:bg-gradient-to-tr backdrop-blur-lg from-[#ffffff]/30  via-transparent to-[#1C1B20]/70 data-[state=active]:text-white"
					>
						Style
					</TabsTrigger>

					<TabsTrigger
						value="media"
						className="text-xs sm:text-sm   py-1.5  data-[state=active]:border data-[state=active]:shadow-lg data-[state=active]:border-black data-[state=active]:bg-gradient-to-tr backdrop-blur-lg from-[#ffffff]/30  via-transparent to-[#1C1B20]/70 data-[state=active]:text-white"
					>
						Media
					</TabsTrigger>
				</TabsList>

				<TabsContent
					value="text"
					className="space-y-4 sm:space-y-6 pt-3 sm:pt-4"
				>
					{/* Template Selection */}
					<div className="space-y-2">
						<h3 className="text-xs sm:text-sm text-muted-foreground">
							Template
						</h3>
						<div>
							<Label htmlFor="template-select" className="text-xs mb-2">
								Choose Template
							</Label>
							<Select
								value={textProps.templateId}
								onValueChange={(value) => {
									setTextProps((prev) => ({ ...prev, templateId: value }));
								}}
							>
								<SelectTrigger className="mt-1 bg-[#1c1c1e] text-white border border-[#2c2c2e] text-xs sm:text-sm">
									<SelectValue placeholder="Select template" />
								</SelectTrigger>
								<SelectContent>
									{templates.map((template) => (
										<SelectItem
											className="bg-gray-600 text-white text-xs sm:text-sm"
											key={template.id}
											value={template.id}
										>
											{template.id}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>

					{/* Main Text */}
					<div className="space-y-2">
						<h3 className="text-xs sm:text-sm text-muted-foreground">
							Main Text
						</h3>
						<div>
							<Label htmlFor="main-text" className="text-xs mb-2">
								Text Content
							</Label>
							<Input
								id="main-text"
								placeholder="Your text here"
								className="mt-1 bg-[#1c1c1e] text-white border border-[#2c2c2e] text-xs sm:text-sm"
								value={textProps.text}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									setTextProps((prev) => ({ ...prev, text: e.target.value }));
								}}
							/>
						</div>
					</div>

					{/* Content 1 */}
					<div className="space-y-2">
						<h3 className="text-xs sm:text-sm text-muted-foreground">
							Additional Content
						</h3>
						<div>
							<Label htmlFor="content1-title" className="text-xs mb-2">
								Title (Optional)
							</Label>
							<Input
								id="content1-title"
								placeholder="Title text"
								className="mt-1 bg-[#1c1c1e] text-white border border-[#2c2c2e] text-xs sm:text-sm"
								value={textProps.title || ""}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									setTextProps((prev) => ({ ...prev, title: e.target.value }));
								}}
							/>
						</div>
						<div>
							<Label htmlFor="content1-body" className="text-xs mb-2">
								Body Text (Optional)
							</Label>
							<Textarea
								id="content1-body"
								placeholder="Body text"
								className="mt-1 bg-[#1c1c1e] text-white border border-[#2c2c2e] text-xs sm:text-sm resize-none"
								rows={3}
								value={textProps.body || ""}
								onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
									setTextProps((prev) => ({ ...prev, body: e.target.value }));
								}}
							/>
						</div>
					</div>

					{/* Content 2 */}
					<div className="space-y-2">
						<h3 className="text-xs sm:text-sm text-muted-foreground">
							Content 2
						</h3>
						<div>
							<Label htmlFor="content2-title" className="text-xs mb-2">
								Review Title
							</Label>
							<Input
								id="content2-title"
								placeholder="Text"
								className="mt-1 bg-[#1c1c1e] text-white border border-[#2c2c2e] text-xs sm:text-sm"
								value={textProps.reviewTitle || ""}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									setTextProps((prev) => ({
										...prev,
										reviewTitle: e.target.value,
									}));
								}}
							/>
						</div>
						<div>
							<Label htmlFor="content2-body" className="text-xs mb-2">
								Review Body
							</Label>
							<Textarea
								id="content2-body"
								placeholder="Text"
								className="mt-1 bg-[#1c1c1e] text-white border border-[#2c2c2e] text-xs sm:text-sm resize-none"
								rows={3}
								value={textProps.reviewBody || ""}
								onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
									setTextProps((prev) => ({
										...prev,
										reviewBody: e.target.value,
									}));
								}}
							/>
						</div>
					</div>

					{/* Font Properties */}
					<div className="space-y-3">
						<h3 className="text-xs sm:text-sm text-muted-foreground">
							Font Properties
						</h3>

						{/* Font Family and Weight - Side by side on larger screens */}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
							<div>
								<Label htmlFor="font-family" className="text-xs mb-2">
									Font Family
								</Label>
								<Select
									value={textProps.fontFamily}
									onValueChange={(value) => {
										setTextProps((prev) => ({ ...prev, fontFamily: value }));
									}}
								>
									<SelectTrigger className="mt-1 bg-[#1c1c1e] text-white border border-[#2c2c2e] text-xs sm:text-sm">
										<SelectValue placeholder="Select font" />
									</SelectTrigger>
									<SelectContent>
										{FONTS.map((font) => (
											<SelectItem
												className="bg-gray-600 text-white text-xs sm:text-sm"
												key={font}
												value={font}
											>
												{font}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							<div>
								<Label htmlFor="font-weight" className="text-xs mb-2">
									Font Weight
								</Label>
								<Select
									value={textProps.fontWeight}
									onValueChange={(value) => {
										setTextProps((prev) => ({ ...prev, fontWeight: value }));
									}}
								>
									<SelectTrigger className="mt-1 bg-[#1c1c1e] text-white border border-[#2c2c2e] text-xs sm:text-sm">
										<SelectValue placeholder="Select weight" />
									</SelectTrigger>
									<SelectContent>
										{FONT_WEIGHTS.map(({ label, value }) => (
											<SelectItem
												key={value}
												value={value}
												className="bg-gray-600 text-white text-xs sm:text-sm"
											>
												{label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>

						<div>
							<Label className="text-xs mb-2">Font Size</Label>
							<div className="grid grid-cols-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-1 sm:gap-2 mt-1">
								{FONT_SIZES.map((size) => (
									<button
										key={size}
										className={`text-xs px-1.5 sm:px-2 py-1 rounded transition-colors ${
											textProps.fontSize === parseInt(size)
												? "bg-[#8B43F7] text-white"
												: "bg-[#2c2c2e] text-white hover:bg-[#3a3a3c]"
										}`}
										onClick={() =>
											setTextProps((prev) => ({
												...prev,
												fontSize: parseInt(size),
											}))
										}
									>
										{size}px
									</button>
								))}
							</div>
						</div>

						<div>
							<Label className="text-xs mb-2">Letter Spacing</Label>
							<div className="flex items-center gap-2 sm:gap-3">
								<Slider
									value={[textProps.letterSpacing]}
									min={0}
									max={20}
									step={1}
									className="flex-1 bg-white text-[#8B43F7]"
									onValueChange={(v: number[]) => {
										setTextProps((prev) => ({ ...prev, letterSpacing: v[0] }));
									}}
								/>
								<span className="text-xs text-muted-foreground min-w-[40px]">
									{textProps.letterSpacing}px
								</span>
							</div>
						</div>

						<div>
							<Label className="text-xs mb-2">Font Color</Label>
							<div className="grid grid-cols-8 gap-1 sm:gap-1.5 mt-1">
								{COLORS.map((color, i) => (
									<div
										key={i}
										className="w-5 h-5 sm:w-6 sm:h-6 rounded-full cursor-pointer border border-gray-600 hover:scale-110 transition-transform"
										style={{ backgroundColor: color }}
										onClick={() =>
											setTextProps((prev) => ({ ...prev, color: color }))
										}
									/>
								))}
							</div>
						</div>
					</div>
				</TabsContent>

				{/* Style Tab */}
				<TabsContent
					value="style"
					className="space-y-4 sm:space-y-6 pt-3 sm:pt-4"
				>
					{/* Background */}
					<div className="space-y-3">
						<h3 className="text-xs sm:text-sm text-muted-foreground">
							Background
						</h3>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
							<div>
								<Label className="text-xs mb-2">Background Color</Label>
								<div className="grid grid-cols-6 gap-1 mt-1">
									{COLORS.slice(0, 6).map((color, i) => (
										<div
											key={i}
											className="w-6 h-6 rounded cursor-pointer border border-gray-600 hover:scale-110 transition-transform"
											style={{ backgroundColor: color }}
											onClick={() =>
												setTextProps((prev) => ({
													...prev,
													backgroundColor: color,
												}))
											}
										/>
									))}
								</div>
							</div>
							<div>
								<Label className="text-xs mb-2">Opacity</Label>
								<div className="flex items-center gap-2">
									<Slider
										value={[textProps.opacity]}
										min={0}
										max={100}
										step={5}
										className="flex-1"
										onValueChange={(v: number[]) => {
											setTextProps((prev) => ({ ...prev, opacity: v[0] }));
										}}
									/>
									<span className="text-xs text-muted-foreground min-w-[35px]">
										{textProps.opacity}%
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Animation */}
					<div className="space-y-3">
						<h3 className="text-xs sm:text-sm text-muted-foreground">
							Animation
						</h3>

						{/* Template-specific animation controls */}
						{textProps.templateId === "FadeInText" && (
							<div>
								<Label className="text-xs mb-2">Fade Type</Label>
								<Select
									value={textProps.fadeType}
									onValueChange={(value: any) => {
										setTextProps((prev) => ({ ...prev, fadeType: value }));
									}}
								>
									<SelectTrigger className="mt-1 bg-[#1c1c1e] text-white border border-[#2c2c2e] text-xs sm:text-sm">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{[
											"simple",
											"letterByLetter",
											"wordByWord",
											"particles",
											"blur",
											"wave",
										].map((type) => (
											<SelectItem
												key={type}
												value={type}
												className="bg-gray-600 text-white text-xs sm:text-sm"
											>
												{type}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						)}

						{textProps.templateId === "SlideInText" && (
							<>
								<div>
									<Label className="text-xs mb-2">Slide Type</Label>
									<Select
										value={textProps.slideType}
										onValueChange={(value: any) => {
											setTextProps((prev) => ({ ...prev, slideType: value }));
										}}
									>
										<SelectTrigger className="mt-1 bg-[#1c1c1e] text-white border border-[#2c2c2e] text-xs sm:text-sm">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											{[
												"simple",
												"elastic",
												"cascade",
												"wave",
												"flip3d",
												"parallax",
											].map((type) => (
												<SelectItem
													key={type}
													value={type}
													className="bg-gray-600 text-white text-xs sm:text-sm"
												>
													{type}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
								<div>
									<Label className="text-xs mb-2">Direction</Label>
									<Select
										value={textProps.direction}
										onValueChange={(value: any) => {
											setTextProps((prev) => ({ ...prev, direction: value }));
										}}
									>
										<SelectTrigger className="mt-1 bg-[#1c1c1e] text-white border border-[#2c2c2e] text-xs sm:text-sm">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											{[
												"left",
												"right",
												"top",
												"bottom",
												"diagonal",
												"spiral",
												"zoom",
											].map((dir) => (
												<SelectItem
													key={dir}
													value={dir}
													className="bg-gray-600 text-white text-xs sm:text-sm"
												>
													{dir}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							</>
						)}

						{textProps.templateId === "Typewriter" && (
							<div>
								<Label className="text-xs mb-2">Typing Speed</Label>
								<div className="flex items-center gap-2">
									<Slider
										value={[textProps.speed]}
										min={1}
										max={10}
										step={1}
										className="flex-1 bg-white"
										onValueChange={(v: number[]) => {
											setTextProps((prev) => ({ ...prev, speed: v[0] }));
										}}
									/>
									<span className="text-xs text-muted-foreground min-w-[30px]">
										{textProps.speed}
									</span>
								</div>
							</div>
						)}

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
							<div>
								<Label className="text-xs mb-2">Easing</Label>
								<Select
									value={textProps.easing}
									onValueChange={(value: any) => {
										setTextProps((prev) => ({ ...prev, easing: value }));
									}}
								>
									<SelectTrigger className="mt-1 bg-[#1c1c1e] text-white border border-[#2c2c2e] text-xs sm:text-sm">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{[
											"linear",
											"easeIn",
											"easeOut",
											"easeInOut",
											"bounce",
											"elastic",
										].map((easing) => (
											<SelectItem
												key={easing}
												value={easing}
												className="bg-gray-600 text-white text-xs sm:text-sm"
											>
												{easing}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							<div>
								<Label className="text-xs mb-2">Transition</Label>
								<Select
									value={textProps.transition}
									onValueChange={(value) => {
										setTextProps((prev) => ({ ...prev, transition: value }));
									}}
								>
									<SelectTrigger className="mt-1 bg-[#1c1c1e] text-white border border-[#2c2c2e] text-xs sm:text-sm">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{TRANSITIONS.map((transition) => (
											<SelectItem
												key={transition}
												value={transition}
												className="bg-gray-600 text-white text-xs sm:text-sm"
											>
												{transition}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>
						<div>
							<Label className="text-xs mb-2">Duration (seconds)</Label>
							<div className="flex items-center gap-2">
								<Slider
									value={[textProps.duration]}
									min={0.5}
									max={10}
									step={0.1}
									className="flex-1 bg-white"
									onValueChange={(v: number[]) => {
										setTextProps((prev) => ({ ...prev, duration: v[0] }));
									}}
								/>
								<span className="text-xs text-muted-foreground min-w-[35px]">
									{textProps.duration.toFixed(1)}s
								</span>
							</div>
						</div>

						{/* Effect Toggles */}
						<div>
							<Label className="text-xs mb-2">Effects</Label>
							<div className="grid grid-cols-2 gap-2">
								{[
									{ key: "rotationEffect", label: "Rotation" },
									{ key: "scaleEffect", label: "Scale" },
									{ key: "colorShift", label: "Color Shift" },
									{ key: "glowEffect", label: "Glow" },
									{ key: "particleEffect", label: "Particles" },
								].map((effect) => (
									<button
										key={effect.key}
										className={`text-xs px-2 py-1.5 rounded transition-colors ${
											textProps[effect.key as keyof TextProps]
												? "bg-[#8B43F7] text-white"
												: "bg-[#2c2c2e] text-white hover:bg-[#3a3a3c]"
										}`}
										onClick={() =>
											setTextProps((prev) => ({
												...prev,
												[effect.key]: !prev[effect.key as keyof TextProps],
											}))
										}
									>
										{effect.label}
									</button>
								))}
							</div>
						</div>
					</div>

					{/* Positioning */}
					<div className="space-y-3">
						<h3 className="text-xs sm:text-sm text-muted-foreground">
							Position & Alignment
						</h3>
						<div className="grid grid-cols-3 gap-2">
							{["left", "center", "right"].map((align) => (
								<button
									key={align}
									className={`text-xs px-2 py-1.5 rounded transition-colors capitalize ${
										textProps.textAlign === align
											? "bg-[#8B43F7] text-white"
											: "bg-[#2c2c2e] text-white hover:bg-[#3a3a3c]"
									}`}
									onClick={() =>
										setTextProps((prev) => ({
											...prev,
											textAlign: align as any,
										}))
									}
								>
									{align}
								</button>
							))}
						</div>
						<div className="grid grid-cols-2 gap-3">
							<div>
								<Label className="text-xs mb-2">X Position</Label>
								<Input
									placeholder="0"
									className="bg-[#1c1c1e] text-white border border-[#2c2c2e] text-xs sm:text-sm"
									value={textProps.positionX}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
										setTextProps((prev) => ({
											...prev,
											positionX: parseInt(e.target.value) || 0,
										}));
									}}
								/>
							</div>
							<div>
								<Label className="text-xs mb-2">Y Position</Label>
								<Input
									placeholder="0"
									className="bg-[#1c1c1e] text-white border border-[#2c2c2e] text-xs sm:text-sm"
									value={textProps.positionY}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
										setTextProps((prev) => ({
											...prev,
											positionY: parseInt(e.target.value) || 0,
										}));
									}}
								/>
							</div>
						</div>
					</div>
				</TabsContent>

				{/* Media Tab */}
				<TabsContent
					value="media"
					className="space-y-4 sm:space-y-6 pt-3 sm:pt-4"
				>
					{/* Background Media */}
					<div className="space-y-3">
						<h3 className="text-xs sm:text-sm text-muted-foreground">
							Background Media
						</h3>

						{/* Current Background Preview */}
						{textProps.backgroundMedia &&
							textProps.backgroundMedia !== "none" && (
								<div className="space-y-2">
									<Label className="text-xs mb-2">Current Background</Label>
									<div className="relative group">
										{textProps.backgroundMediaType === "image" ? (
											<img
												src={textProps.backgroundMedia}
												alt="Background"
												className="w-full h-20 object-cover rounded-lg"
											/>
										) : (
											<video
												src={textProps.backgroundMedia}
												className="w-full h-20 object-cover rounded-lg"
												muted
											/>
										)}
										<button
											onClick={() =>
												setTextProps((prev) => ({
													...prev,
													backgroundMedia: "none",
													backgroundMediaType: "image",
												}))
											}
											className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
										>
											×
										</button>
									</div>
									<div>
										<Label className="text-xs mb-2">Background Opacity</Label>
										<div className="flex items-center gap-2">
											<Slider
												value={[textProps.backgroundMediaOpacity]}
												min={0}
												max={100}
												step={5}
												className="flex-1"
												onValueChange={(v: number[]) => {
													setTextProps((prev) => ({
														...prev,
														backgroundMediaOpacity: v[0],
													}));
												}}
											/>
											<span className="text-xs text-muted-foreground min-w-[35px]">
												{textProps.backgroundMediaOpacity}%
											</span>
										</div>
									</div>
								</div>
							)}

						<div className="grid grid-cols-2 gap-2">
							<label htmlFor="image-upload" className="cursor-pointer">
								<Button
									type="button"
									variant="outline"
									className="flex items-center gap-2 bg-[#1c1c1e] border-[#2c2c2e] text-white hover:bg-[#2c2c2e] text-xs w-full"
								>
									<Image className="w-4 h-4" />
									Image
								</Button>
								<input
									id="image-upload"
									type="file"
									accept="image/*"
									className="hidden"
									onChange={handleFileInputChange}
								/>
							</label>
							<label htmlFor="video-upload" className="cursor-pointer">
								<Button
									type="button"
									variant="outline"
									className="flex items-center gap-2 bg-[#1c1c1e] border-[#2c2c2e] text-white hover:bg-[#2c2c2e] text-xs w-full"
								>
									<Upload className="w-4 h-4" />
									Video
								</Button>
								<input
									id="video-upload"
									type="file"
									accept="video/*"
									className="hidden"
									onChange={handleFileInputChange}
								/>
							</label>
						</div>
						<div
							className={`p-3 border-2 border-dashed rounded-lg text-center transition-colors ${
								isDragOver
									? "border-[#8B43F7] bg-[#8B43F7]/10"
									: isUploading
										? "border-orange-500 bg-orange-500/10"
										: "border-[#2c2c2e]"
							}`}
							onDrop={handleDrop}
							onDragOver={handleDragOver}
							onDragLeave={handleDragLeave}
						>
							<Upload
								className={`w-8 h-8 mx-auto mb-2 ${isUploading ? "animate-spin text-orange-500" : "text-gray-500"}`}
							/>
							<p className="text-xs text-gray-500">
								{isUploading ? "Uploading..." : "Drop image or video here"}
							</p>
							{!isUploading && (
								<>
									<p className="text-xs text-gray-400 mt-1">
										Max 10MB for images, 50MB for videos
									</p>
									<p className="text-xs text-gray-400">
										Supports: JPEG, PNG, GIF, WebP, MP4, WebM
									</p>
								</>
							)}
						</div>
					</div>

					{/* Audio Settings */}
					<div className="space-y-3">
						<h3 className="text-xs sm:text-sm text-muted-foreground">Audio</h3>
						<div className="grid grid-cols-2 gap-2">
							<Button
								variant="outline"
								className="flex items-center gap-2 bg-[#1c1c1e] border-[#2c2c2e] text-white hover:bg-[#2c2c2e] text-xs"
							>
								<Music className="w-4 h-4" />
								Music
							</Button>
							<Button
								variant="outline"
								className="flex items-center gap-2 bg-[#1c1c1e] border-[#2c2c2e] text-white hover:bg-[#2c2c2e] text-xs"
							>
								<Volume2 className="w-4 h-4" />
								Voice
							</Button>
						</div>
						<div>
							<Label className="text-xs mb-2">Background Music</Label>
							<Select
								value={textProps.backgroundMusic}
								onValueChange={(value) => {
									setTextProps((prev) => ({ ...prev, backgroundMusic: value }));
								}}
							>
								<SelectTrigger className="mt-1 bg-[#1c1c1e] text-white border border-[#2c2c2e] text-xs sm:text-sm">
									<SelectValue placeholder="Choose music" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem
										value="none"
										className="bg-gray-600 text-white text-xs sm:text-sm"
									>
										No Music
									</SelectItem>
									{["upbeat", "calm", "corporate", "cinematic", "modern"].map(
										(music) => (
											<SelectItem
												key={music}
												value={music}
												className="bg-gray-600 text-white text-xs sm:text-sm"
											>
												{music}
											</SelectItem>
										),
									)}
								</SelectContent>
							</Select>
						</div>
						<div>
							<Label className="text-xs mb-2">Volume</Label>
							<div className="flex items-center gap-2">
								<Slider
									value={[textProps.musicVolume]}
									min={0}
									max={100}
									step={5}
									className="flex-1 bg-white"
									onValueChange={(v: number[]) => {
										setTextProps((prev) => ({ ...prev, musicVolume: v[0] }));
									}}
								/>
								<span className="text-xs text-muted-foreground min-w-[30px]">
									{textProps.musicVolume}%
								</span>
							</div>
						</div>
					</div>

					{/* Video Settings */}
					<div className="space-y-3">
						<h3 className="text-xs sm:text-sm text-muted-foreground">
							Video Settings
						</h3>
						<div className="grid grid-cols-2 gap-3">
							<div>
								<Label className="text-xs mb-2">Duration (seconds)</Label>
								<Input
									placeholder="5s"
									className="bg-[#1c1c1e] text-white border border-[#2c2c2e] text-xs sm:text-sm"
									value={textProps.videoDuration}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
										setTextProps((prev) => ({
											...prev,
											videoDuration: parseInt(e.target.value) || 5,
										}));
									}}
								/>
							</div>
							<div>
								<Label className="text-xs mb-2">Quality</Label>
								<Select
									value={textProps.videoQuality}
									onValueChange={(value: any) => {
										setTextProps((prev) => ({ ...prev, videoQuality: value }));
									}}
								>
									<SelectTrigger className="bg-[#1c1c1e] text-white border border-[#2c2c2e] text-xs sm:text-sm">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{["720p", "1080p", "4K"].map((quality) => (
											<SelectItem
												key={quality}
												value={quality}
												className="bg-gray-600 text-white text-xs sm:text-sm"
											>
												{quality}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>
						<div>
							<Label className="text-xs mb-2">Aspect Ratio</Label>
							<div className="grid grid-cols-3 gap-2">
								{(["16:9", "9:16", "1:1"] as const).map((ratio) => (
									<button
										key={ratio}
										className={`text-xs px-2 py-1.5 rounded transition-colors ${
											textProps.aspectRatio === ratio
												? "bg-[#8B43F7] text-white"
												: "bg-[#2c2c2e] text-white hover:bg-[#3a3a3c]"
										}`}
										onClick={() =>
											setTextProps((prev) => ({ ...prev, aspectRatio: ratio }))
										}
									>
										{ratio}
									</button>
								))}
							</div>
						</div>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
