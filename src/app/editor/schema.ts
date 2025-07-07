import { FONT_WEIGHTS, FONTS } from "@/lib/data";
import { z } from "zod";

export const textPropsSchema = z.object({
    title: z.string().optional(),
    body: z.string().optional(),
    fontFamily: z.enum(FONTS as [string, ...string[]]).default("inter"),
    fontWeight: z.enum(FONT_WEIGHTS.map(fw => fw.value) as [string, ...string[]]).default("400"),
    fontSize: z.string().default("16"),
    color: z.string().default("#ffffff"),
    backgroundColor: z.string().default("#000000"),
    letterSpacing: z.number().min(0).max(20).default(5),
    opacity: z.number().min(0).max(100).default(100),
    textAlign: z.enum(["left", "center", "right"]).default("left"),
})

export type TextProps = z.infer<typeof textPropsSchema>;