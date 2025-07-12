"use client";

import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";

export const typewriterSchema = z.object({
	text: z.string().default("Your Typewriter Text"),
	speed: z.number().min(1).default(5),
	color: z.string().default("#ffffff"),
	fontSize: z.number().default(60),
	bgColor: z.string().default("#000000"),
	typewriterStyle: z
		.enum(["classic", "modern", "glitch", "vintage"])
		.default("classic"),
	cursorStyle: z
		.enum(["line", "block", "underscore", "animated"])
		.default("line"),
	soundEffect: z.boolean().default(false),
	characterDelay: z.number().min(0).max(100).default(0),
	wordDelay: z.number().min(0).max(200).default(0),
	showCursor: z.boolean().default(true),
	textShadow: z.boolean().default(false),
	backgroundEffect: z
		.enum(["none", "paper", "terminal", "matrix"])
		.default("none"),
});

type TypewriterProps = z.infer<typeof typewriterSchema>;

export const TypewriterTemplate: React.FC<TypewriterProps> = ({
	text,
	speed,
	color,
	fontSize,
	bgColor,
	typewriterStyle,
	cursorStyle,
	soundEffect,
	characterDelay,
	wordDelay,
	showCursor,
	textShadow,
	backgroundEffect,
}) => {
	const frame = useCurrentFrame();
	const { fps, durationInFrames, width, height } = useVideoConfig();

	// Calculate frames per character based on fps and speed (characters per second)
	const framesPerChar = fps / speed;

	// Add delays for characters and words
	const words = text.split(" ");
	let adjustedFrame = frame;
	let totalDelay = 0;

	words.forEach((word, wordIndex) => {
		if (wordIndex > 0) {
			totalDelay += wordDelay;
		}
		for (let i = 0; i < word.length; i++) {
			totalDelay += characterDelay;
		}
	});

	const effectiveFrame = Math.max(
		0,
		adjustedFrame - (totalDelay * frame) / (text.length * framesPerChar),
	);
	const charsToShow = Math.min(
		text.length,
		Math.floor(effectiveFrame / framesPerChar),
	);
	const displayed = text.slice(0, charsToShow);

	// Calculate total animation duration in frames
	const totalAnimationFrames = text.length * framesPerChar;

	// Use durationInFrames to determine when to start fading out the cursor
	const fadeStartFrame = Math.min(totalAnimationFrames, durationInFrames - fps); // Start fading 1 second before end
	const fadeEndFrame = Math.min(totalAnimationFrames + fps, durationInFrames); // End fading at video end

	// Advanced cursor animations
	const getCursorStyle = () => {
		if (!showCursor) return { opacity: 0 };

		const blink = Math.floor(frame / (fps / 2)) % 2 === 0;
		const baseOpacity = interpolate(
			frame,
			[fadeStartFrame, fadeEndFrame],
			[1, 0],
			{ extrapolateRight: "clamp" },
		);

		switch (cursorStyle) {
			case "line":
				return {
					opacity: baseOpacity * (blink ? 1 : 0.2),
					content: "|",
					backgroundColor: "transparent",
				};
			case "block":
				return {
					opacity: baseOpacity * (blink ? 1 : 0.3),
					content: "█",
					backgroundColor: "transparent",
				};
			case "underscore":
				return {
					opacity: baseOpacity * (blink ? 1 : 0.2),
					content: "_",
					backgroundColor: "transparent",
				};
			case "animated":
				const pulse = Math.sin(frame / 10) * 0.5 + 0.5;
				return {
					opacity: baseOpacity * (0.5 + pulse * 0.5),
					content: "|",
					backgroundColor: "transparent",
					transform: `scaleY(${0.8 + pulse * 0.4})`,
				};
			default:
				return {
					opacity: baseOpacity * (blink ? 1 : 0.2),
					content: "|",
					backgroundColor: "transparent",
				};
		}
	};

	const cursorStyles = getCursorStyle();

	// Pop scale for the most recent character
	let popScale = 1;
	if (charsToShow > 0 && charsToShow <= text.length) {
		const charAppearFrame = charsToShow * framesPerChar;
		// Pop lasts for 6 frames
		const popDuration = 6;
		const popStart = charAppearFrame - popDuration;
		if (frame >= popStart && frame <= charAppearFrame) {
			const popIntensity =
				typewriterStyle === "modern"
					? 1.2
					: typewriterStyle === "glitch"
						? 1.6
						: 1.4;
			popScale = interpolate(
				frame,
				[popStart, charAppearFrame],
				[popIntensity, 1],
				{ extrapolateRight: "clamp" },
			);
		}
	}

	// Advanced styling based on typewriter style
	const getTypewriterStyles = () => {
		const baseStyles = {
			color,
			fontSize,
			whiteSpace: "pre-wrap" as const,
			textShadow: textShadow ? "2px 2px 4px rgba(0,0,0,0.5)" : "none",
		};

		switch (typewriterStyle) {
			case "classic":
				return {
					...baseStyles,
					fontFamily: "Courier New, monospace",
				};
			case "modern":
				return {
					...baseStyles,
					fontFamily: "SF Mono, Monaco, monospace",
					letterSpacing: "0.5px",
				};
			case "glitch":
				const glitchEffect =
					Math.random() > 0.95
						? `${Math.random() * 2 - 1}px ${Math.random() * 2 - 1}px 0 rgba(255,0,0,0.5)`
						: "none";
				return {
					...baseStyles,
					fontFamily: "Courier New, monospace",
					textShadow: glitchEffect,
					transform:
						Math.random() > 0.98
							? `translateX(${Math.random() * 4 - 2}px)`
							: "none",
				};
			case "vintage":
				return {
					...baseStyles,
					fontFamily: '"Typewriter", monospace',
					textShadow: "3px 3px 0px rgba(0,0,0,0.3)",
				};
			default:
				return {
					...baseStyles,
					fontFamily: "Courier New, monospace",
				};
		}
	};

	// Background effects
	const getBackgroundStyle = () => {
		const baseStyle = {
			flex: 1,
			backgroundColor: bgColor,
			width,
			height,
			padding: 50,
		};

		switch (backgroundEffect) {
			case "paper":
				return {
					...baseStyle,
					background: `${bgColor} url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-opacity='0.03'%3E%3Cpath d='M0 0h100v100H0z' fill='white'/%3E%3C/g%3E%3C/svg%3E")`,
				};
			case "terminal":
				return {
					...baseStyle,
					background: `linear-gradient(to bottom, ${bgColor} 0%, #001100 100%)`,
					boxShadow: "inset 0 0 50px rgba(0,255,0,0.1)",
				};
			case "matrix":
				return {
					...baseStyle,
					background: `radial-gradient(circle at center, ${bgColor} 0%, #000000 100%)`,
					position: "relative" as const,
				};
			default:
				return baseStyle;
		}
	};

	const textStyles = getTypewriterStyles();
	const backgroundStyles = getBackgroundStyle();

	return (
		<div style={backgroundStyles}>
			<span style={textStyles}>
				{displayed.slice(0, -1)}
				{charsToShow > 0 && (
					<span
						style={{ display: "inline-block", transform: `scale(${popScale})` }}
					>
						{displayed.slice(-1)}
					</span>
				)}
				<span
					style={{
						opacity: cursorStyles.opacity,
						transition: "opacity 0.1s",
						transform: cursorStyles.transform || "none",
					}}
				>
					{cursorStyles.content}
				</span>
			</span>
		</div>
	);
};
