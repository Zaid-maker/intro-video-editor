"use client";

import type React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";

export const oldSchoolTextSchema = z.object({
	text: z.string().default("Old School Cool"),
	duration: z.number().min(1).max(10).default(3),
	color: z.string().default("#f0f0f0"),
	fontSize: z.number().default(80),
	bgColor: z.string().default("#333333"),
	scanlineIntensity: z.number().min(0).max(1).default(0.1),
	withShadow: z.boolean().default(true),
});

type OldSchoolTextProps = z.infer<typeof oldSchoolTextSchema>;

export const OldSchoolTextTemplate: React.FC<OldSchoolTextProps> = ({
	text,
	duration,
	color,
	fontSize,
	bgColor,
	scanlineIntensity,
	withShadow,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const totalDuration = duration * fps;

	const flicker = interpolate(
		frame,
		[
			0,
			totalDuration / 4,
			totalDuration / 2,
			(3 * totalDuration) / 4,
			totalDuration,
		],
		[0.8, 1, 0.85, 1, 0.9],
		{ extrapolateRight: "clamp" },
	);

	const scanlineOpacity = Math.sin(frame / 2) * scanlineIntensity;

	return (
		<>
			<div
				style={{
					flex: 1,
					backgroundColor: bgColor,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					padding: 50,
					overflow: "hidden",
					position: "relative",
				}}
			>
				<div
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						background: `linear-gradient(to bottom, rgba(0,0,0,${scanlineOpacity}) 50%, transparent 50%)`,
						backgroundSize: "100% 4px",
						zIndex: 1,
					}}
				/>
				<h1
					style={{
						color,
						fontSize,
						fontFamily: "'VT323', monospace",
						fontWeight: "normal",
						textAlign: "center",
						margin: 0,
						opacity: flicker,
						textShadow: withShadow ? `3px 3px 0px #000000` : "none",
						zIndex: 2,
					}}
				>
					{text}
				</h1>
			</div>
		</>
	);
};
