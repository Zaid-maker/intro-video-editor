import { bounceTextSchema, BounceTextTemplate } from "@/remotion/BounceText/BounceTextTemplate";
import { fadeInTextSchema, FadeInTextTemplate } from "@/remotion/FadeInText/FadeInTextTemplate";
import { slideInTextSchema, SlideInTextTemplate } from "@/remotion/SlideInText/SlideInTextTemplate";
import { typewriterSchema, TypewriterTemplate } from "@/remotion/Typewriter/TypewriterTemplate";

type TemplateEntry = {
    id: string;
    comp: any;
    schema: any;
    defaultProps: any;
    description?: string;
};


export const templates: TemplateEntry[] = [
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
