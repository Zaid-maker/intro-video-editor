'use client'

import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { z } from 'zod';

export const bounceTextSchema = z.object({
    text: z.string().default('Bounce!'),
    duration: z.number().min(1).max(5).default(2),
    color: z.string().default('#ffffff'),
    fontSize: z.number().default(60),
    bgColor: z.string().default('#000000'),
    bounceIntensity: z.number().min(1).max(10).default(5),
    bounceCount: z.number().min(1).max(10).default(3),
});

type BounceTextProps = z.infer<typeof bounceTextSchema>;

export const BounceTextTemplate: React.FC<BounceTextProps> = ({
    text,
    duration,
    color,
    fontSize,
    bgColor,
    bounceIntensity,
    bounceCount,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const totalDuration = duration * fps;
    const bounceDuration = totalDuration / (bounceCount + 1);
    
    // Calculate bounce animation
    const bounceProgress = (frame % bounceDuration) / bounceDuration;
    const bounceHeight = interpolate(
        bounceProgress,
        [0, 0.5, 1],
        [0, bounceIntensity * 10, 0],
        { extrapolateRight: 'clamp' }
    );

    // Fade in effect
    const fadeIn = interpolate(
        frame,
        [0, totalDuration * 0.3],
        [0, 1],
        { extrapolateRight: 'clamp' }
    );

    return (
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
                    fontFamily: 'Arial, sans-serif',
                    fontWeight: 'bold',
                    opacity: fadeIn,
                    transform: `translateY(-${bounceHeight}px)`,
                    textAlign: 'center',
                    margin: 0,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                }}
            >
                {text}
            </h1>
        </div>
    );
};