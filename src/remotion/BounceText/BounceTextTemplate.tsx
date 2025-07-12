"use client";

import type React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";

export const bounceTextSchema = z.object({
	text: z.string().default("Bounce!"),
	duration: z.number().min(1).max(5).default(2),
	color: z.string().default("#ffffff"),
	fontSize: z.number().default(60),
	bgColor: z.string().default("#000000"),
	bounceIntensity: z.number().min(1).max(10).default(5),
	bounceCount: z.number().min(1).max(10).default(3),
	physicsType: z
		.enum(["gravity", "elastic", "spring", "rubber", "jello"])
		.default("gravity"),
	damping: z.number().min(0).max(1).default(0.8),
	gravity: z.number().min(0.1).max(2).default(0.5),
	elasticity: z.number().min(0).max(1).default(0.7),
	rotationBounce: z.boolean().default(false),
	scaleBounce: z.boolean().default(false),
	colorShift: z.boolean().default(false),
	glowEffect: z.boolean().default(false),
	trailEffect: z.boolean().default(false),
	particleExplosion: z.boolean().default(false),
});

type BounceTextProps = z.infer<typeof bounceTextSchema>;

export const BounceTextTemplate: React.FC<BounceTextProps> = ({
	text,
	duration,
	color,
	fontSize,
	bgColor,
	bounceIntensity,
	bounceCount,
	physicsType,
	damping,
	gravity,
	elasticity,
	rotationBounce,
	scaleBounce,
	colorShift,
	glowEffect,
	trailEffect,
	particleExplosion,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const totalDuration = duration * fps;

	// Advanced physics calculations
	const getPhysicsAnimation = () => {
		const time = frame / fps;

		switch (physicsType) {
			case "gravity": {
				// Simulate gravity with multiple bounces
				const bounceDecay = 
					damping ** 
					Math.floor(time / (duration / bounceCount))
				;
				const currentBounceTime = time % (duration / bounceCount);
				const bounceProgress = currentBounceTime / (duration / bounceCount);

				let gravityY = 0;
				if (bounceProgress < 0.5) {
					// Falling
					gravityY =
						-bounceIntensity *
						bounceDecay *
						(1 - 4 * bounceProgress * bounceProgress);
				} else {
					// Rising
					const riseProgress = (bounceProgress - 0.5) * 2;
					gravityY =
						-bounceIntensity *
						bounceDecay *
						(1 - 4 * riseProgress * riseProgress);
				}

				return {
					y: gravityY * 10,
					rotation: rotationBounce ? gravityY * 2 : 0,
					scale: scaleBounce ? 1 + Math.abs(gravityY) * 0.02 : 1,
				};
			}

			case "elastic": {
				const elasticProgress =
					Math.sin(time * Math.PI * 2 * bounceCount) *
					Math.exp(-time * 3 * (1 - elasticity)) *
					bounceIntensity;

				return {
					y: elasticProgress * 20,
					rotation: rotationBounce ? elasticProgress * 5 : 0,
					scale: scaleBounce ? 1 + Math.abs(elasticProgress) * 0.05 : 1,
				};
			}

			case "spring": {
				const springForce =
					Math.sin(time * Math.PI * 4) *
					Math.exp(-time * 2 * damping) *
					bounceIntensity;

				return {
					y: springForce * 15,
					rotation: rotationBounce ? springForce * 3 : 0,
					scale: scaleBounce ? 1 + Math.abs(springForce) * 0.03 : 1,
				};
			}

			case "rubber": {
				const rubberBounce =
					Math.sin(time * Math.PI * 3) *
					Math.exp(-time * 1.5) *
					bounceIntensity;
				const rubberStretch =
					Math.cos(time * Math.PI * 6) * Math.exp(-time * 2) * 0.2;

				return {
					y: rubberBounce * 25,
					rotation: rotationBounce ? rubberBounce * 4 : 0,
					scale: scaleBounce ? 1 + rubberStretch : 1,
					skew: rubberStretch * 10,
				};
			}

			case "jello": {
				const jelloFreq = 8;
				const jelloDecay = Math.exp(-time * 2);
				const jelloX =
					Math.sin(time * Math.PI * jelloFreq) *
					jelloDecay *
					bounceIntensity *
					0.5;
				const jelloY =
					Math.cos(time * Math.PI * jelloFreq * 0.7) *
					jelloDecay *
					bounceIntensity;

				return {
					y: jelloY * 15,
					x: jelloX * 10,
					rotation: rotationBounce ? jelloX * 2 : 0,
					scale: scaleBounce ? 1 + Math.abs(jelloY) * 0.02 : 1,
				};
			}

			default:
				return { y: 0, rotation: 0, scale: 1 };
		}
	};

	const physics = getPhysicsAnimation();

	// Particle explosion effect
	const generateParticleExplosion = () => {
		if (!particleExplosion) return [];

		const particles = [];
		const explosionStart = fps * 0.5; // Start after 0.5 seconds

		for (let i = 0; i < 30; i++) {
			const angle = (i / 30) * Math.PI * 2;
			const velocity = 50 + Math.random() * 50;
			const particleTime = (frame - explosionStart) / fps;

			if (particleTime > 0) {
				const particleX = Math.cos(angle) * velocity * particleTime;
				const particleY =
					Math.sin(angle) * velocity * particleTime -
					gravity * particleTime * particleTime * 100;

				const particleOpacity = interpolate(
					frame,
					[explosionStart, explosionStart + 60],
					[1, 0],
					{ extrapolateRight: "clamp" },
				);

				particles.push(
					<div
						key={i}
						style={{
							position: "absolute",
							left: "50%",
							top: "50%",
							width: "4px",
							height: "4px",
							backgroundColor: colorShift
								? `hsl(${(frame + i * 30) % 360}, 70%, 60%)`
								: color,
							opacity: particleOpacity,
							borderRadius: "50%",
							transform: `translate(${particleX}px, ${particleY}px)`,
						}}
					/>,
				);
			}
		}
		return particles;
	};

	// Trail effect
	const generateTrail = () => {
		if (!trailEffect) return [];

		const trails = [];
		for (let i = 0; i < 10; i++) {
			const trailOpacity = interpolate(
				frame,
				[frame - i * 3, frame - i * 3 + 30],
				[0.5, 0],
				{ extrapolateRight: "clamp" },
			);

			const trailY = physics.y * (1 - i * 0.1);
			const trailX = (physics.x || 0) * (1 - i * 0.1);

			trails.push(
				<div
					key={i}
					style={{
						position: "absolute",
						left: "50%",
						top: "50%",
						transform: `translate(-50%, -50%) translate(${trailX}px, ${trailY}px)`,
						opacity: trailOpacity,
						color: colorShift
							? `hsl(${(frame + i * 20) % 360}, 50%, 50%)`
							: color,
						fontSize: fontSize * (1 - i * 0.05),
						fontFamily: "Arial, sans-serif",
						fontWeight: "bold",
						textShadow: glowEffect ? `0 0 ${5}px ${color}` : "none",
						zIndex: -i,
					}}
				>
					{text}
				</div>,
			);
		}
		return trails;
	};

	// Fade in effect
	const fadeIn = interpolate(frame, [0, totalDuration * 0.3], [0, 1], {
		extrapolateRight: "clamp",
	});

	// Character-by-character bounce for complex text
	const renderBouncingText = () => {
		const characters = text.split("");

		return (
			<h1
				style={{
					fontFamily: "Arial, sans-serif",
					fontWeight: "bold",
					fontSize,
					textAlign: "center",
					margin: 0,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{characters.map((char, index) => {
					const charDelay = index * 0.1;
					const charTime = frame / fps - charDelay;

					// Calculate individual character physics
					const charPhysics = (() => {
						if (charTime <= 0) return { y: 0, rotation: 0, scale: 1 };

						switch (physicsType) {
							case "gravity": {
								const charBounceDecay = 
									damping ** 
									Math.floor(charTime / (duration / bounceCount))
								;
								const charCurrentBounceTime =
									charTime % (duration / bounceCount);
								const charBounceProgress =
									charCurrentBounceTime / (duration / bounceCount);

								let charGravityY = 0;
								if (charBounceProgress < 0.5) {
									charGravityY =
										-bounceIntensity *
										charBounceDecay *
										(1 - 4 * charBounceProgress * charBounceProgress);
								} else {
									const charRiseProgress = (charBounceProgress - 0.5) * 2;
									charGravityY =
										-bounceIntensity *
										charBounceDecay *
										(1 - 4 * charRiseProgress * charRiseProgress);
								}

								return {
									y: charGravityY * 10,
									rotation: rotationBounce ? charGravityY * 2 : 0,
									scale: scaleBounce ? 1 + Math.abs(charGravityY) * 0.02 : 1,
								};
							}

							case "jello": {
								const charJelloFreq = 8;
								const charJelloDecay = Math.exp(-charTime * 2);
								const charJelloY =
									Math.cos(
										charTime * Math.PI * charJelloFreq * 0.7 + index * 0.5,
									) *
									charJelloDecay *
									bounceIntensity;

								return {
									y: charJelloY * 15,
									rotation: rotationBounce ? charJelloY * 2 : 0,
									scale: scaleBounce ? 1 + Math.abs(charJelloY) * 0.02 : 1,
								};
							}

							default:
								return { y: 0, rotation: 0, scale: 1 };
						}
					})();

					return (
						<span
							key={index}
							style={{
								display: "inline-block",
								color: colorShift
									? `hsl(${(frame + index * 30) % 360}, 70%, 60%)`
									: color,
								opacity: fadeIn,
								transform: `translateY(${charPhysics.y}px) rotate(${charPhysics.rotation}deg) scale(${charPhysics.scale})`,
								textShadow: glowEffect
									? `0 0 ${10 + Math.sin(frame / 10 + index) * 5}px ${color}`
									: "2px 2px 4px rgba(0,0,0,0.3)",
								transition: "all 0.1s ease-out",
							}}
						>
							{char === " " ? "\u00A0" : char}
						</span>
					);
				})}
			</h1>
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
				overflow: "hidden",
			}}
		>
			{trailEffect && generateTrail()}
			{particleExplosion && generateParticleExplosion()}

			{/* Main text */}
			<div
				style={{
					transform: `translate(${physics.x || 0}px, ${physics.y}px) rotate(${physics.rotation}deg) scale(${physics.scale}) ${physics.skew ? `skew(${physics.skew}deg)` : ""}`,
					position: "relative",
				}}
			>
				{physicsType === "jello" || text.length > 1 ? (
					renderBouncingText()
				) : (
					<h1
						style={{
							color: colorShift ? `hsl(${frame % 360}, 70%, 60%)` : color,
							fontSize,
							fontFamily: "Arial, sans-serif",
							fontWeight: "bold",
							opacity: fadeIn,
							textAlign: "center",
							margin: 0,
							textShadow: glowEffect
								? `0 0 ${15 + Math.sin(frame / 8) * 10}px ${color}`
								: "2px 2px 4px rgba(0,0,0,0.3)",
						}}
					>
						{text}
					</h1>
				)}
			</div>
		</div>
	);
};
