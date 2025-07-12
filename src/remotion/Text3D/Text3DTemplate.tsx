"use client";

import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";

export const text3DSchema = z.object({
	text: z.string().default("3D TEXT"),
	duration: z.number().min(2).max(10).default(4),
	color: z.string().default("#00aaff"),
	fontSize: z.number().default(120),
	bgColor: z.string().default("#000000"),
	depth: z.number().min(5).max(50).default(20),
	rotationX: z.number().min(-180).max(180).default(0),
	rotationY: z.number().min(-180).max(180).default(0),
	rotationZ: z.number().min(-180).max(180).default(0),
	perspective: z.number().min(500).max(2000).default(1000),
	lightIntensity: z.number().min(0).max(2).default(1),
	shadowIntensity: z.number().min(0).max(2).default(0.8),
	metallic: z.boolean().default(false),
	animated: z.boolean().default(true),
	rotationSpeed: z.number().min(0).max(5).default(1),
	colorGradient: z.boolean().default(true),
	environmentReflection: z.boolean().default(false),
});

type Text3DProps = z.infer<typeof text3DSchema>;

export const Text3DTemplate: React.FC<Text3DProps> = ({
	text,
	duration,
	color,
	fontSize,
	bgColor,
	depth,
	rotationX,
	rotationY,
	rotationZ,
	perspective,
	lightIntensity,
	shadowIntensity,
	metallic,
	animated,
	rotationSpeed,
	colorGradient,
	environmentReflection,
}) => {
	const frame = useCurrentFrame();
	const { fps, width, height } = useVideoConfig();

	const totalDuration = duration * fps;

	// Create 3D layers for depth effect
	const createDepthLayers = () => {
		const layers = [];

		for (let i = 0; i < depth; i++) {
			const layerDepth = -i * 2;
			const layerOpacity = interpolate(i, [0, depth - 1], [1, 0.3], {
				extrapolateRight: "clamp",
			});

			// Calculate lighting effect
			const lightAngle = animated ? frame * rotationSpeed : 0;
			const lightFactor = (Math.sin(lightAngle / 30 + i * 0.1) + 1) / 2;

			// Color calculation for each layer
			const layerColor = (() => {
				if (colorGradient) {
					const hue = (frame + i * 10) % 360;
					return `hsl(${hue}, 70%, ${50 + lightFactor * 30}%)`;
				} else {
					const brightness = 1 - (i / depth) * 0.5;
					return `rgba(${parseInt(color.slice(1, 3), 16) * brightness}, ${parseInt(color.slice(3, 5), 16) * brightness}, ${parseInt(color.slice(5, 7), 16) * brightness}, ${layerOpacity})`;
				}
			})();

			layers.push(
				<div
					key={i}
					style={{
						position: "absolute",
						left: "50%",
						top: "50%",
						transform: `translate(-50%, -50%) translateZ(${layerDepth}px)`,
						color: layerColor,
						fontSize,
						fontFamily: "Arial, sans-serif",
						fontWeight: "900",
						textShadow: metallic
							? `0 0 ${10 + lightFactor * 10}px ${layerColor}`
							: "none",
						opacity: layerOpacity,
						zIndex: depth - i,
					}}
				>
					{text}
				</div>,
			);
		}

		return layers;
	};

	// Calculate animated rotations
	const getAnimatedRotations = () => {
		if (!animated) {
			return {
				rotateX: rotationX,
				rotateY: rotationY,
				rotateZ: rotationZ,
			};
		}

		const timeProgress = frame / totalDuration;
		const smoothProgress = Math.sin(timeProgress * Math.PI); // Smooth animation curve

		return {
			rotateX:
				rotationX +
				Math.sin((frame * rotationSpeed) / 20) * 20 * smoothProgress,
			rotateY: rotationY + frame * rotationSpeed * smoothProgress,
			rotateZ:
				rotationZ +
				Math.cos((frame * rotationSpeed) / 30) * 10 * smoothProgress,
		};
	};

	const rotations = getAnimatedRotations();
	const timeProgress = frame / totalDuration;
	const smoothProgress = Math.sin(timeProgress * Math.PI); // Smooth animation curve

	// Create environment reflection effect
	const createEnvironmentReflection = () => {
		if (!environmentReflection) return null;

		const reflectionOpacity = interpolate(
			Math.sin(frame / 20),
			[-1, 1],
			[0.1, 0.3],
			{ extrapolateRight: "clamp" },
		);

		return (
			<div
				style={{
					position: "absolute",
					left: "50%",
					top: "50%",
					transform: `translate(-50%, -50%) rotateX(${rotations.rotateX}deg) rotateY(${rotations.rotateY + 180}deg) rotateZ(${rotations.rotateZ}deg) scaleY(-1) translateZ(-${depth * 2}px)`,
					color: colorGradient ? `hsl(${(frame * 2) % 360}, 50%, 40%)` : color,
					fontSize,
					fontFamily: "Arial, sans-serif",
					fontWeight: "900",
					opacity: reflectionOpacity,
					filter: "blur(2px)",
				}}
			>
				{text}
			</div>
		);
	};

	// Create floating particles around text
	const createFloatingParticles = () => {
		const particles = [];

		// Scale particle radius based on video dimensions
		const baseRadius = Math.min(width, height) * 0.15;

		for (let i = 0; i < 20; i++) {
			const angle = (i / 20) * Math.PI * 2;
			const radius =
				baseRadius + Math.sin(frame / 30 + i) * (baseRadius * 0.25);
			const particleX = Math.cos(angle) * radius;
			const particleY = Math.sin(angle) * radius;
			const particleZ = Math.sin(frame / 20 + i) * 100;

			const particleOpacity =
				interpolate(Math.sin(frame / 15 + i), [-1, 1], [0.2, 0.8], {
					extrapolateRight: "clamp",
				}) * smoothProgress;

			particles.push(
				<div
					key={i}
					style={{
						position: "absolute",
						left: "50%",
						top: "50%",
						width: "4px",
						height: "4px",
						backgroundColor: colorGradient
							? `hsl(${(frame + i * 20) % 360}, 70%, 60%)`
							: color,
						borderRadius: "50%",
						transform: `translate(-50%, -50%) translate3d(${particleX}px, ${particleY}px, ${particleZ}px)`,
						opacity: particleOpacity,
						boxShadow: `0 0 10px ${colorGradient ? `hsl(${(frame + i * 20) % 360}, 70%, 60%)` : color}`,
					}}
				/>,
			);
		}

		return particles;
	};

	// Create dynamic shadow
	const createDynamicShadow = () => {
		if (shadowIntensity === 0) return null;

		const shadowBlur = 20 + Math.sin(frame / 25) * 10;
		const shadowOpacity = shadowIntensity * 0.5;

		return (
			<div
				style={{
					position: "absolute",
					left: "50%",
					top: "50%",
					transform: `translate(-50%, -50%) translateZ(-${depth * 3}px) rotateX(90deg)`,
					color: "rgba(0, 0, 0, 0.5)",
					fontSize,
					fontFamily: "Arial, sans-serif",
					fontWeight: "900",
					opacity: shadowOpacity,
					filter: `blur(${shadowBlur}px)`,
				}}
			>
				{text}
			</div>
		);
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
				perspective: `${perspective}px`,
				perspectiveOrigin: "center center",
				overflow: "hidden",
			}}
		>
			<div
				style={{
					position: "relative",
					transformStyle: "preserve-3d",
					transform: `rotateX(${rotations.rotateX}deg) rotateY(${rotations.rotateY}deg) rotateZ(${rotations.rotateZ}deg)`,
				}}
			>
				{createDepthLayers()}
				{createEnvironmentReflection()}
				{createDynamicShadow()}
			</div>

			{/* Floating particles */}
			<div
				style={{
					position: "absolute",
					left: 0,
					top: 0,
					width: "100%",
					height: "100%",
					transformStyle: "preserve-3d",
					transform: `rotateX(${rotations.rotateX * 0.2}deg) rotateY(${rotations.rotateY * 0.3}deg)`,
				}}
			>
				{createFloatingParticles()}
			</div>
		</div>
	);
};
