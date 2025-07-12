"use client";

import type React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";

export const fadeInTextSchema = z.object({
	text: z.string().default("Your Fade In Text"),
	duration: z.number().min(1).max(10).default(3),
	color: z.string().default("#ffffff"),
	fontSize: z.number().default(60),
	bgColor: z.string().default("#000000"),
	fontFamily: z.string().default("Arial, sans-serif"),
	fontWeight: z.string().default("bold"),
	fadeType: z
		.enum([
			"simple",
			"letterByLetter",
			"wordByWord",
			"particles",
			"blur",
			"wave",
		])
		.default("simple"),
	easing: z
		.enum(["linear", "easeIn", "easeOut", "easeInOut", "bounce", "elastic"])
		.default("easeOut"),
	particleCount: z.number().min(10).max(100).default(30),
	blurIntensity: z.number().min(0).max(20).default(5),
	rotationEffect: z.boolean().default(false),
	colorShift: z.boolean().default(false),
	backgroundParticles: z.boolean().default(false),
	glowEffect: z.boolean().default(false),
});

type FadeInTextProps = z.infer<typeof fadeInTextSchema>;

export const FadeInTextTemplate: React.FC<FadeInTextProps> = ({
	text,
	duration,
	color,
	fontSize,
	bgColor,
	fontFamily,
	fontWeight,
	fadeType,
	easing,
	particleCount,
	blurIntensity,
	rotationEffect,
	colorShift,
	backgroundParticles,
	glowEffect,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Calculate fade in animation with different easing
	const fadeInDuration = duration * fps;

	const getEasedProgress = (progress: number) => {
		switch (easing) {
			case "linear":
				return progress;
			case "easeIn":
				return progress * progress;
			case "easeOut":
				return 1 - (1 - progress) * (1 - progress);
			case "easeInOut":
				return progress < 0.5
					? 2 * progress * progress
					: 1 - 2 * (1 - progress) * (1 - progress);
			case "bounce":
				if (progress < 0.5) {
					return 4 * progress * progress * progress;
				} else {
					return 1 - 4 * (1 - progress) * (1 - progress) * (1 - progress);
				}
			case "elastic": {
				if (progress === 0) return 0;
				if (progress === 1) return 1;
				const p = 0.3;
				const s = p / 4;
				return (
					2 ** (-10 * progress) *
						Math.sin(((progress - s) * (2 * Math.PI)) / p) +
					1
				);
			}
			default:
				return progress;
		}
	};

	const rawProgress = interpolate(frame, [0, fadeInDuration], [0, 1], {
		extrapolateRight: "clamp",
	});
	const fadeInProgress = getEasedProgress(rawProgress);

	// Generate particles for background
	const generateParticles = () => {
		if (!backgroundParticles) return [];

		const particles = [];
		for (let i = 0; i < particleCount; i++) {
			const particleOpacity = interpolate(
				frame,
				[i * 2, i * 2 + 60],
				[0, 0.3],
				{ extrapolateRight: "clamp" },
			);

			particles.push(
				<div
					key={i}
					style={{
						position: "absolute",
						left: `${Math.random() * 100}%`,
						top: `${Math.random() * 100}%`,
						width: "2px",
						height: "2px",
						backgroundColor: colorShift
							? `hsl(${(frame + i * 50) % 360}, 70%, 60%)`
							: color,
						opacity: particleOpacity,
						borderRadius: "50%",
						transform: `translate(-50%, -50%) scale(${1 + Math.sin(frame / 20 + i) * 0.5})`,
					}}
				/>,
			);
		}
		return particles;
	};

	// Advanced text rendering based on fade type
	const renderText = () => {
		const characters = text.split("");
		const words = text.split(" ");

		const baseTextStyles = {
			fontFamily,
			fontWeight,
			fontSize,
			textAlign: "center" as const,
			margin: 0,
			position: "relative" as const,
		};

		switch (fadeType) {
			case "simple": {
				const scale = interpolate(frame, [0, fadeInDuration * 0.5], [0.8, 1], {
					extrapolateRight: "clamp",
				});

				return (
					<h1
						style={{
							...baseTextStyles,
							color: colorShift ? `hsl(${frame % 360}, 70%, 60%)` : color,
							opacity: fadeInProgress,
							transform: `scale(${scale}) ${rotationEffect ? `rotate(${(1 - fadeInProgress) * 360}deg)` : ""}`,
							textShadow: glowEffect
								? `0 0 ${10 + Math.sin(frame / 10) * 10}px ${color}`
								: "2px 2px 4px rgba(0,0,0,0.3)",
							filter: "none",
						}}
					>
						{text}
					</h1>
				);
			}

			case "letterByLetter":
				return (
					<h1 style={baseTextStyles}>
						{characters.map((char, index) => {
							const charDelay =
								(index / characters.length) * fadeInDuration * 0.5;
							const charOpacity = interpolate(
								frame,
								[charDelay, charDelay + fadeInDuration * 0.5],
								[0, 1],
								{ extrapolateRight: "clamp" },
							);

							const charScale = interpolate(
								frame,
								[charDelay, charDelay + 30],
								[0.5, 1],
								{ extrapolateRight: "clamp" },
							);

							return (
								<span
									key={index}
									style={{
										color: colorShift
											? `hsl(${(frame + index * 30) % 360}, 70%, 60%)`
											: color,
										opacity: charOpacity,
										display: "inline-block",
										transform: `scale(${charScale}) ${rotationEffect ? `rotate(${(1 - charOpacity) * 180}deg)` : ""}`,
										textShadow: glowEffect
											? `0 0 ${5 + Math.sin(frame / 10 + index) * 5}px ${color}`
											: "none",
										transition: "all 0.1s ease-out",
									}}
								>
									{char === " " ? "\u00A0" : char}
								</span>
							);
						})}
					</h1>
				);

			case "wordByWord":
				return (
					<h1 style={baseTextStyles}>
						{words.map((word, wordIndex) => {
							const wordDelay =
								(wordIndex / words.length) * fadeInDuration * 0.6;
							const wordOpacity = interpolate(
								frame,
								[wordDelay, wordDelay + fadeInDuration * 0.4],
								[0, 1],
								{ extrapolateRight: "clamp" },
							);

							const wordScale = interpolate(
								frame,
								[wordDelay, wordDelay + 20],
								[0.3, 1],
								{ extrapolateRight: "clamp" },
							);

							return (
								<span key={wordIndex}>
									<span
										style={{
											color: colorShift
												? `hsl(${(frame + wordIndex * 60) % 360}, 70%, 60%)`
												: color,
											opacity: wordOpacity,
											display: "inline-block",
											transform: `scale(${wordScale}) ${rotationEffect ? `rotate(${(1 - wordOpacity) * 90}deg)` : ""}`,
											textShadow: glowEffect
												? `0 0 ${8 + Math.sin(frame / 15 + wordIndex) * 8}px ${color}`
												: "none",
											marginRight: wordIndex < words.length - 1 ? "0.5em" : "0",
										}}
									>
										{word}
									</span>
								</span>
							);
						})}
					</h1>
				);

			case "blur":
				return (
					<h1
						style={{
							...baseTextStyles,
							color: colorShift ? `hsl(${frame % 360}, 70%, 60%)` : color,
							opacity: fadeInProgress,
							filter: `blur(${blurIntensity * (1 - fadeInProgress)}px)`,
							transform: rotationEffect
								? `rotate(${(1 - fadeInProgress) * 180}deg)`
								: "none",
							textShadow: glowEffect
								? `0 0 ${15 + Math.sin(frame / 8) * 15}px ${color}`
								: "2px 2px 4px rgba(0,0,0,0.3)",
						}}
					>
						{text}
					</h1>
				);

			case "wave":
				return (
					<h1 style={baseTextStyles}>
						{characters.map((char, index) => {
							const waveOffset = Math.sin(frame / 20 + index * 0.3) * 20;
							const charOpacity = interpolate(
								frame,
								[index * 3, index * 3 + fadeInDuration * 0.8],
								[0, 1],
								{ extrapolateRight: "clamp" },
							);

							return (
								<span
									key={index}
									style={{
										color: colorShift
											? `hsl(${(frame + index * 20) % 360}, 70%, 60%)`
											: color,
										opacity: charOpacity,
										display: "inline-block",
										transform: `translateY(${waveOffset}px) ${rotationEffect ? `rotate(${waveOffset * 2}deg)` : ""}`,
										textShadow: glowEffect
											? `0 0 ${6 + Math.sin(frame / 12 + index) * 6}px ${color}`
											: "none",
									}}
								>
									{char === " " ? "\u00A0" : char}
								</span>
							);
						})}
					</h1>
				);

			default:
				return (
					<h1
						style={{
							...baseTextStyles,
							color,
							opacity: fadeInProgress,
							textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
						}}
					>
						{text}
					</h1>
				);
		}
	};

	return (
		<div
			style={{
				flex: 1,
				backgroundColor: bgColor,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				padding: 50,
				position: "relative",
				overflow: "hidden",
			}}
		>
			{backgroundParticles && generateParticles()}
			{renderText()}
		</div>
	);
};
