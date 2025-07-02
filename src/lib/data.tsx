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