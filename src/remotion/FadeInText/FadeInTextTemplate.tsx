import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { z } from 'zod';

export const fadeInTextSchema = z.object({
    text: z.string().default('Your Fade In Text'),
    duration: z.number().min(1).max(10).default(3),
    color: z.string().default('#ffffff'),
    fontSize: z.number().default(60),
    bgColor: z.string().default('#000000'),
    fontFamily: z.string().default('Arial, sans-serif'),
    fontWeight: z.string().default('bold'),
});

type FadeInTextProps = z.infer<typeof fadeInTextSchema>;

export const FadeInTextTemplate: React.FC<FadeInTextProps> = ({
    text,
    duration,
    color,
    fontSize,
    bgColor,
    fontFamily,
    fontWeight,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Calculate fade in animation
    const fadeInDuration = duration * fps;
    const fadeInProgress = interpolate(
        frame,
        [0, fadeInDuration],
        [0, 1],
        { extrapolateRight: 'clamp' }
    );

    // Add a subtle scale animation
    const scale = interpolate(
        frame,
        [0, fadeInDuration * 0.5],
        [0.8, 1],
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
                    fontFamily,
                    fontWeight,
                    opacity: fadeInProgress,
                    transform: `scale(${scale})`,
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