'use client'

import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { z } from 'zod';

export const funTextSchema = z.object({
    text: z.string().default('So Much Fun!'),
    duration: z.number().min(1).max(10).default(3),
    color: z.string().default('#ff69b4'),
    fontSize: z.number().default(80),
    bgColor: z.string().default('#f0f8ff'),
    jumpHeight: z.number().min(1).max(50).default(30),
    rotationRange: z.number().min(0).max(90).default(20),
});

type FunTextProps = z.infer<typeof funTextSchema>;

export const FunTextTemplate: React.FC<FunTextProps> = ({
    text,
    duration,
    color,
    fontSize,
    bgColor,
    jumpHeight,
    rotationRange,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const totalDuration = duration * fps;

    const characters = text.split('');

    return (
        <>
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
                        fontSize,
                        fontFamily: "'Comic Sans MS', cursive, sans-serif",
                        fontWeight: 'bold',
                        textAlign: 'center',
                        margin: 0,
                        display: 'flex',
                    }}
                >
                    {characters.map((char, index) => {
                        const jump = -Math.sin(frame / 5 + index) * jumpHeight;
                        const rotation = Math.sin(frame / 8 + index) * rotationRange;
                        const charColor = `hsl(${(frame + index * 20) % 360}, 90%, 60%)`;

                        return (
                            <span
                                key={index}
                                style={{
                                    transform: `translateY(${jump}px) rotate(${rotation}deg)`,
                                    display: 'inline-block',
                                    color: charColor,
                                }}
                            >
                                {char === ' ' ? '\u00A0' : char}
                            </span>
                        );
                    })}
                </h1>
            </div>
        </>
    );
};
