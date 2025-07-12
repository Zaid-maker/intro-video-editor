"use client";

import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";

export const particleExplosionSchema = z.object({
	text: z.string().default("BOOM!"),
	duration: z.number().min(2).max(10).default(4),
	color: z.string().default("#ff4444"),
	fontSize: z.number().default(100),
	bgColor: z.string().default("#000000"),
	particleCount: z.number().min(50).max(500).default(200),
	explosionRadius: z.number().min(100).max(800).default(300),
	explosionIntensity: z.number().min(0.5).max(3).default(1.5),
	particleSize: z.number().min(1).max(10).default(3),
	gravity: z.number().min(0).max(2).default(0.5),
	fadeSpeed: z.number().min(0.1).max(2).default(0.8),
	colorVariation: z.boolean().default(true),
	sparkles: z.boolean().default(true),
	shockwave: z.boolean().default(true),
	textBehavior: z
		.enum(["static", "shatter", "reform", "pulse"])
		.default("shatter"),
});

type ParticleExplosionProps = z.infer<typeof particleExplosionSchema>;

export const ParticleExplosionTemplate: React.FC<ParticleExplosionProps> = ({
	text,
	duration,
	color,
	fontSize,
	bgColor,
	particleCount,
	explosionRadius,
	explosionIntensity,
	particleSize,
	gravity,
	fadeSpeed,
	colorVariation,
	sparkles,
	shockwave,
	textBehavior,
}) => {
	const frame = useCurrentFrame();
	const { fps, width, height } = useVideoConfig();

	const totalDuration = duration * fps;
	const explosionStart = fps * 0.5; // Start explosion after 0.5 seconds
	const explosionTime = (frame - explosionStart) / fps;

	// Generate particles
	const generateParticles = () => {
		if (explosionTime < 0) return [];

		const particles = [];

		for (let i = 0; i < particleCount; i++) {
			// Generate consistent random values per particle
			const seed = i * 12345;
			const random1 = ((seed * 9301 + 49297) % 233280) / 233280;
			const random2 = (((seed + 1) * 9301 + 49297) % 233280) / 233280;
			const random3 = (((seed + 2) * 9301 + 49297) % 233280) / 233280;
			const random4 = (((seed + 3) * 9301 + 49297) % 233280) / 233280;

			// Particle initial properties
			const angle = random1 * Math.PI * 2;
			const velocity =
				(random2 * 0.5 + 0.5) * explosionRadius * explosionIntensity;
			const particleLife = 1 + random3 * 2; // 1-3 seconds

			// Calculate particle position with boundary constraints
			const baseX = Math.cos(angle) * velocity * explosionTime;
			const baseY =
				Math.sin(angle) * velocity * explosionTime -
				gravity * explosionTime * explosionTime * 200;

			// Keep particles within video boundaries
			const particleX = Math.max(-width / 2, Math.min(width / 2, baseX));
			const particleY = Math.max(-height / 2, Math.min(height / 2, baseY));

			// Particle opacity and size with total duration awareness
			const maxLife = Math.min(
				particleLife * fadeSpeed,
				totalDuration / fps - 0.5,
			);
			const particleOpacity = interpolate(explosionTime, [0, maxLife], [1, 0], {
				extrapolateRight: "clamp",
			});

			const particleScale = interpolate(
				explosionTime,
				[0, 0.2, particleLife],
				[0.5, 1, 0.3],
				{ extrapolateRight: "clamp" },
			);

			// Color variation
			const particleColor = colorVariation
				? `hsl(${(random4 * 60 + frame * 2) % 360}, 70%, ${50 + random3 * 30}%)`
				: color;

			particles.push(
				<div
					key={i}
					style={{
						position: "absolute",
						left: "50%",
						top: "50%",
						width: `${particleSize * particleScale}px`,
						height: `${particleSize * particleScale}px`,
						backgroundColor: particleColor,
						opacity: particleOpacity,
						borderRadius: "50%",
						transform: `translate(${particleX}px, ${particleY}px)`,
						boxShadow: sparkles
							? `0 0 ${particleSize * 2}px ${particleColor}`
							: "none",
					}}
				/>,
			);
		}

		return particles;
	};

	// Generate shockwave effect
	const generateShockwave = () => {
		if (!shockwave || explosionTime < 0) return null;

		const shockwaveRadius = interpolate(
			explosionTime,
			[0, 1],
			[0, explosionRadius * 2],
			{ extrapolateRight: "clamp" },
		);

		const shockwaveOpacity = interpolate(
			explosionTime,
			[0, 0.3, 1],
			[0, 0.6, 0],
			{ extrapolateRight: "clamp" },
		);

		return (
			<div
				style={{
					position: "absolute",
					left: "50%",
					top: "50%",
					width: `${shockwaveRadius * 2}px`,
					height: `${shockwaveRadius * 2}px`,
					border: `3px solid ${color}`,
					borderRadius: "50%",
					opacity: shockwaveOpacity,
					transform: "translate(-50%, -50%)",
					pointerEvents: "none",
				}}
			/>
		);
	};

	// Text rendering based on behavior
	const renderText = () => {
		const baseStyles = {
			color: colorVariation ? `hsl(${frame % 360}, 70%, 60%)` : color,
			fontSize,
			fontFamily: "Arial, sans-serif",
			fontWeight: "bold",
			textAlign: "center" as const,
			margin: 0,
			textShadow: `0 0 ${20}px ${color}`,
		};

		switch (textBehavior) {
			case "static":
				return <h1 style={baseStyles}>{text}</h1>;

			case "shatter":
				if (explosionTime < 0) {
					return <h1 style={baseStyles}>{text}</h1>;
				}

				const characters = text.split("");
				return (
					<h1
						style={{ ...baseStyles, display: "flex", justifyContent: "center" }}
					>
						{characters.map((char, index) => {
							const charAngle = (index / characters.length) * Math.PI * 2;
							const charVelocity = 100 + Math.random() * 100;
							const charX = Math.cos(charAngle) * charVelocity * explosionTime;
							const charY =
								Math.sin(charAngle) * charVelocity * explosionTime -
								gravity * explosionTime * explosionTime * 100;

							const charOpacity = interpolate(explosionTime, [0, 2], [1, 0], {
								extrapolateRight: "clamp",
							});

							return (
								<span
									key={index}
									style={{
										display: "inline-block",
										transform: `translate(${charX}px, ${charY}px) rotate(${explosionTime * 360}deg)`,
										opacity: charOpacity,
										color: colorVariation
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

			case "reform":
				if (explosionTime < 0) {
					return <h1 style={baseStyles}>{text}</h1>;
				}

				const reformChars = text.split("");
				return (
					<h1
						style={{ ...baseStyles, display: "flex", justifyContent: "center" }}
					>
						{reformChars.map((char, index) => {
							const reformProgress = interpolate(
								explosionTime,
								[1, 3],
								[0, 1],
								{ extrapolateRight: "clamp" },
							);

							const charAngle = (index / reformChars.length) * Math.PI * 2;
							const maxDistance = 200;
							const charX =
								Math.cos(charAngle) * maxDistance * (1 - reformProgress);
							const charY =
								Math.sin(charAngle) * maxDistance * (1 - reformProgress);

							return (
								<span
									key={index}
									style={{
										display: "inline-block",
										transform: `translate(${charX}px, ${charY}px)`,
										opacity: explosionTime > 1 ? reformProgress : 1,
										color: colorVariation
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

			case "pulse":
				const pulseScale = 1 + Math.sin(frame / 10) * 0.2;
				const pulseGlow = 20 + Math.sin(frame / 8) * 15;

				return (
					<h1
						style={{
							...baseStyles,
							transform: `scale(${pulseScale})`,
							textShadow: `0 0 ${pulseGlow}px ${color}`,
						}}
					>
						{text}
					</h1>
				);

			default:
				return <h1 style={baseStyles}>{text}</h1>;
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
			{generateParticles()}
			{generateShockwave()}
			{renderText()}
		</div>
	);
};
