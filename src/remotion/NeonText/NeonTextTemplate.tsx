
'use client'

import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { z } from 'zod';

export const neonTextSchema = z.object({
    text: z.string().default('Neon Glow'),
    duration: z.number().min(1).max(10).default(4),
    color: z.string().default('#00ffff'),
    fontSize: z.number().default(90),
    bgColor: z.string().default('#000000'),
    glowIntensity: z.number().min(1).max(20).default(10),
});

type NeonTextProps = z.infer<typeof neonTextSchema>;

export const NeonTextTemplate: React.FC<NeonTextProps> = ({
    text,
    duration,
    color,
    fontSize,
    bgColor,
    glowIntensity,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const totalDuration = duration * fps;

    const flicker = interpolate(
        frame,
        [0, totalDuration / 3, (2 * totalDuration) / 3, totalDuration],
        [0.7, 1, 0.8, 1],
        { extrapolateRight: 'clamp' }
    );

    let textShadowValue = 'none';
    if (/^#[0-9a-fA-F]{6}$/.test(color)) {
        const glowColor = color.substring(1);
        const r = parseInt(glowColor.substring(0, 2), 16);
        const g = parseInt(glowColor.substring(2, 4), 16);
        const b = parseInt(glowColor.substring(4, 6), 16);

        textShadowValue = `
            0 0 ${glowIntensity}px rgba(${r}, ${g}, ${b}, 0.8),
            0 0 ${glowIntensity * 2}px rgba(${r}, ${g}, ${b}, 0.6),
            0 0 ${glowIntensity * 3}px rgba(${r}, ${g}, ${b}, 0.4),
            0 0 ${glowIntensity * 4}px rgba(${r}, ${g}, ${b}, 0.2)
        `;
    }

    return (
        <>
            <div style={{
                flex: 1,
                backgroundColor: bgColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 50
            }}>
                <h1
                    style={{
                        color,
                        fontSize,
                        fontFamily: "'Monoton', cursive",
                        fontWeight: 'normal',
                        textAlign: 'center',
                        margin: 0,
                        opacity: flicker,
                        textShadow: textShadowValue,
                    }}
                >
                    {text}
                </h1>
            </div>
        </>
    );
};
