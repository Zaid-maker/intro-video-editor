import { Composition } from "remotion";
import { Main } from "@/remotion/MyComp/Main";
import {
  COMP_NAME,
  defaultMyCompProps,
  DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "@/types/constants";
import { NextLogo } from "@/remotion/MyComp/NextLogo";
import { typewriterSchema, TypewriterEffect } from "@/remotion/Typewriter/TypewriterEffect";
import { fadeInTextSchema, FadeInTextEffect } from "@/remotion/FadeInText/FadeInTextEffect";
import { slideInTextSchema, SlideInTextEffect } from "@/remotion/SlideInText/SlideInTextEffect";
import { bounceTextSchema, BounceTextEffect } from "@/remotion/BounceText/BounceTextEffect";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Typewriter"
        component={TypewriterEffect}
        durationInFrames={150}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{
          text: 'Your Typewriter Text Here',
          speed: 4,
          color: '#ffffff',
          fontSize: 70,
          bgColor: '#000000',
        }}
        schema={typewriterSchema}
      />
      <Composition
        id="FadeInText"
        component={FadeInTextEffect}
        durationInFrames={180}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{
          text: 'Your Fade In Text',
          duration: 3,
          color: '#ffffff',
          fontSize: 70,
          bgColor: '#000000',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 'bold',
        }}
        schema={fadeInTextSchema}
      />
      <Composition
        id="SlideInText"
        component={SlideInTextEffect}
        durationInFrames={120}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{
          text: 'Your Slide In Text',
          duration: 2,
          color: '#ffffff',
          fontSize: 70,
          bgColor: '#000000',
          direction: 'left',
          bounce: false,
        }}
        schema={slideInTextSchema}
      />
      <Composition
        id="BounceText"
        component={BounceTextEffect}
        durationInFrames={120}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{
          text: 'Bounce!',
          duration: 2,
          color: '#ffffff',
          fontSize: 70,
          bgColor: '#000000',
          bounceIntensity: 5,
          bounceCount: 3,
        }}
        schema={bounceTextSchema}
      />
      <Composition
        id={COMP_NAME}
        component={Main}
        durationInFrames={DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={defaultMyCompProps}
      />
      <Composition
        id="NextLogo"
        component={NextLogo}
        durationInFrames={300}
        fps={30}
        width={140}
        height={140}
        defaultProps={{
          outProgress: 0,
        }}
      />
    </>
  );
};
