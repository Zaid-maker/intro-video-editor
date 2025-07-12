import {
	COMP_NAME,
	defaultMyCompProps,
	DURATION_IN_FRAMES,
	VIDEO_FPS,
	VIDEO_HEIGHT,
	VIDEO_WIDTH,
} from "@/types/constants";
import { Composition } from "remotion";
import {
	bounceTextSchema,
	BounceTextTemplate,
} from "./BounceText/BounceTextTemplate";
import {
	fadeInTextSchema,
	FadeInTextTemplate,
} from "./FadeInText/FadeInTextTemplate";
import {
	fluidTextSchema,
	FluidTextTemplate,
} from "./FluidText/FluidTextTemplate";
import { funTextSchema, FunTextTemplate } from "./FunText/FunTextTemplate";
import {
	glitchTextSchema,
	GlitchTextTemplate,
} from "./GlitchText/GlitchTextTemplate";
import { Main } from "./MyComp/Main";
import { neonTextSchema, NeonTextTemplate } from "./NeonText/NeonTextTemplate";
import {
	oldSchoolTextSchema,
	OldSchoolTextTemplate,
} from "./OldSchoolText/OldSchoolTextTemplate";
import {
	particleExplosionSchema,
	ParticleExplosionTemplate,
} from "./ParticleExplosion/ParticleExplosionTemplate";
import {
	slideInTextSchema,
	SlideInTextTemplate,
} from "./SlideInText/SlideInTextTemplate";
import { text3DSchema, Text3DTemplate } from "./Text3D/Text3DTemplate";
import {
	typewriterSchema,
	TypewriterTemplate,
} from "./Typewriter/TypewriterTemplate";

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="Typewriter"
				component={TypewriterTemplate}
				durationInFrames={150}
				fps={30}
				width={1280}
				height={720}
				defaultProps={{
					text: "Your Typewriter Text Here",
					speed: 4,
					color: "#ffffff",
					fontSize: 70,
					bgColor: "#000000",
					typewriterStyle: "classic",
					cursorStyle: "line",
					soundEffect: false,
					characterDelay: 0,
					wordDelay: 0,
					showCursor: true,
					textShadow: false,
					backgroundEffect: "none",
				}}
				schema={typewriterSchema}
			/>
			<Composition
				id="FadeInText"
				component={FadeInTextTemplate}
				durationInFrames={180}
				fps={30}
				width={1280}
				height={720}
				defaultProps={{
					text: "Your Fade In Text",
					duration: 3,
					color: "#ffffff",
					fontSize: 70,
					bgColor: "#000000",
					fontFamily: "Arial, sans-serif",
					fontWeight: "bold",
					fadeType: "simple",
					easing: "easeOut",
					particleCount: 30,
					blurIntensity: 5,
					rotationEffect: false,
					colorShift: false,
					backgroundParticles: false,
					glowEffect: false,
				}}
				schema={fadeInTextSchema}
			/>
			<Composition
				id="SlideInText"
				component={SlideInTextTemplate}
				durationInFrames={120}
				fps={30}
				width={1280}
				height={720}
				defaultProps={{
					text: "Your Slide In Text",
					duration: 2,
					color: "#ffffff",
					fontSize: 70,
					bgColor: "#000000",
					direction: "left",
					bounce: false,
					slideType: "simple",
					easing: "easeOut",
					rotationEffect: false,
					scaleEffect: false,
					perspectiveEffect: false,
					particleTrail: false,
					colorShift: false,
					glowEffect: false,
				}}
				schema={slideInTextSchema}
			/>
			<Composition
				id="BounceText"
				component={BounceTextTemplate}
				durationInFrames={120}
				fps={30}
				width={1280}
				height={720}
				defaultProps={{
					text: "Bounce!",
					duration: 2,
					color: "#ffffff",
					fontSize: 70,
					bgColor: "#000000",
					bounceIntensity: 5,
					bounceCount: 3,
					physicsType: "gravity",
					damping: 0.8,
					gravity: 0.5,
					elasticity: 0.7,
					rotationBounce: false,
					scaleBounce: false,
					colorShift: false,
					glowEffect: false,
					trailEffect: false,
					particleExplosion: false,
				}}
				schema={bounceTextSchema}
			/>
			<Composition
				id={COMP_NAME}
				component={Main}
				durationInFrames={DURATION_IN_FRAMES}
				fps={VIDEO_FPS}
				width={VIDEO_WIDTH}
				height={VIDEO_HEIGHT}
				defaultProps={defaultMyCompProps}
			/>

			<Composition
				id="FluidText"
				component={FluidTextTemplate}
				durationInFrames={120}
				fps={30}
				width={1280}
				height={720}
				defaultProps={{
					text: "Fluid Animation",
					duration: 4,
					color: "#00ffff",
					fontSize: 70,
					bgColor: "#001122",
					waveIntensity: 15,
					waveSpeed: 3,
					fluidType: "wave",
					colorShift: true,
					glowEffect: true,
				}}
				schema={fluidTextSchema}
			/>
			<Composition
				id="OldSchoolText"
				component={OldSchoolTextTemplate}
				durationInFrames={90}
				fps={30}
				width={1280}
				height={720}
				defaultProps={{
					text: "Old School Cool",
					duration: 3,
					color: "#f0f0f0",
					fontSize: 80,
					bgColor: "#333333",
					scanlineIntensity: 0.1,
					withShadow: true,
				}}
				schema={oldSchoolTextSchema}
			/>
			<Composition
				id="NeonText"
				component={NeonTextTemplate}
				durationInFrames={120}
				fps={30}
				width={1280}
				height={720}
				defaultProps={{
					text: "Neon Glow",
					duration: 4,
					color: "#00ffff",
					fontSize: 90,
					bgColor: "#000000",
					glowIntensity: 10,
				}}
				schema={neonTextSchema}
			/>
			<Composition
				id="FunText"
				component={FunTextTemplate}
				durationInFrames={90}
				fps={30}
				width={1280}
				height={720}
				defaultProps={{
					text: "So Much Fun!",
					duration: 3,
					color: "#ff69b4",
					fontSize: 80,
					bgColor: "#f0f8ff",
					jumpHeight: 30,
					rotationRange: 20,
					multicolor: true,
				}}
				schema={funTextSchema}
			/>
			<Composition
				id="ParticleExplosion"
				component={ParticleExplosionTemplate}
				durationInFrames={120}
				fps={30}
				width={1280}
				height={720}
				defaultProps={{
					text: "BOOM!",
					duration: 4,
					color: "#ff4444",
					fontSize: 100,
					bgColor: "#000000",
					particleCount: 200,
					explosionRadius: 300,
					explosionIntensity: 1.5,
					particleSize: 3,
					gravity: 0.5,
					fadeSpeed: 0.8,
					colorVariation: true,
					sparkles: true,
					shockwave: true,
					textBehavior: "shatter",
				}}
				schema={particleExplosionSchema}
			/>
			<Composition
				id="Text3D"
				component={Text3DTemplate}
				durationInFrames={120}
				fps={30}
				width={1280}
				height={720}
				defaultProps={{
					text: "3D TEXT",
					duration: 4,
					color: "#00aaff",
					fontSize: 120,
					bgColor: "#000000",
					depth: 20,
					rotationX: 0,
					rotationY: 0,
					rotationZ: 0,
					perspective: 1000,
					lightIntensity: 1,
					shadowIntensity: 0.8,
					metallic: false,
					animated: true,
					rotationSpeed: 1,
					colorGradient: true,
					environmentReflection: false,
				}}
				schema={text3DSchema}
			/>
			<Composition
				id="GlitchText"
				component={GlitchTextTemplate}
				durationInFrames={120}
				fps={30}
				width={1280}
				height={720}
				defaultProps={{
					text: "GLITCH",
					duration: 4,
					color: "#00ff00",
					fontSize: 100,
					bgColor: "#000000",
					glitchIntensity: 1,
					glitchSpeed: 1,
					digitalNoise: true,
					colorChannels: true,
					dataCorruption: true,
					scanlines: true,
					staticNoise: true,
					textCorruption: true,
					glitchType: "digital",
				}}
				schema={glitchTextSchema}
			/>
		</>
	);
};
