import { Composition } from "remotion";
import { Main } from "./MyComp/Main";
import {
  COMP_NAME,
  defaultMyCompProps,
  DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../../types/constants";
import { NextLogo } from "./MyComp/NextLogo";
import { typewriterSchema, TypewriterTemplate } from "./Typewriter/TypewriterTemplate";
import { fadeInTextSchema, FadeInTextTemplate } from "./FadeInText/FadeInTextTemplate";
import { slideInTextSchema, SlideInTextTemplate } from "./SlideInText/SlideInTextTemplate";
import { bounceTextSchema, BounceTextTemplate } from "./BounceText/BounceTextTemplate";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Typewriter"
        component={TypewriterTemplate}
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
        component={FadeInTextTemplate}
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
        component={SlideInTextTemplate}
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
        component={BounceTextTemplate}
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
