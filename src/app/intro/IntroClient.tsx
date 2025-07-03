'use client';

import { TemplateEditor } from '@/components/TemplateEditor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { templates } from '@/lib/data';
import { BounceTextTemplate, bounceTextSchema } from '@/remotion/BounceText/BounceTextTemplate';
import { FadeInTextTemplate, fadeInTextSchema } from '@/remotion/FadeInText/FadeInTextTemplate';
import { SlideInTextTemplate, slideInTextSchema } from '@/remotion/SlideInText/SlideInTextTemplate';
import { Player } from '@remotion/player';
import { useState } from 'react';

const effectOptions = [
  { id: 'fadein', label: 'Fade In', comp: FadeInTextTemplate, schema: fadeInTextSchema },
  { id: 'slidein', label: 'Slide In', comp: SlideInTextTemplate, schema: slideInTextSchema },
  { id: 'bounce', label: 'Bounce', comp: BounceTextTemplate, schema: bounceTextSchema },
];

export default function IntroClient() {
    const [active, setActive] = useState(templates[0]);
    const [props, setProps] = useState(active.defaultProps);
    const [isRendering, setIsRendering] = useState(false);
    const [tab, setTab] = useState('general');
    const [selectedEffects, setSelectedEffects] = useState<string[]>([]);
    const [effectProps, setEffectProps] = useState<Record<string, any>>({
      fadein: fadeInTextSchema.parse({}),
      slidein: slideInTextSchema.parse({}),
      bounce: bounceTextSchema.parse({}),
    });

    // Calculate duration based on template type
    const getDuration = () => {
        if (active.id === "Typewriter") {
            return props.text.length * props.speed + 60;
        } else if (active.id === "FadeInText") {
            return props.duration * 30 + 60; // duration in seconds * fps + buffer
        } else if (active.id === "SlideInText") {
            return props.duration * 30 + 60;
        } else if (active.id === "BounceText") {
            return props.duration * 30 + 60;
        } else if (active.id === "SimpleTitle") {
            return 150; // Fixed duration from Remotion/Root.tsx
        } else if (active.id === "LogoReveal") {
            return 180; // Fixed duration from Remotion/Root.tsx
        }
        return 150; // Default duration if not specified
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

    // Compose the preview component with stacking
    let PreviewComp = active.comp;
    let previewProps = props;
    if (selectedEffects.length > 0) {
      PreviewComp = selectedEffects.reduceRight((Accum, effectId) => {
        const effect = effectOptions.find(e => e.id === effectId);
        if (!effect) return Accum;
        const EffectComp = effect.comp;
        const effectPropsForPreview = effectProps[effectId];
        return (p: any) => (
          <EffectComp {...effectPropsForPreview}>
            <Accum {...p} />
          </EffectComp>
        );
      }, active.comp);
      previewProps = props;
    }

    return (
        <div className="flex flex-row gap-8 p-8 max-w-7xl mx-auto min-h-[80vh]">
            {/* Centered Player */}
            <div className="flex-1 flex flex-col items-center justify-center">
                <div className="flex gap-4 mb-6">
                    {templates.map((t) => (
                        <button
                            key={t.id}
                            className={`px-4 py-2 rounded ${t.id === active.id ? 'bg-blue-600 text-white' : 'border'}`}
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
                    component={PreviewComp}
                    inputProps={previewProps}
                    durationInFrames={duration}
                    compositionWidth={active.width}
                    compositionHeight={active.height}
                    fps={30}
                    controls
                    style={{
                        width: '100%',
                        maxWidth: 640,
                        border: '1px solid #444',
                        background: '#111',
                    }}
                />
                <button
                    onClick={handleRender}
                    disabled={isRendering}
                    className={`mt-6 px-4 py-2 rounded ${isRendering ? 'bg-gray-400 text-gray-700' : 'bg-green-600 text-white'}`}
                >
                    {isRendering ? 'Rendering…' : 'Render & Download'}
                </button>
            </div>
            {/* Sidebar with Tabs */}
            <aside className="w-[340px] min-w-[280px] max-w-[400px] bg-background border rounded-xl shadow-lg p-6 flex flex-col">
                <Tabs value={tab} onValueChange={setTab} className="flex-1 flex flex-col">
                    <TabsList className="mb-4">
                        <TabsTrigger value="general">General</TabsTrigger>
                        <TabsTrigger value="colors">Colors</TabsTrigger>
                        <TabsTrigger value="animation">Animation</TabsTrigger>
                        <TabsTrigger value="effects">Effects</TabsTrigger>
                    </TabsList>
                    <TabsContent value="general" className="flex-1">
                        <TemplateEditor
                            schema={active.schema}
                            defaultValues={props}
                            onSubmit={handleApply}
                            tab="general"
                        />
                    </TabsContent>
                    <TabsContent value="colors" className="flex-1">
                        <TemplateEditor
                            schema={active.schema}
                            defaultValues={props}
                            onSubmit={handleApply}
                            tab="colors"
                        />
                    </TabsContent>
                    <TabsContent value="animation" className="flex-1 space-y-4">
                        <div className="font-semibold mb-2">Choose Animation Style</div>
                        <div className="flex flex-col gap-4">
                            {templates.map((t) => (
                                <div key={t.id} className={`flex items-center gap-4 p-3 rounded border ${t.id === active.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}>
                                    <div className="flex-1">
                                        <div className="font-medium">{t.id}</div>
                                        <div className="text-xs text-muted-foreground">{t.description || 'No description.'}</div>
                                    </div>
                                    <button
                                        className={`px-3 py-1 rounded ${t.id === active.id ? 'bg-blue-600 text-white' : 'border'}`}
                                        onClick={() => {
                                            setActive(t);
                                            setProps(t.defaultProps);
                                        }}
                                        disabled={t.id === active.id}
                                    >
                                        {t.id === active.id ? 'Selected' : 'Select'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="effects" className="flex-1 space-y-4">
                        <div>
                          <div className="font-semibold mb-2">Select Effects (Stacked)</div>
                          <div className="flex flex-col gap-2">
                            {effectOptions.map((effect) => (
                              <label key={effect.id} className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="effect"
                                  value={effect.id}
                                  checked={selectedEffects.includes(effect.id)}
                                  onChange={e => {
                                    setSelectedEffects(prev =>
                                      e.target.checked
                                        ? [...prev, effect.id]
                                        : prev.filter(id => id !== effect.id)
                                    );
                                  }}
                                />
                                {effect.label}
                              </label>
                            ))}
                          </div>
                        </div>
                        {selectedEffects.length > 0 && (
                          <div>
                            <div className="font-semibold mb-2">Effect Settings</div>
                            {selectedEffects.map(effectId => {
                              const effect = effectOptions.find(e => e.id === effectId);
                              if (!effect) return null;
                              return (
                                <div key={effectId} className="mb-4 border-b pb-4 last:border-b-0 last:pb-0">
                                  <div className="font-medium mb-1">{effect.label}</div>
                                  <TemplateEditor
                                    schema={effect.schema}
                                    defaultValues={effectProps[effectId]}
                                    onSubmit={vals => setEffectProps(prev => ({ ...prev, [effectId]: vals }))}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        )}
                    </TabsContent>
                </Tabs>
            </aside>
        </div>
    );
} 