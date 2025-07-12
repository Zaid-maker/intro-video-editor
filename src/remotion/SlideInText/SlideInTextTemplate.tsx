"use client";

import type React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";

export const slideInTextSchema = z.object({
	text: z.string().default("Your Slide In Text"),
	duration: z.number().min(1).max(10).default(2),
	color: z.string().default("#ffffff"),
	fontSize: z.number().default(60),
	bgColor: z.string().default("#000000"),
	direction: z
		.enum(["left", "right", "top", "bottom", "diagonal", "spiral", "zoom"])
		.default("left"),
	bounce: z.boolean().default(false),
	slideType: z
		.enum(["simple", "elastic", "cascade", "wave", "flip3d", "parallax"])
		.default("simple"),
	easing: z
		.enum(["linear", "easeIn", "easeOut", "easeInOut", "bounce", "elastic"])
		.default("easeOut"),
	rotationEffect: z.boolean().default(false),
	scaleEffect: z.boolean().default(false),
	perspectiveEffect: z.boolean().default(false),
	particleTrail: z.boolean().default(false),
	colorShift: z.boolean().default(false),
	glowEffect: z.boolean().default(false),
});

type SlideInTextProps = z.infer<typeof slideInTextSchema>;

export const SlideInTextTemplate: React.FC<SlideInTextProps> = ({
	text,
	duration,
	color,
	fontSize,
	bgColor,
	direction,
	bounce,
	slideType,
	easing,
	rotationEffect,
	scaleEffect,
	perspectiveEffect,
	particleTrail,
	colorShift,
	glowEffect,
}) => {
	const frame = useCurrentFrame();
	const { fps, width, height } = useVideoConfig();

	const slideDuration = duration * fps;

	// Advanced easing functions
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

	const rawProgress = interpolate(frame, [0, slideDuration], [0, 1], {
		extrapolateRight: "clamp",
	});
	const progress = getEasedProgress(rawProgress);

	// Advanced slide calculations
	const getSlideTransform = () => {
		let baseTransform = "";

		switch (direction) {
			case "left":
				baseTransform = `translateX(${-width * (1 - progress)}px)`;
				break;
			case "right":
				baseTransform = `translateX(${width * (1 - progress)}px)`;
				break;
			case "top":
				baseTransform = `translateY(${-height * (1 - progress)}px)`;
				break;
			case "bottom":
				baseTransform = `translateY(${height * (1 - progress)}px)`;
				break;
			case "diagonal":
				baseTransform = `translate(${-width * (1 - progress)}px, ${-height * (1 - progress)}px)`;
				break;
			case "spiral": {
				const angle = (1 - progress) * Math.PI * 4;
				const radius = 200 * (1 - progress);
				baseTransform = `translate(${Math.cos(angle) * radius}px, ${Math.sin(angle) * radius}px)`;
				break;
			}
			case "zoom": {
				const scale = 0.1 + progress * 0.9;
				baseTransform = `scale(${scale})`;
				break;
			}
			default:
				baseTransform = `translateX(${-width * (1 - progress)}px)`;
		}

		// Add rotation effect
		if (rotationEffect) {
			const rotation = (1 - progress) * 720;
			baseTransform += ` rotate(${rotation}deg)`;
		}

		// Add scale effect
		if (scaleEffect && direction !== "zoom") {
			const scale = 0.5 + progress * 0.5;
			baseTransform += ` scale(${scale})`;
		}

		// Add bounce effect
		if (bounce && progress > 0.8) {
			const bounceProgress = (progress - 0.8) / 0.2;
			const bounceOffset =
				Math.sin(bounceProgress * Math.PI * 4) * 20 * (1 - bounceProgress);
			baseTransform += ` translateY(${bounceOffset}px)`;
		}

		return baseTransform;
	};

	// Generate particle trail
	const generateParticleTrail = () => {
		if (!particleTrail) return [];

		const particles = [];
		for (let i = 0; i < 20; i++) {
			const particleDelay = i * 3;
			const particleOpacity = interpolate(
				frame,
				[particleDelay, particleDelay + 30, particleDelay + 60],
				[0, 0.8, 0],
				{ extrapolateRight: "clamp" },
			);

			const particleX = interpolate(
				frame,
				[particleDelay, particleDelay + 60],
				[
					direction === "left"
						? -100
						: direction === "right"
							? width + 100
							: Math.random() * width,
					Math.random() * width,
				],
				{ extrapolateRight: "clamp" },
			);

			const particleY = interpolate(
				frame,
				[particleDelay, particleDelay + 60],
				[
					direction === "top"
						? -100
						: direction === "bottom"
							? height + 100
							: Math.random() * height,
					Math.random() * height,
				],
				{ extrapolateRight: "clamp" },
			);

			particles.push(
				<div
					key={i}
					style={{
						position: "absolute",
						left: particleX,
						top: particleY,
						width: "4px",
						height: "4px",
						backgroundColor: colorShift
							? `hsl(${(frame + i * 30) % 360}, 70%, 60%)`
							: color,
						opacity: particleOpacity,
						borderRadius: "50%",
						transform: `scale(${1 + Math.sin(frame / 10 + i) * 0.5})`,
					}}
				/>,
			);
		}
		return particles;
	};

	// Advanced text rendering based on slide type
	const renderText = () => {
		const characters = text.split("");
		const words = text.split(" ");

		const baseStyles = {
			fontFamily: "Arial, sans-serif",
			fontWeight: "bold",
			fontSize,
			textAlign: "center" as const,
			margin: 0,
			color: colorShift ? `hsl(${frame % 360}, 70%, 60%)` : color,
			textShadow: glowEffect
				? `0 0 ${10 + Math.sin(frame / 15) * 10}px ${color}`
				: "2px 2px 4px rgba(0,0,0,0.3)",
		};

		switch (slideType) {
			case "simple":
				return (
					<h1
						style={{
							...baseStyles,
							transform: getSlideTransform(),
						}}
					>
						{text}
					</h1>
				);

			case "elastic": {
				const elasticScale = 1 + Math.sin(progress * Math.PI * 2) * 0.1;
				return (
					<h1
						style={{
							...baseStyles,
							transform: `${getSlideTransform()} scale(${elasticScale})`,
						}}
					>
						{text}
					</h1>
				);
			}

			case "cascade":
				return (
					<h1
						style={{
							...baseStyles,
							display: "flex",
							justifyContent: "center",
							flexWrap: "wrap",
						}}
					>
						{characters.map((char, index) => {
							const charDelay =
								(index / characters.length) * slideDuration * 0.5;
							const charProgress = interpolate(
								frame,
								[charDelay, charDelay + slideDuration * 0.5],
								[0, 1],
								{ extrapolateRight: "clamp" },
							);

							const charTransform =
								direction === "left"
									? `translateX(${-200 * (1 - charProgress)}px)`
									: direction === "right"
										? `translateX(${200 * (1 - charProgress)}px)`
										: `translateY(${-200 * (1 - charProgress)}px)`;

							return (
								<span
									key={index}
									style={{
										display: "inline-block",
										transform: charTransform,
										opacity: charProgress,
										color: colorShift
											? `hsl(${(frame + index * 30) % 360}, 70%, 60%)`
											: color,
									}}
								>
									{char === " " ? "\u00A0" : char}
								</span>
							);
						})}
					</h1>
				);

			case "wave":
				return (
					<h1
						style={{
							...baseStyles,
							display: "flex",
							justifyContent: "center",
							flexWrap: "wrap",
						}}
					>
						{characters.map((char, index) => {
							const waveOffset = Math.sin(frame / 20 + index * 0.3) * 20;
							const charOpacity = interpolate(
								frame,
								[index * 2, index * 2 + slideDuration * 0.8],
								[0, 1],
								{ extrapolateRight: "clamp" },
							);

							return (
								<span
									key={index}
									style={{
										display: "inline-block",
										transform: `${getSlideTransform()} translateY(${waveOffset}px)`,
										opacity: charOpacity,
										color: colorShift
											? `hsl(${(frame + index * 20) % 360}, 70%, 60%)`
											: color,
									}}
								>
									{char === " " ? "\u00A0" : char}
								</span>
							);
						})}
					</h1>
				);

			case "flip3d": {
				const rotateY = (1 - progress) * 180;
				return (
					<h1
						style={{
							...baseStyles,
							transform: `${getSlideTransform()} rotateY(${rotateY}deg)`,
							transformStyle: "preserve-3d",
							perspective: "1000px",
						}}
					>
						{text}
					</h1>
				);
			}

			case "parallax":
				return (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							height: "100%",
						}}
					>
						{words.map((word, wordIndex) => {
							const wordDelay =
								(wordIndex / words.length) * slideDuration * 0.3;
							const wordProgress = interpolate(
								frame,
								[wordDelay, wordDelay + slideDuration * 0.7],
								[0, 1],
								{ extrapolateRight: "clamp" },
							);

							const parallaxOffset =
								(wordIndex - words.length / 2) * 100 * (1 - wordProgress);
							const wordTransform = `${getSlideTransform()} translateZ(${parallaxOffset}px)`;

							return (
								<span key={wordIndex} style={{ margin: "0 10px" }}>
									<span
										style={{
											...baseStyles,
											display: "inline-block",
											transform: wordTransform,
											opacity: wordProgress,
											color: colorShift
												? `hsl(${(frame + wordIndex * 60) % 360}, 70%, 60%)`
												: color,
										}}
									>
										{word}
									</span>
								</span>
							);
						})}
					</div>
				);

			default:
				return (
					<h1
						style={{
							...baseStyles,
							transform: getSlideTransform(),
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
				overflow: "hidden",
				position: "relative",
				perspective: perspectiveEffect ? "1000px" : "none",
			}}
		>
			{particleTrail && generateParticleTrail()}
			{renderText()}
		</div>
	);
};
