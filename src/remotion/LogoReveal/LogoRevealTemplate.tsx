import {AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {z} from 'zod';
import {zColor} from '@remotion/zod-types';

export const logoRevealSchema = z.object({
  logoUrl: z.string().default(staticFile('logo.webp')), // Assuming a default logo in public folder
  taglineText: z.string().default('Powered by Remotion'),
  taglineColor: zColor().default(() => ({r: 220, g: 220, b: 220, a: 1})),
  backgroundColor: zColor().default(() => ({r: 10, g: 10, b: 25, a: 1})),
  logoScale: z.number().min(0.1).max(2).default(1),
});

type LogoRevealProps = z.infer<typeof logoRevealSchema>;

export const LogoReveal: React.FC<LogoRevealProps> = ({
  logoUrl,
  taglineText,
  taglineColor,
  backgroundColor,
  logoScale,
}) => {
  const frame = useCurrentFrame();
  const {fps, width, height, durationInFrames} = useVideoConfig();

  const taglineRgb = `rgba(${taglineColor.r}, ${taglineColor.g}, ${taglineColor.b}, ${taglineColor.a})`;
  const backgroundRgb = `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`;

  // Logo animation: Scale and fade in
  const logoEntryProgress = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    durationInFrames: fps * 1, // 1 second entry
  });

  const logoOpacity = interpolate(logoEntryProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const currentLogoScale = interpolate(logoEntryProgress, [0, 1], [0.5 * logoScale, 1 * logoScale]);

  // Tagline animation: Appears after logo, fades in from bottom
  const taglineDelay = fps * 0.8; // Start tagline animation slightly before logo finishes
  const taglineProgress = spring({
    frame: frame - taglineDelay,
    fps,
    from: 0,
    to: 1,
    durationInFrames: fps * 0.7,
  });

  const taglineOpacity = interpolate(taglineProgress, [0, 0.5, 1], [0, 0.8, 1]);
  const taglineTranslateY = interpolate(taglineProgress, [0, 1], [30, 0]);

  // Hold logo and tagline for a bit, then fade out everything
  const exitStartTime = durationInFrames - fps * 1; // Start exit 1 second before end
  const exitProgress = spring({
    frame: frame - exitStartTime,
    fps,
    from: 0,
    to: 1,
    durationInFrames: fps * 1,
  });

  const overallOpacity = interpolate(exitProgress, [0, 0.5, 1], [1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });


  return (
    <AbsoluteFill style={{backgroundColor: backgroundRgb, justifyContent: 'center', alignItems: 'center', fontFamily: 'Helvetica, Arial, sans-serif', opacity: overallOpacity}}>
      <div style={{textAlign: 'center'}}>
        <Img
          src={logoUrl}
          style={{
            width: `${200 * currentLogoScale}px`, // Base size 200px, scaled by prop
            height: 'auto',
            opacity: logoOpacity,
            transform: `scale(${currentLogoScale})`,
            marginBottom: '30px',
          }}
        />
        <p
          style={{
            fontSize: `${36 * logoScale}px`, // Scale font size with logo
            color: taglineRgb,
            opacity: taglineOpacity,
            transform: `translateY(${taglineTranslateY}px)`,
            margin: 0,
          }}
        >
          {taglineText}
        </p>
      </div>
    </AbsoluteFill>
  );
};
