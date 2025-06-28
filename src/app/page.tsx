// app/page.tsx
'use client';

import { useState } from 'react';
import { Player } from '@remotion/player';
import { TypewriterEffect, typewriterSchema } from '@/remotion/Typewriter/TypewriterEffect';
import { TemplateEditor } from '@/components/TemplateEditor';

type TemplateEntry = {
  id: string;
  comp: any;
  schema: any;
  defaultProps: any;
};

const templates: TemplateEntry[] = [
  {
    id: "typewriter",
    comp: TypewriterEffect,
    schema: typewriterSchema,
    defaultProps: {
      text: "Hello!",
      speed: 5,
      color: "#fff",
      fontSize: 70,
      bgColor: "#000",
    },
  },
];

export default function Home() {
  const [active, setActive] = useState(templates[0]);
  const [props, setProps] = useState(active.defaultProps);

  const duration = active.defaultProps.text.length * active.defaultProps.speed + 60;

  async function handleApply(values: any) {
    // simulate render latency or real API work
    await new Promise((resolve) => setTimeout(resolve, 500));
    setProps(values);
  }

  async function handleRender() {
    const res = await fetch('/api/render', {
      method: 'POST',
      body: JSON.stringify({
        templateId: active.id,
        inputProps: props,
      }),
    })

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${active.id}.mp4`;
    link.click();
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div className="flex gap-4">
        {templates.map((t) => (
          <button
            key={t.id}
            className={`px-4 py-2 rounded ${t.id === active.id ? "bg-blue-600 text-white" : "border"}`}
            onClick={() => {
              setActive(t);
              setProps(t.defaultProps);
            }}
          >
            {t.id}
          </button>
        ))}
      </div>

      <Player
        component={active.comp}
        inputProps={props}
        durationInFrames={duration}
        compositionWidth={1280}
        compositionHeight={720}
        fps={30}
        controls
        style={{ width: "100%", maxWidth: 640, border: "1px solid #444" }}
      />

      <TemplateEditor
        schema={active.schema}
        defaultValues={props}
        onSubmit={handleApply}
      />
    </div>
  );
}
