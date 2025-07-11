import { FONT_WEIGHTS, FONTS, ANIMATIONS, TRANSITIONS } from "@/lib/data";
import { z } from "zod";

export const textPropsSchema = z.object({
    // Template Selection
    templateId: z.string().default("Typewriter"),
    
    // Basic Text Properties
    text: z.string().default("Your Text Here"),
    title: z.string().optional(),
    body: z.string().optional(),
    
    // Content 2
    reviewTitle: z.string().optional(),
    reviewBody: z.string().optional(),
    
    // Font Properties
    fontFamily: z.enum(FONTS as [string, ...string[]]).default("inter"),
    fontWeight: z.enum(FONT_WEIGHTS.map(fw => fw.value) as [string, ...string[]]).default("400"),
    fontSize: z.number().default(70),
    color: z.string().default("#ffffff"),
    backgroundColor: z.string().default("#000000"),
    letterSpacing: z.number().min(0).max(20).default(5),
    opacity: z.number().min(0).max(100).default(100),
    textAlign: z.enum(["left", "center", "right"]).default("left"),
    
    // Animation Properties
    animationType: z.enum(ANIMATIONS as [string, ...string[]]).default("fade"),
    transition: z.enum(TRANSITIONS as [string, ...string[]]).default("ease"),
    duration: z.number().min(0.5).max(10).default(3),
    
    // Advanced Template Properties
    speed: z.number().default(5), // For typewriter
    fadeType: z.enum(['simple', 'letterByLetter', 'wordByWord', 'particles', 'blur', 'wave']).default('simple'),
    slideType: z.enum(['simple', 'elastic', 'cascade', 'wave', 'flip3d', 'parallax']).default('simple'),
    direction: z.enum(['left', 'right', 'top', 'bottom', 'diagonal', 'spiral', 'zoom']).default('left'),
    easing: z.enum(['linear', 'easeIn', 'easeOut', 'easeInOut', 'bounce', 'elastic']).default('easeOut'),
    
    // Effect toggles
    rotationEffect: z.boolean().default(false),
    scaleEffect: z.boolean().default(false),
    colorShift: z.boolean().default(false),
    glowEffect: z.boolean().default(false),
    particleEffect: z.boolean().default(false),
    
    // Position controls
    positionX: z.number().default(0),
    positionY: z.number().default(0),
    
    // Background media
    backgroundMedia: z.string().default(""),
    backgroundMediaType: z.enum(['image', 'video']).default("image"),
    backgroundMediaOpacity: z.number().min(0).max(100).default(100),
    
    // Audio settings
    backgroundMusic: z.string().default(""),
    musicVolume: z.number().min(0).max(100).default(70),
})

export type TextProps = z.infer<typeof textPropsSchema>;