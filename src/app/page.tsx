// app/page.tsx
'use client';

import { useState } from 'react';
import { Player } from '@remotion/player';
import { TypewriterEffect } from '../remotion/Typewriter/TypewriterEffect';

export default function Home() {
  const [props, setProps] = useState({
    text: 'Hello, Remotion!',
    speed: 5,
    color: '#ffcc00',
    fontSize: 80,
    bgColor: '#222222',
  });

  const durationInFrames = props.text.length * props.speed + props.speed * 2;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl mb-4">Customize Your Intro</h1>
      <Player
        component={TypewriterEffect}
        inputProps={props}
        durationInFrames={durationInFrames}
        compositionWidth={1280}
        compositionHeight={720}
        fps={30}
        controls
        style={{ width: '100%', border: '1px solid #444' }}
      />

      <div className="mt-6 space-y-4">
        <label>
          Text:
          <input
            className="block w-full border p-2"
            value={props.text}
            onChange={(e) => setProps({ ...props, text: e.target.value })}
          />
        </label>

        <label>
          Speed:
          <input
            type="range"
            min="1"
            max="20"
            value={props.speed}
            onChange={(e) =>
              setProps({ ...props, speed: parseInt(e.target.value, 10) })
            }
          />
          {props.speed} frames/char
        </label>

        <label>
          Font Size:
          <input
            type="number"
            value={props.fontSize}
            onChange={(e) =>
              setProps({ ...props, fontSize: parseInt(e.target.value, 10) })
            }
            className="border p-1 w-20"
          />
        </label>

        <label>
          Text Color:
          <input
            type="color"
            value={props.color}
            onChange={(e) => setProps({ ...props, color: e.target.value })}
          />
        </label>

        <label>
          Background Color:
          <input
            type="color"
            value={props.bgColor}
            onChange={(e) =>
              setProps({ ...props, bgColor: e.target.value })
            }
          />
        </label>
      </div>
    </div>
  );
}
