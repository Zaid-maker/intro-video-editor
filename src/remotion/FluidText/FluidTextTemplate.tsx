
'use client'

import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { z } from 'zod';

export const fluidTextSchema = z.object({
    text: z.string().default('Fluid Animation'),
    duration: z.number().min(1).max(10).default(4),
    color: z.string().default('#ffffff'),
    fontSize: z.number().default(70),
    bgColor: z.string().default('#111111'),
    waveIntensity: z.number().min(1).max(20).default(10),
    waveSpeed: z.number().min(1).max(10).default(5),
});

type FluidTextProps = z.infer<typeof fluidTextSchema>;

export const FluidTextTemplate: React.FC<FluidTextProps> = ({
    text,
    duration,
    color,
    fontSize,
    bgColor,
    waveIntensity,
    waveSpeed,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const totalDuration = duration * fps;

    const characters = text.split('');

    return (
        <div style={{ 
            flex: 1, 
            backgroundColor: bgColor, 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 50,
            overflow: 'hidden'
        }}>
            <h1
                style={{
                    color,
                    fontSize,
                    fontFamily: 'Helvetica, sans-serif',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    margin: 0,
                    display: 'flex',
                }}
            >
                {characters.map((char, index) => {
                    const wave = Math.sin(frame / (waveSpeed * 5) + index / 3) * waveIntensity;
                    const fadeInDuration = totalDuration / 2;
                    const fadeInStart = (index / characters.length) * fadeInDuration;

                    const fadeIn = interpolate(
                        frame,
                        [fadeInStart, fadeInStart + fadeInDuration],
                        [0, 1],
                        { extrapolateRight: 'clamp' }
                    );

                    return (
                        <span
                            key={index}
                            style={{
                                transform: `translateY(${wave}px)`,
                                opacity: fadeIn,
                                display: 'inline-block',
                            }}
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                    );
                })}
            </h1>
        </div>
    );
};
