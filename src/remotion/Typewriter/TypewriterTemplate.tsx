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

    const opacity = interpolate(
        frame,
        [fadeStartFrame, fadeEndFrame],
        [1, 0],
        { extrapolateRight: 'clamp' }
    );

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
                {displayed}
                <span style={{ opacity }}>|</span>
            </span>
        </div>
    );
};