import React, { useMemo } from "react";
import { TextProps } from "../schema";

interface VideoPreviewProps {
  textProps: TextProps;
  isPlaying?: boolean;
  currentTime?: number;
}

export default function VideoPreview({ textProps, isPlaying = false, currentTime = 0 }: VideoPreviewProps) {
  // Create preview styles based on template and settings
  const previewStyles = useMemo(() => {
    const baseStyles: React.CSSProperties = {
      color: textProps.color,
      fontSize: `${textProps.fontSize}px`,
      fontFamily: textProps.fontFamily,
      fontWeight: textProps.fontWeight,
      textAlign: textProps.textAlign,
      letterSpacing: `${textProps.letterSpacing}px`,
      opacity: textProps.opacity / 100,
    };

    // Add template-specific styling
    switch (textProps.templateId) {
      case "Typewriter":
        return {
          ...baseStyles,
          fontFamily: 'Courier New, monospace',
          textShadow: textProps.glowEffect ? `0 0 10px ${textProps.color}` : 'none',
        };

      case "FadeInText":
        return {
          ...baseStyles,
          textShadow: textProps.glowEffect ? `0 0 15px ${textProps.color}` : '2px 2px 4px rgba(0,0,0,0.3)',
          transform: textProps.rotationEffect ? 'rotate(5deg)' : 'none',
        };

      case "SlideInText":
        return {
          ...baseStyles,
          textShadow: textProps.glowEffect ? `0 0 12px ${textProps.color}` : 'none',
          transform: `${textProps.rotationEffect ? 'rotate(-3deg)' : ''} ${textProps.scaleEffect ? 'scale(1.1)' : ''}`,
        };

      case "BounceText":
        return {
          ...baseStyles,
          textShadow: textProps.glowEffect ? `0 0 20px ${textProps.color}` : '2px 2px 4px rgba(0,0,0,0.3)',
          transform: textProps.rotationEffect ? 'rotate(2deg)' : 'none',
        };

      case "FluidText":
        return {
          ...baseStyles,
          textShadow: `0 0 20px ${textProps.color}, 0 0 30px ${textProps.color}`,
          background: textProps.colorShift ? `linear-gradient(45deg, ${textProps.color}, #00ffff, #ff00ff)` : textProps.color,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: textProps.colorShift ? 'transparent' : textProps.color,
        };

      case "NeonText":
        return {
          ...baseStyles,
          fontFamily: 'Arial, sans-serif',
          textShadow: `
            0 0 10px ${textProps.color},
            0 0 20px ${textProps.color},
            0 0 30px ${textProps.color},
            0 0 40px ${textProps.color}
          `,
        };

      case "OldSchoolText":
        return {
          ...baseStyles,
          fontFamily: 'monospace',
          textShadow: '3px 3px 0px #000000',
          filter: 'contrast(1.2)',
        };

      case "FunText":
        return {
          ...baseStyles,
          fontFamily: 'Comic Sans MS, cursive',
          textShadow: textProps.glowEffect ? `0 0 10px ${textProps.color}` : 'none',
          color: textProps.colorShift ? '#ff69b4' : textProps.color,
        };

      case "ParticleExplosion":
        return {
          ...baseStyles,
          textShadow: `0 0 20px ${textProps.color}`,
          fontWeight: '900',
        };

      case "Text3D":
        return {
          ...baseStyles,
          fontWeight: '900',
          textShadow: `
            1px 1px 0px #000,
            2px 2px 0px #000,
            3px 3px 0px #000,
            4px 4px 0px #000,
            5px 5px 0px #000,
            0 0 10px ${textProps.color}
          `,
        };

      case "GlitchText":
        return {
          ...baseStyles,
          fontFamily: 'monospace',
          textShadow: `
            0 0 10px ${textProps.color},
            2px 0 0 #ff0000,
            -2px 0 0 #0000ff
          `,
        };

      default:
        return baseStyles;
    }
  }, [textProps]);

  // Get template description
  const getTemplateDescription = () => {
    switch (textProps.templateId) {
      case "Typewriter":
        return "Classic typewriter effect with cursor";
      case "FadeInText":
        return `Fade in with ${textProps.fadeType} animation`;
      case "SlideInText":
        return `Slide from ${textProps.direction} with ${textProps.slideType} effect`;
      case "BounceText":
        return "Bouncing text with physics";
      case "FluidText":
        return "Fluid wave animation";
      case "NeonText":
        return "Neon glow effect";
      case "OldSchoolText":
        return "Retro computer style";
      case "FunText":
        return "Fun bouncing animation";
      case "ParticleExplosion":
        return "Explosive particle effect";
      case "Text3D":
        return "3D text with depth";
      case "GlitchText":
        return "Digital glitch effect";
      default:
        return "Text animation";
    }
  };

  const backgroundStyle: React.CSSProperties = {
    backgroundColor: textProps.backgroundColor,
    backgroundImage: textProps.templateId === "OldSchoolText" ?
      "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.1) 2px, rgba(0,255,0,0.1) 4px)" :
      "none",
  };

  return (
    <div className="w-full h-full relative overflow-hidden" style={backgroundStyle}>
      {/* Main text preview */}
      <div className="w-full h-full flex items-center justify-center p-8">
        <div className="relative">
          <h1 style={previewStyles} className="whitespace-nowrap max-w-full overflow-hidden">
            {textProps.text}
          </h1>

          {/* Typewriter cursor */}
          {textProps.templateId === "Typewriter" && (
            <span
              className="animate-pulse"
              style={{
                color: textProps.color,
                fontSize: `${textProps.fontSize}px`,
                fontFamily: 'Courier New, monospace'
              }}
            >
              |
            </span>
          )}

          {/* Particle effect indicator */}
          {textProps.particleEffect && (
            <div className="absolute -inset-4 pointer-events-none">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-current rounded-full animate-bounce"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.1}s`,
                    color: textProps.color,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recording indicator */}
      <div className={`absolute top-2 sm:top-4 left-2 sm:left-4 w-4 h-4 sm:w-5 sm:h-5 border-2 border-[#8B43F7] rounded-full ${isPlaying ? 'animate-pulse bg-[#8B43F7]' : 'bg-transparent'}`} />

      {/* Template info overlay */}
      <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
        <div className="font-medium">{textProps.templateId}</div>
        <div className="text-gray-300">{getTemplateDescription()}</div>
      </div>

      {/* Effects indicators */}
      <div className="absolute top-2 right-2 flex flex-col gap-1">
        {textProps.rotationEffect && (
          <div className="bg-blue-500/80 text-white text-xs px-2 py-1 rounded">
            Rotation
          </div>
        )}
        {textProps.scaleEffect && (
          <div className="bg-green-500/80 text-white text-xs px-2 py-1 rounded">
            Scale
          </div>
        )}
        {textProps.colorShift && (
          <div className="bg-purple-500/80 text-white text-xs px-2 py-1 rounded">
            Color Shift
          </div>
        )}
        {textProps.glowEffect && (
          <div className="bg-yellow-500/80 text-white text-xs px-2 py-1 rounded">
            Glow
          </div>
        )}
        {textProps.particleEffect && (
          <div className="bg-red-500/80 text-white text-xs px-2 py-1 rounded">
            Particles
          </div>
        )}
      </div>
    </div>
  );
}
