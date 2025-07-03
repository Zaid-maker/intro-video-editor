import { bounceTextSchema, BounceTextTemplate } from "@/remotion/BounceText/BounceTextTemplate";
import { fadeInTextSchema, FadeInTextTemplate } from "@/remotion/FadeInText/FadeInTextTemplate";
import { fluidTextSchema, FluidTextTemplate } from "@/remotion/FluidText/FluidTextTemplate";
import { funTextSchema, FunTextTemplate } from "@/remotion/FunText/FunTextTemplate";
import { neonTextSchema, NeonTextTemplate } from "@/remotion/NeonText/NeonTextTemplate";
import { oldSchoolTextSchema, OldSchoolTextTemplate } from "@/remotion/OldSchoolText/OldSchoolTextTemplate";
import { slideInTextSchema, SlideInTextTemplate } from "@/remotion/SlideInText/SlideInTextTemplate";
import { typewriterSchema, TypewriterTemplate } from "@/remotion/Typewriter/TypewriterTemplate";
import { SimpleTitle, simpleTitleSchema } from "@/remotion/SimpleTitle/SimpleTitleTemplate";
import { LogoReveal, logoRevealSchema } from "@/remotion/LogoReveal/LogoRevealTemplate";
import { staticFile } from "remotion";

import { VIDEO_HEIGHT, VIDEO_WIDTH } from "@/types/constants";

type TemplateEntry = {
    id: string;
    comp: any;
    schema: any;
    defaultProps: any;
    description?: string;
    width: number;
    height: number;
};

export const templates: TemplateEntry[] = [
    {

        id: "Typewriter",
        comp: TypewriterTemplate,
        schema: typewriterSchema,
        width: VIDEO_WIDTH, // 1280
        height: VIDEO_HEIGHT, // 720
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
        width: VIDEO_WIDTH,
        height: VIDEO_HEIGHT,
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
        width: VIDEO_WIDTH,
        height: VIDEO_HEIGHT,
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
        width: VIDEO_WIDTH,
        height: VIDEO_HEIGHT,
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
        width: VIDEO_WIDTH,
        height: VIDEO_HEIGHT,
        defaultProps: {
            text: "Fluid Animation",
            duration: 4,
            color: "#ffffff",
            fontSize: 70,
            bgColor: "#111111",
            waveIntensity: 10,
            waveSpeed: 5,
        },
    },
    {
        id: "OldSchoolText",
        comp: OldSchoolTextTemplate,
        schema: oldSchoolTextSchema,
        width: VIDEO_WIDTH,
        height: VIDEO_HEIGHT,
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
        width: VIDEO_WIDTH,
        height: VIDEO_HEIGHT,
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
        width: VIDEO_WIDTH,
        height: VIDEO_HEIGHT,
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
        id: "SimpleTitle",
        comp: SimpleTitle,
        schema: simpleTitleSchema,
        width: 1920,
        height: 1080,
        defaultProps: {
            titleText: 'My Awesome Title',
            subtitleText: 'A catchy subtitle here',
            titleColor: { r: 255, g: 255, b: 255, a: 1 },
            subtitleColor: { r: 200, g: 200, b: 200, a: 1 },
            backgroundColor: { r: 20, g: 30, b: 100, a: 1 },
        },
        description: "A clean title and subtitle animation.",
    },
    {
        id: "LogoReveal",
        comp: LogoReveal,
        schema: logoRevealSchema,
        width: 1920,
        height: 1080,
        defaultProps: {
            logoUrl: staticFile('logo.webp'), // Make sure public/logo.webp exists
            taglineText: 'Your Company Tagline',
            taglineColor: { r: 220, g: 220, b: 220, a: 1 },
            backgroundColor: { r: 15, g: 15, b: 25, a: 1 },
            logoScale: 1,
        },
        description: "Reveals a logo with an animated tagline.",
    },
];

export const FONTS = ['inter', 'poppins', 'roboto', 'lato', 'montserrat'];
export const FONT_WEIGHTS = [
    { label: 'Thin', value: '100' },
    { label: 'Light', value: '300' },
    { label: 'Regular', value: '400' },
    { label: 'Medium', value: '500' },
    { label: 'Bold', value: '700' },
    { label: 'Black', value: '900' }
];
export const FONT_SIZES = ["12", "14", "16", "18", "20", "24", "32"];
export const COLORS = ["#F59E0B", "#8B43F7", "#ffffff", "#000000", "#22D3EE", "#4ADE80", "#F43F5E", "#3B82F6"];
export const ANIMATIONS = ['fade', 'slide', 'zoom', 'bounce', 'flip'];
export const TRANSITIONS = ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'];
