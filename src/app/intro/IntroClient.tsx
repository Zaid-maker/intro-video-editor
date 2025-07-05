'use client';

import { TemplateEditor } from '@/components/TemplateEditor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { templates } from '@/lib/data';
import { BounceTextTemplate, bounceTextSchema } from '@/remotion/BounceText/BounceTextTemplate';
import { FadeInTextTemplate, fadeInTextSchema } from '@/remotion/FadeInText/FadeInTextTemplate';
import { SlideInTextTemplate, slideInTextSchema } from '@/remotion/SlideInText/SlideInTextTemplate';
import { Player } from '@remotion/player';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const effectOptions = [
    { id: 'fadein', label: 'Fade In', comp: FadeInTextTemplate, schema: fadeInTextSchema },
    { id: 'slidein', label: 'Slide In', comp: SlideInTextTemplate, schema: slideInTextSchema },
    { id: 'bounce', label: 'Bounce', comp: BounceTextTemplate, schema: bounceTextSchema },
];

export default function IntroClient() {
    const searchParams = useSearchParams();
    const projectId = searchParams.get('projectId');

    // Start with the Empty template
    const [active, setActive] = useState(templates[0]);
    const [props, setProps] = useState(templates[0].defaultProps);
    const [currentProject, setCurrentProject] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(!!projectId);
    {/* <TabsTrigger
                           value="export"
                           className="text-xs sm:text-sm px-2 sm:px-3 py-1.5 flex-1 data-[state=active]:bg-[#8B43F7] data-[state=active]:text-white rounded-md transition-colors"
                         >
                           Export
                         </TabsTrigger> */}
    const [tab, setTab] = useState('general');
    const [selectedEffects, setSelectedEffects] = useState<string[]>([]);
    const [effectProps, setEffectProps] = useState<Record<string, any>>({
        fadein: fadeInTextSchema.parse({}),
        slidein: slideInTextSchema.parse({}),
        bounce: bounceTextSchema.parse({}),
    });

    // Load project if projectId is provided
    useEffect(() => {
        if (projectId) {
            loadProject(projectId);
        }
    }, [projectId]);

    const loadProject = async (id: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/projects/${id}`);
            if (!response.ok) {
                throw new Error('Failed to load project');
            }

            const result = await response.json();
            if (result.type === 'success') {
                const project = result.data;
                setCurrentProject(project);

                // Find the template
                const template = templates.find(t => t.id === project.templateId);
                if (template) {
                    setActive(template);
                    setProps(project.properties);
                }
            } else {
                console.error('Failed to load project:', result.message);
            }
        } catch (error) {
            console.error('Error loading project:', error);
        } finally {
            setIsLoading(false);
        }
    };

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
        }
        return 150;
    };

    const duration = getDuration();

    const handleApply = async (values: any) => {
        await new Promise((r) => setTimeout(r, 300)); // simulate latency
        setProps(values);

        // Auto-save project if it exists
        if (currentProject) {
            await updateProject(values);
        }
    };

    const updateProject = async (newProperties: any) => {
        if (!currentProject) return;

        try {
            const response = await fetch(`/api/projects/${currentProject.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    properties: newProperties,
                }),
            });

            if (response.ok) {
                const result = await response.json();
                if (result.type === 'success') {
                    setCurrentProject(result.data);
                }
            }
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };

    // const handleRender = async () => {
    //     setIsRendering(true);

    //     const res = await fetch('/api/render', {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             templateId: active.id,
    //             inputProps: props,
    //         }),
    //     });
    //     const blob = await res.blob();
    //     const url = URL.createObjectURL(blob);
    //     const a = document.createElement('a');

    //     a.href = url;
    //     a.download = `${active.id}.mp4`;
    //     a.click();
    //     URL.revokeObjectURL(url);
    //     setIsRendering(false);
    // };

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

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[80vh]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B43F7] mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading project...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 p-8 max-w-7xl mx-auto min-h-[80vh]">
            {/* Project Title */}
            {currentProject && (
                <div className="mb-4">
                    <h1 className="text-2xl font-bold text-white mb-1">{currentProject.name}</h1>
                    {currentProject.description && (
                        <p className="text-gray-400 text-sm">{currentProject.description}</p>
                    )}
                    <p className="text-gray-500 text-xs mt-1">Template: {currentProject.templateId}</p>
                </div>
            )}

            <div className="flex flex-row gap-8">
                {/* Centered Player */}
                <div className="flex-1 flex flex-col items-center justify-center">
                    <Player
                        component={PreviewComp}
                        inputProps={previewProps}
                        durationInFrames={duration}
                        compositionWidth={1280}
                        compositionHeight={720}
                        fps={30}
                        controls
                        style={{
                            width: '100%',
                            maxWidth: 640,
                            border: '1px solid #444',
                            background: '#111',
                        }}
                    />
                    {/* Render & Download button removed as per request */}
                </div>
                {/* Sidebar with Tabs */}
                <aside className="w-full xl:w-auto xl:min-w-[320px] xl:max-w-[400px] bg-[#0C0C0E] text-white p-3 sm:p-4 rounded-lg sm:rounded-xl space-y-3 sm:space-y-4 h-fit max-h-[calc(100vh-120px)] custom-scrollbar overflow-y-auto shadow-lg border border-[#232327]">
                    <Tabs value={tab} onValueChange={setTab} className="flex-1 flex flex-col h-[calc(100vh-180px)] min-h-[500px]">
                        <TabsList className="w-full justify-start gap-1 sm:gap-2 bg-[#1c1c1e] p-1 rounded-md mb-4">
                            <TabsTrigger value="general" className="text-xs sm:text-sm px-2 sm:px-3 py-1.5 flex-1 data-[state=active]:bg-[#8B43F7] data-[state=active]:text-white rounded-md transition-colors">General</TabsTrigger>
                            <TabsTrigger value="colors" className="text-xs sm:text-sm px-2 sm:px-3 py-1.5 flex-1 data-[state=active]:bg-[#8B43F7] data-[state=active]:text-white rounded-md transition-colors">Colors</TabsTrigger>
                            <TabsTrigger value="animation" className="text-xs sm:text-sm px-2 sm:px-3 py-1.5 flex-1 data-[state=active]:bg-[#8B43F7] data-[state=active]:text-white rounded-md transition-colors">Animation</TabsTrigger>
                            <TabsTrigger value="effects" className="text-xs sm:text-sm px-2 sm:px-3 py-1.5 flex-1 data-[state=active]:bg-[#8B43F7] data-[state=active]:text-white rounded-md transition-colors">Effects</TabsTrigger>
                            <TabsTrigger value="export" className="text-xs sm:text-sm px-2 sm:px-3 py-1.5 flex-1 data-[state=active]:bg-[#8B43F7] data-[state=active]:text-white rounded-md transition-colors">Export</TabsTrigger>
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
                                {templates.filter(t => t.id !== 'Empty').map((t) => (
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
                            <TabsContent value="export" className="flex-1">
                                <div className="font-semibold mb-2">Export</div>
                                <div className="text-gray-500 text-sm">Export and download options will appear here.</div>
                            </TabsContent>
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
        </div>
    );
} 