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
import { typewriterSchema, TypewriterEffect } from "./Typewriter/TypewriterEffect";

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
