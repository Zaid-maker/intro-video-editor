'use client'

import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { z } from 'zod';

export const typewriterSchema = z.object({
    text: z.string().default('Your Typewriter Text'),
    speed: z.number().min(1).default(5),
    color: z.string().default('#ffffff'),
    fontSize: z.number().default(60),
    bgColor: z.string().default('#000000'),
});

type TypewriterProps = z.infer<typeof typewriterSchema>;

export const TypewriterTemplate: React.FC<TypewriterProps> = ({
    text,
    speed,
    color,
    fontSize,
    bgColor,
}) => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames, width, height } = useVideoConfig();

    // Calculate frames per character based on fps and speed (characters per second)
    const framesPerChar = fps / speed;
    const charsToShow = Math.min(text.length, Math.floor(frame / framesPerChar));
    const displayed = text.slice(0, charsToShow);

    // Calculate total animation duration in frames
    const totalAnimationFrames = text.length * framesPerChar;
    
    // Use durationInFrames to determine when to start fading out the cursor
    const fadeStartFrame = Math.min(totalAnimationFrames, durationInFrames - fps); // Start fading 1 second before end
    const fadeEndFrame = Math.min(totalAnimationFrames + fps, durationInFrames); // End fading at video end

    // Cursor blink: blink every 30 frames (0.5s at 60fps, 1s at 30fps)
    const blink = Math.floor(frame / (fps / 2)) % 2 === 0;
    const cursorOpacity = interpolate(
        frame,
        [fadeStartFrame, fadeEndFrame],
        [1, 0],
        { extrapolateRight: 'clamp' }
    ) * (blink ? 1 : 0.2);

    // Pop scale for the most recent character
    let popScale = 1;
    if (charsToShow > 0 && charsToShow <= text.length) {
        const charAppearFrame = charsToShow * framesPerChar;
        // Pop lasts for 6 frames
        const popDuration = 6;
        const popStart = charAppearFrame - popDuration;
        if (frame >= popStart && frame <= charAppearFrame) {
            popScale = interpolate(
                frame,
                [popStart, charAppearFrame],
                [1.4, 1],
                { extrapolateRight: 'clamp' }
            );
        }
    }

    return (
        <div style={{ flex: 1, backgroundColor: bgColor, width, height, padding: 50 }}>
            <span
                style={{
                    color,
                    fontSize,
                    fontFamily: 'Courier New, monospace',
                    whiteSpace: 'pre-wrap',
                }}
            >
                {displayed.slice(0, -1)}
                {charsToShow > 0 && (
                    <span style={{ display: 'inline-block', transform: `scale(${popScale})` }}>
                        {displayed.slice(-1)}
                    </span>
                )}
                <span style={{ opacity: cursorOpacity, transition: 'opacity 0.1s' }}>|</span>
            </span>
        </div>
    );
};