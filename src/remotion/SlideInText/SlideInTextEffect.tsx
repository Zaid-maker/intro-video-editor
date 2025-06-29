import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { z } from 'zod';

export const slideInTextSchema = z.object({
    text: z.string().default('Your Slide In Text'),
    duration: z.number().min(1).max(10).default(2),
    color: z.string().default('#ffffff'),
    fontSize: z.number().default(60),
    bgColor: z.string().default('#000000'),
    direction: z.enum(['left', 'right', 'top', 'bottom']).default('left'),
    bounce: z.boolean().default(false),
});

type SlideInTextProps = z.infer<typeof slideInTextSchema>;

export const SlideInTextEffect: React.FC<SlideInTextProps> = ({
    text,
    duration,
    color,
    fontSize,
    bgColor,
    direction,
    bounce,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const slideDuration = duration * fps;
    
    // Calculate slide animation based on direction
    let slideValue = 0;
    let bounceValue = 0;
    
    if (direction === 'left') {
        slideValue = interpolate(
            frame,
            [0, slideDuration],
            [-100, 0],
            { extrapolateRight: 'clamp' }
        );
    } else if (direction === 'right') {
        slideValue = interpolate(
            frame,
            [0, slideDuration],
            [100, 0],
            { extrapolateRight: 'clamp' }
        );
    } else if (direction === 'top') {
        slideValue = interpolate(
            frame,
            [0, slideDuration],
            [-100, 0],
            { extrapolateRight: 'clamp' }
        );
    } else if (direction === 'bottom') {
        slideValue = interpolate(
            frame,
            [0, slideDuration],
            [100, 0],
            { extrapolateRight: 'clamp' }
        );
    }

    // Add bounce effect if enabled
    if (bounce) {
        bounceValue = interpolate(
            frame,
            [slideDuration, slideDuration + fps],
            [0, 20],
            { extrapolateRight: 'clamp' }
        );
    }

    const transform = direction === 'left' || direction === 'right' 
        ? `translateX(${slideValue}px) translateY(${bounceValue}px)`
        : `translateY(${slideValue}px) translateX(${bounceValue}px)`;

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
                    fontFamily: 'Arial, sans-serif',
                    fontWeight: 'bold',
                    transform,
                    textAlign: 'center',
                    margin: 0,
                    transition: 'transform 0.3s ease-out',
                }}
            >
                {text}
            </h1>
        </div>
    );
}; 