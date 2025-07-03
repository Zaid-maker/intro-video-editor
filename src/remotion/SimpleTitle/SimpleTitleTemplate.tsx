import {AbsoluteFill, useCurrentFrame, useVideoConfig, spring, staticFile} from 'remotion';
import {z} from 'zod';
import {zColor} from '@remotion/zod-types';

export const simpleTitleSchema = z.object({
  titleText: z.string().default('Hello World'),
  subtitleText: z.string().default('Welcome to Remotion'),
  titleColor: zColor().default(() => ({r: 255, g: 255, b: 255, a: 1})),
  subtitleColor: zColor().default(() => ({r: 200, g: 200, b: 200, a: 1})),
  backgroundColor: zColor().default(() => ({r: 0, g: 0, b: 0, a: 1})),
});

type SimpleTitleProps = z.infer<typeof simpleTitleSchema>;

export const SimpleTitle: React.FC<SimpleTitleProps> = ({
  titleText,
  subtitleText,
  titleColor,
  subtitleColor,
  backgroundColor,
}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();

  const titleRgb = `rgba(${titleColor.r}, ${titleColor.g}, ${titleColor.b}, ${titleColor.a})`;
  const subtitleRgb = `rgba(${subtitleColor.r}, ${subtitleColor.g}, ${subtitleColor.b}, ${subtitleColor.a})`;
  const backgroundRgb = `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`;

  // Title animation: Appears after 0.5 seconds
  const titleOpacity = spring({
    frame: frame - fps * 0.5,
    fps,
    from: 0,
    to: 1,
    durationInFrames: fps * 0.5,
  });
  const titleTranslateY = spring({
    frame: frame - fps * 0.5,
    fps,
    from: 20,
    to: 0,
    durationInFrames: fps * 0.5,
  });

  // Subtitle animation: Appears after 1 second
  const subtitleOpacity = spring({
    frame: frame - fps * 1,
    fps,
    from: 0,
    to: 1,
    durationInFrames: fps * 0.5,
  });
  const subtitleTranslateY = spring({
    frame: frame - fps * 1,
    fps,
    from: 20,
    to: 0,
    durationInFrames: fps * 0.5,
  });

  return (
    <AbsoluteFill style={{backgroundColor: backgroundRgb, justifyContent: 'center', alignItems: 'center', fontFamily: 'Arial, sans-serif'}}>
      <div style={{textAlign: 'center'}}>
        <h1
          style={{
            fontSize: '72px',
            color: titleRgb,
            opacity: titleOpacity,
            transform: `translateY(${titleTranslateY}px)`,
            margin: 0,
            marginBottom: '20px',
          }}
        >
          {titleText}
        </h1>
        <h2
          style={{
            fontSize: '42px',
            color: subtitleRgb,
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleTranslateY}px)`,
            margin: 0,
            fontWeight: 'normal'
          }}
        >
          {subtitleText}
        </h2>
      </div>
    </AbsoluteFill>
  );
};
