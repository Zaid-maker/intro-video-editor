"use client";

import type React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";

export const fluidTextSchema = z.object({
	text: z.string().default("Fluid Animation"),
	duration: z.number().min(1).max(10).default(4),
	color: z.string().default("#00ffff"),
	fontSize: z.number().default(70),
	bgColor: z.string().default("#001122"),
	waveIntensity: z.number().min(1).max(30).default(15),
	waveSpeed: z.number().min(1).max(10).default(3),
	fluidType: z.enum(["wave", "liquid", "ripple", "flow"]).default("wave"),
	colorShift: z.boolean().default(true),
	glowEffect: z.boolean().default(true),
});

type FluidTextProps = z.infer<typeof fluidTextSchema>;

export const FluidTextTemplate: React.FC<FluidTextProps> = ({
	text,
	duration,
	color,
	fontSize,
	bgColor,
	waveIntensity,
	waveSpeed,
	fluidType,
	colorShift,
	glowEffect,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const totalDuration = duration * fps;

	const characters = text.split("");

	// Create different fluid motion patterns
	const getFluidTransform = (index: number) => {
		const baseTime = frame / (waveSpeed * 3);
		const charOffset = index / 2;

		switch (fluidType) {
			case "wave": {
				const wave = Math.sin(baseTime + charOffset) * waveIntensity;
				return `translateY(${wave}px)`;
			}

			case "liquid": {
				const liquidY = Math.sin(baseTime + charOffset) * waveIntensity;
				const liquidX =
					Math.cos(baseTime * 0.5 + charOffset * 0.3) * (waveIntensity * 0.3);
				const liquidScale =
					1 + Math.sin(baseTime * 0.7 + charOffset * 0.2) * 0.1;
				return `translate(${liquidX}px, ${liquidY}px) scale(${liquidScale})`;
			}

			case "ripple": {
				const rippleDistance = Math.abs(index - characters.length / 2);
				const rippleDelay = rippleDistance * 0.1;
				const ripple =
					Math.sin(baseTime * 2 - rippleDelay) *
					waveIntensity *
					Math.exp(-rippleDistance * 0.1);
				return `translateY(${ripple}px) scale(${1 + ripple * 0.01})`;
			}

			case "flow": {
				const flowY = Math.sin(baseTime + charOffset * 0.8) * waveIntensity;
				const flowX =
					Math.sin(baseTime * 0.3 + charOffset * 0.5) * (waveIntensity * 0.5);
				const flowRotate = Math.sin(baseTime * 0.4 + charOffset * 0.3) * 5;
				return `translate(${flowX}px, ${flowY}px) rotate(${flowRotate}deg)`;
			}

			default:
				return "translateY(0px)";
		}
	};

	// Dynamic color shifting
	const getDynamicColor = (index: number) => {
		if (!colorShift) return color;

		const hue = (frame * 2 + index * 20) % 360;
		return `hsl(${hue}, 70%, 60%)`;
	};

	// Glow effect
	const getGlowStyle = (index: number) => {
		if (!glowEffect) return {};

		const glowIntensity = Math.sin(frame / 20 + index / 5) * 0.5 + 0.5;
		return {
			textShadow: `
                0 0 ${10 + glowIntensity * 20}px ${getDynamicColor(index)},
                0 0 ${20 + glowIntensity * 30}px ${getDynamicColor(index)},
                0 0 ${40 + glowIntensity * 40}px ${getDynamicColor(index)}
            `,
		};
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
				background: `radial-gradient(circle at center, ${bgColor} 0%, ${bgColor}dd 100%)`,
			}}
		>
			<h1
				style={{
					color,
					fontSize,
					fontFamily: "Helvetica, sans-serif",
					fontWeight: "bold",
					textAlign: "center",
					margin: 0,
					display: "flex",
					position: "relative",
				}}
			>
				{characters.map((char, index) => {
					const fadeInDuration = totalDuration / 3;
					const fadeInStart = (index / characters.length) * fadeInDuration;

					const fadeIn = interpolate(
						frame,
						[fadeInStart, fadeInStart + fadeInDuration],
						[0, 1],
						{ extrapolateRight: "clamp" },
					);

					const charColor = colorShift ? getDynamicColor(index) : color;

					return (
						<span
							key={index}
							style={{
								transform: getFluidTransform(index),
								opacity: fadeIn,
								display: "inline-block",
								color: charColor,
								transition: "all 0.1s ease-out",
								...getGlowStyle(index),
							}}
						>
							{char === " " ? "\u00A0" : char}
						</span>
					);
				})}
			</h1>
		</div>
	);
};
