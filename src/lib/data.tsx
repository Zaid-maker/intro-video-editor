import {
	bounceTextSchema,
	BounceTextTemplate,
} from "@/remotion/BounceText/BounceTextTemplate";
import {
	fadeInTextSchema,
	FadeInTextTemplate,
} from "@/remotion/FadeInText/FadeInTextTemplate";
import {
	fluidTextSchema,
	FluidTextTemplate,
} from "@/remotion/FluidText/FluidTextTemplate";
import {
	funTextSchema,
	FunTextTemplate,
} from "@/remotion/FunText/FunTextTemplate";
import {
	neonTextSchema,
	NeonTextTemplate,
} from "@/remotion/NeonText/NeonTextTemplate";
import {
	oldSchoolTextSchema,
	OldSchoolTextTemplate,
} from "@/remotion/OldSchoolText/OldSchoolTextTemplate";
import {
	slideInTextSchema,
	SlideInTextTemplate,
} from "@/remotion/SlideInText/SlideInTextTemplate";
import {
	typewriterSchema,
	TypewriterTemplate,
} from "@/remotion/Typewriter/TypewriterTemplate";
import {
	particleExplosionSchema,
	ParticleExplosionTemplate,
} from "@/remotion/ParticleExplosion/ParticleExplosionTemplate";
import { text3DSchema, Text3DTemplate } from "@/remotion/Text3D/Text3DTemplate";
import {
	glitchTextSchema,
	GlitchTextTemplate,
} from "@/remotion/GlitchText/GlitchTextTemplate";
import { Icons } from "../../assets/Icons";
import {
	EmptyTemplate,
	emptyTemplateSchema,
} from "@/remotion/EmptyTemplate/EmptyTemplate";

type TemplateEntry = {
	id: string;
	comp: any;
	schema: any;
	defaultProps: any;
	description?: string;
};

export const templates: TemplateEntry[] = [
	{
		id: "Empty",
		comp: EmptyTemplate,
		schema: emptyTemplateSchema,
		defaultProps: {},
		description: "Start from scratch with an empty intro video.",
	},
	{
		id: "Typewriter",
		comp: TypewriterTemplate,
		schema: typewriterSchema,
		defaultProps: {
			text: "Hello!",
			speed: 5,
			color: "#fff",
			fontSize: 70,
			bgColor: "#000",
		},
	},
	{
		id: "FadeInText",
		comp: FadeInTextTemplate,
		schema: fadeInTextSchema,
		defaultProps: {
			text: "Welcome!",
			duration: 3,
			color: "#ffffff",
			fontSize: 70,
			bgColor: "#1a1a1a",
			fontFamily: "Arial, sans-serif",
			fontWeight: "bold",
		},
	},
	{
		id: "SlideInText",
		comp: SlideInTextTemplate,
		schema: slideInTextSchema,
		defaultProps: {
			text: "Slide In!",
			duration: 2,
			color: "#ffffff",
			fontSize: 70,
			bgColor: "#2d2d2d",
			direction: "left",
			bounce: false,
		},
	},
	{
		id: "BounceText",
		comp: BounceTextTemplate,
		schema: bounceTextSchema,
		defaultProps: {
			text: "Bounce!",
			duration: 2,
			color: "#ffffff",
			fontSize: 70,
			bgColor: "#3d3d3d",
			bounceIntensity: 5,
			bounceCount: 3,
		},
	},
	{
		id: "FluidText",
		comp: FluidTextTemplate,
		schema: fluidTextSchema,
		defaultProps: {
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
		},
	},
	{
		id: "OldSchoolText",
		comp: OldSchoolTextTemplate,
		schema: oldSchoolTextSchema,
		defaultProps: {
			text: "Old School Cool",
			duration: 3,
			color: "#f0f0f0",
			fontSize: 80,
			bgColor: "#333333",
			scanlineIntensity: 0.1,
		},
	},
	{
		id: "NeonText",
		comp: NeonTextTemplate,
		schema: neonTextSchema,
		defaultProps: {
			text: "Neon Glow",
			duration: 4,
			color: "#00ffff",
			fontSize: 90,
			bgColor: "#000000",
			glowIntensity: 10,
		},
	},
	{
		id: "FunText",
		comp: FunTextTemplate,
		schema: funTextSchema,
		defaultProps: {
			text: "So Much Fun!",
			duration: 3,
			color: "#ff69b4",
			fontSize: 80,
			bgColor: "#f0f8ff",
			jumpHeight: 30,
			rotationRange: 20,
		},
	},
	{
		id: "ParticleExplosion",
		comp: ParticleExplosionTemplate,
		schema: particleExplosionSchema,
		defaultProps: {
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
		},
	},
	{
		id: "Text3D",
		comp: Text3DTemplate,
		schema: text3DSchema,
		defaultProps: {
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
		},
	},
	{
		id: "GlitchText",
		comp: GlitchTextTemplate,
		schema: glitchTextSchema,
		defaultProps: {
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
		},
	},
];

export const FONTS = ["inter", "poppins", "roboto", "lato", "montserrat"];
export const FONT_WEIGHTS = [
	{ label: "Thin", value: "100" },
	{ label: "Light", value: "300" },
	{ label: "Regular", value: "400" },
	{ label: "Medium", value: "500" },
	{ label: "Bold", value: "700" },
	{ label: "Black", value: "900" },
];
export const FONT_SIZES = ["12", "14", "16", "18", "20", "24", "32"];
export const COLORS = [
	"#F59E0B",
	"#8B43F7",
	"#ffffff",
	"#000000",
	"#22D3EE",
	"#4ADE80",
	"#F43F5E",
	"#3B82F6",
];
export const ANIMATIONS = ["fade", "slide", "zoom", "bounce", "flip"];
export const TRANSITIONS = [
	"linear",
	"ease",
	"ease-in",
	"ease-out",
	"ease-in-out",
];

export const features = [
	{
		icon: <Icons.Video className="w-8 h-8" />,
		title: "20+ Premium Templates",
		description: "Hand-crafted templates for every brand and style",
	},
	{
		icon: <Icons.Palette className="w-8 h-8" />,
		title: "Real-time Customization",
		description: "See your changes instantly with live preview",
	},
	{
		icon: <Icons.Download className="w-8 h-8" />,
		title: "Instant Download",
		description: "Export in 4K quality within seconds",
	},
	{
		icon: <Icons.Clock className="w-8 h-8" />,
		title: "Lightning Fast",
		description: "Create professional intros in under 2 minutes",
	},
];

export const testimonials = [
	{
		name: "Sarah Chen",
		role: "Content Creator",
		text: "This tool completely transformed my video content. The templates are incredible!",
		rating: 5,
	},
	{
		name: "Marcus Rodriguez",
		role: "Brand Designer",
		text: "Finally, a tool that makes professional intros accessible to everyone.",
		rating: 5,
	},
	{
		name: "Lisa Park",
		role: "YouTuber",
		text: "My subscribers love the new intros. Quality is absolutely amazing.",
		rating: 5,
	},
];
