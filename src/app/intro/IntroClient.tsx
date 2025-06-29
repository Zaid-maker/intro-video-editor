'use client';

import { useState } from 'react';
import { Player } from '@remotion/player';
import { TypewriterEffect, typewriterSchema } from '@/remotion/Typewriter/TypewriterEffect';
import { FadeInTextEffect, fadeInTextSchema } from '@/remotion/FadeInText/FadeInTextEffect';
import { SlideInTextEffect, slideInTextSchema } from '@/remotion/SlideInText/SlideInTextEffect';
import { BounceTextEffect, bounceTextSchema } from '@/remotion/BounceText/BounceTextEffect';
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
    {
        id: "FadeInText",
        comp: FadeInTextEffect,
        schema: fadeInTextSchema,
        defaultProps: {
            text: "Welcome!",
            duration: 3,
            color: "#ffffff",
            fontSize: 70,
            bgColor: "#1a1a1a",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
        },
    },
    {
        id: "SlideInText",
        comp: SlideInTextEffect,
        schema: slideInTextSchema,
        defaultProps: {
            text: "Slide In!",
            duration: 2,
            color: "#ffffff",
            fontSize: 70,
            bgColor: "#2d2d2d",
            direction: "left",
            bounce: false,
        },
    },
    {
        id: "BounceText",
        comp: BounceTextEffect,
        schema: bounceTextSchema,
        defaultProps: {
            text: "Bounce!",
            duration: 2,
            color: "#ffffff",
            fontSize: 70,
            bgColor: "#3d3d3d",
            bounceIntensity: 5,
            bounceCount: 3,
        },
    },
];

export default function IntroClient() {
    const [active, setActive] = useState(templates[0]);
    const [props, setProps] = useState(active.defaultProps);
    const [isRendering, setIsRendering] = useState(false);

    // Calculate duration based on template type
    const getDuration = () => {
        if (active.id === "typewriter") {
            return props.text.length * props.speed + 60;
        } else if (active.id === "FadeInText") {
            return props.duration * 30 + 60; // duration in seconds * fps + buffer
        } else if (active.id === "SlideInText") {
            return props.duration * 30 + 60;
        } else if (active.id === "BounceText") {
            return props.duration * 30 + 60;
        }
        return 150;
    };

    const duration = getDuration();

    const handleApply = async (values: any) => {
        await new Promise((r) => setTimeout(r, 300)); // simulate latency
        setProps(values);
    };

    const handleRender = async () => {
        setIsRendering(true);

        const res = await fetch('/api/render', {
            method: 'POST',
            body: JSON.stringify({
                templateId: active.id,
                inputProps: props,
            }),
        });
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');

        a.href = url;
        a.download = `${active.id}.mp4`;
        a.click();
        URL.revokeObjectURL(url);
        setIsRendering(false);
    };

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8">
            {/* Template switcher and preview */}
            <div className="flex gap-4">
                {templates.map((t) => (
                    <button
                        key={t.id}
                        className={`px-4 py-2 rounded ${t.id === active.id ? 'bg-blue-600 text-white' : 'border'
                            }`}
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
                style={{
                    width: '100%',
                    maxWidth: 640,
                    border: '1px solid #444',
                }}
            />

            <div className="flex gap-4">
                <TemplateEditor
                    schema={active.schema}
                    defaultValues={props}
                    onSubmit={handleApply}
                />

                <button
                    onClick={handleRender}
                    disabled={isRendering}
                    className={`px-4 py-2 rounded ${isRendering ? 'bg-gray-400 text-gray-700' : 'bg-green-600 text-white'
                        }`}
                >
                    {isRendering ? 'Rendering…' : 'Render & Download'}
                </button>
            </div>
        </div>
    );
} 