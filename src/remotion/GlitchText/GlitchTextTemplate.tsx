'use client'

import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { z } from 'zod';

export const glitchTextSchema = z.object({
    text: z.string().default('GLITCH'),
    duration: z.number().min(2).max(10).default(4),
    color: z.string().default('#00ff00'),
    fontSize: z.number().default(100),
    bgColor: z.string().default('#000000'),
    glitchIntensity: z.number().min(0.1).max(3).default(1),
    glitchSpeed: z.number().min(0.1).max(5).default(1),
    digitalNoise: z.boolean().default(true),
    colorChannels: z.boolean().default(true),
    dataCorruption: z.boolean().default(true),
    scanlines: z.boolean().default(true),
    staticNoise: z.boolean().default(true),
    textCorruption: z.boolean().default(true),
    glitchType: z.enum(['digital', 'analog', 'vhs', 'matrix', 'cyberpunk']).default('digital'),
});

type GlitchTextProps = z.infer<typeof glitchTextSchema>;

export const GlitchTextTemplate: React.FC<GlitchTextProps> = ({
    text,
    duration,
    color,
    fontSize,
    bgColor,
    glitchIntensity,
    glitchSpeed,
    digitalNoise,
    colorChannels,
    dataCorruption,
    scanlines,
    staticNoise,
    textCorruption,
    glitchType,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const totalDuration = duration * fps;
    
    // Glitch random number generator for consistent randomness
    const glitchRandom = (seed: number) => {
        const glitchFrame = Math.floor(frame * glitchSpeed);
        return ((glitchFrame + seed) * 9301 + 49297) % 233280 / 233280;
    };

    // Create color channel separation effect
    const createColorChannels = () => {
        if (!colorChannels) return null;
        
        const redOffset = glitchRandom(1) * glitchIntensity * 10 - 5;
        const greenOffset = glitchRandom(2) * glitchIntensity * 10 - 5;
        const blueOffset = glitchRandom(3) * glitchIntensity * 10 - 5;
        
        return (
            <>
                {/* Red channel */}
                <div
                    style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: `translate(-50%, -50%) translate(${redOffset}px, 0)`,
                        color: '#ff0000',
                        fontSize,
                        fontFamily: 'monospace',
                        fontWeight: '900',
                        opacity: 0.8,
                        mixBlendMode: 'screen',
                        zIndex: 1,
                    }}
                >
                    {text}
                </div>
                
                {/* Green channel */}
                <div
                    style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: `translate(-50%, -50%) translate(${greenOffset}px, 0)`,
                        color: '#00ff00',
                        fontSize,
                        fontFamily: 'monospace',
                        fontWeight: '900',
                        opacity: 0.8,
                        mixBlendMode: 'screen',
                        zIndex: 1,
                    }}
                >
                    {text}
                </div>
                
                {/* Blue channel */}
                <div
                    style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: `translate(-50%, -50%) translate(${blueOffset}px, 0)`,
                        color: '#0000ff',
                        fontSize,
                        fontFamily: 'monospace',
                        fontWeight: '900',
                        opacity: 0.8,
                        mixBlendMode: 'screen',
                        zIndex: 1,
                    }}
                >
                    {text}
                </div>
            </>
        );
    };

    // Create scanlines effect
    const createScanlines = () => {
        if (!scanlines) return null;
        
        const scanlineIntensity = glitchRandom(10) * glitchIntensity * 0.3;
        
        return (
            <div
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%',
                    background: `
                        repeating-linear-gradient(
                            0deg,
                            transparent,
                            transparent 2px,
                            rgba(0, 255, 0, ${scanlineIntensity}) 2px,
                            rgba(0, 255, 0, ${scanlineIntensity}) 4px
                        )
                    `,
                    opacity: 0.3,
                    zIndex: 3,
                    pointerEvents: 'none',
                }}
            />
        );
    };

    // Create static noise effect
    const createStaticNoise = () => {
        if (!staticNoise) return null;
        
        const noiseElements = [];
        for (let i = 0; i < 50; i++) {
            const x = glitchRandom(i + 20) * 100;
            const y = glitchRandom(i + 21) * 100;
            const size = glitchRandom(i + 22) * 5 + 1;
            const opacity = glitchRandom(i + 23) * glitchIntensity * 0.5;
            
            noiseElements.push(
                <div
                    key={i}
                    style={{
                        position: 'absolute',
                        left: `${x}%`,
                        top: `${y}%`,
                        width: `${size}px`,
                        height: `${size}px`,
                        backgroundColor: '#ffffff',
                        opacity,
                        zIndex: 2,
                    }}
                />
            );
        }
        
        return <>{noiseElements}</>;
    };

    // Create corrupted text effect
    const createCorruptedText = () => {
        if (!textCorruption) return null;
        
        const corruptedText = text.split('').map((char, index) => {
            const shouldCorrupt = glitchRandom(index + 50) < glitchIntensity * 0.3;
            if (shouldCorrupt) {
                const corruptChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
                const corruptIndex = Math.floor(glitchRandom(index + 51) * corruptChars.length);
                return corruptChars[corruptIndex];
            }
            return char;
        }).join('');
        
        const corruptOffset = glitchRandom(60) * glitchIntensity * 20 - 10;
        
        return (
            <div
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%) translate(${corruptOffset}px, 0)`,
                    color: '#ff00ff',
                    fontSize,
                    fontFamily: 'monospace',
                    fontWeight: '900',
                    opacity: 0.6,
                    zIndex: 2,
                }}
            >
                {corruptedText}
            </div>
        );
    };

    // Create glitch blocks
    const createGlitchBlocks = () => {
        const blocks = [];
        
        for (let i = 0; i < 10; i++) {
            const blockX = glitchRandom(i + 70) * 100;
            const blockY = glitchRandom(i + 71) * 100;
            const blockWidth = glitchRandom(i + 72) * 20 + 10;
            const blockHeight = glitchRandom(i + 73) * 10 + 5;
            const blockOpacity = glitchRandom(i + 74) * glitchIntensity * 0.5;
            
            const blockColor = (() => {
                switch (glitchType) {
                    case 'digital':
                        return '#00ff00';
                    case 'analog':
                        return '#ff0066';
                    case 'vhs':
                        return '#ffff00';
                    case 'matrix':
                        return '#00ffaa';
                    case 'cyberpunk':
                        return '#ff0099';
                    default:
                        return '#ffffff';
                }
            })();
            
            blocks.push(
                <div
                    key={i}
                    style={{
                        position: 'absolute',
                        left: `${blockX}%`,
                        top: `${blockY}%`,
                        width: `${blockWidth}px`,
                        height: `${blockHeight}px`,
                        backgroundColor: blockColor,
                        opacity: blockOpacity,
                        zIndex: 1,
                    }}
                />
            );
        }
        
        return blocks;
    };

    // Main text rendering with glitch effects
    const renderMainText = () => {
        const mainOffset = glitchRandom(80) * glitchIntensity * 5 - 2.5;
        const mainSkew = glitchRandom(81) * glitchIntensity * 10 - 5;
        const mainScale = 1 + (glitchRandom(82) * glitchIntensity * 0.2 - 0.1);
        
        const textColor = (() => {
            switch (glitchType) {
                case 'digital':
                    return '#00ff00';
                case 'analog':
                    return '#ffffff';
                case 'vhs':
                    return '#ffaaaa';
                case 'matrix':
                    return '#00ffaa';
                case 'cyberpunk':
                    return '#ff0099';
                default:
                    return color;
            }
        })();
        
        return (
            <div
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%) translate(${mainOffset}px, 0) skew(${mainSkew}deg) scale(${mainScale})`,
                    color: textColor,
                    fontSize,
                    fontFamily: 'monospace',
                    fontWeight: '900',
                    textShadow: `
                        0 0 10px ${textColor},
                        0 0 20px ${textColor},
                        0 0 30px ${textColor}
                    `,
                    zIndex: 3,
                }}
            >
                {text}
            </div>
        );
    };

    // Create data corruption lines
    const createDataCorruption = () => {
        if (!dataCorruption) return null;
        
        const lines = [];
        for (let i = 0; i < 20; i++) {
            const lineY = glitchRandom(i + 90) * 100;
            const lineWidth = glitchRandom(i + 91) * 80 + 20;
            const lineHeight = glitchRandom(i + 92) * 3 + 1;
            const lineOpacity = glitchRandom(i + 93) * glitchIntensity * 0.3;
            
            lines.push(
                <div
                    key={i}
                    style={{
                        position: 'absolute',
                        left: '10%',
                        top: `${lineY}%`,
                        width: `${lineWidth}%`,
                        height: `${lineHeight}px`,
                        backgroundColor: '#ff0000',
                        opacity: lineOpacity,
                        zIndex: 1,
                    }}
                />
            );
        }
        
        return lines;
    };

    return (
        <div style={{ 
            flex: 1, 
            backgroundColor: bgColor, 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 50,
            position: 'relative',
            overflow: 'hidden'
        }}>
            {createGlitchBlocks()}
            {createDataCorruption()}
            {digitalNoise && createStaticNoise()}
            {createColorChannels()}
            {createCorruptedText()}
            {renderMainText()}
            {createScanlines()}
        </div>
    );
};
