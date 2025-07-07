import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Upload, Volume2, Music, Image } from "lucide-react";
import { FONT_WEIGHTS, FONTS, FONT_SIZES, COLORS, TRANSITIONS, ANIMATIONS } from "@/lib/data";
import { TextProps } from "../schema";

export const DefaultTextProps: TextProps = {
    title: "Default Title - Change Me",
    body: "Default body text goes here. You can edit this to add your own content.",
    fontFamily: FONTS[0],
    fontWeight: FONT_WEIGHTS[2].value, // Default to 'Regular'
    fontSize: "16",
    color: "#ffffff",
    backgroundColor: "#000000",
    letterSpacing: 5,
    opacity: 100,
    textAlign: "left",
}

export type EditorTextPanelProps = {
    textProps: TextProps;
    setTextProps: React.Dispatch<React.SetStateAction<TextProps>>;
}

export default function EditorTextPanel({ textProps, setTextProps }: EditorTextPanelProps) {
    return (
        <div className="bg-[#0C0C0E] text-white w-full lg:w-80 xl:w-96 p-3 sm:p-4 rounded-lg sm:rounded-xl space-y-3 sm:space-y-4 h-fit max-h-[calc(100vh-120px)] custom-scrollbar overflow-y-auto">
            <Tabs defaultValue="text">
                <TabsList className="w-full justify-start gap-1 sm:gap-2 bg-[#1c1c1e] p-1 rounded-md">
                    <TabsTrigger value="text" className="text-xs sm:text-sm px-2 sm:px-3 py-1.5">Text</TabsTrigger>
                    <TabsTrigger value="style" className="text-xs sm:text-sm px-2 sm:px-3 py-1.5">Style</TabsTrigger>
                    <TabsTrigger value="media" className="text-xs sm:text-sm px-2 sm:px-3 py-1.5">Media</TabsTrigger>
                </TabsList>

                <TabsContent value="text" className="space-y-4 sm:space-y-6 pt-3 sm:pt-4">
                    {/* Content 1 */}
                    <div className="space-y-2">
                        <h3 className="text-xs sm:text-sm text-muted-foreground">Content 1</h3>
                        <div>
                            <Label htmlFor="content1-title" className="text-xs mb-2">Review Title</Label>
                            <Input id="content1-title" placeholder="Text" className="mt-1 bg-[#1c1c1e] text-white border border-[#2c2c2e] text-xs sm:text-sm"
                                defaultValue={textProps.title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setTextProps((prev) => ({ ...prev, title: e.target.value }));
                                }} />
                        </div>
                        <div>
                            <Label htmlFor="content1-body" className="text-xs mb-2">Review Body</Label>
                            <Textarea id="content1-body" placeholder="Text" className="mt-1 bg-[#1c1c1e] text-white border border-[#2c2c2e] text-xs sm:text-sm resize-none" rows={3}
                                defaultValue={textProps.body} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                    setTextProps((prev) => ({ ...prev, body: e.target.value }));
                                }} />
                        </div>
                    </div>

                    {/* Content 2 */}
                    <div className="space-y-2">
                        <h3 className="text-xs sm:text-sm text-muted-foreground">Content 2</h3>
                        <div>
                            <Label htmlFor="content2-title" className="text-xs mb-2">Review Title</Label>
                            <Input id="content2-title" placeholder="Text" className="mt-1 bg-[#1c1c1e] text-white border border-[#2c2c2e] text-xs sm:text-sm" />
                        </div>
                        <div>
                            <Label htmlFor="content2-body" className="text-xs mb-2">Review Body</Label>
                            <Textarea id="content2-body" placeholder="Text" className="mt-1 bg-[#1c1c1e] text-white border border-[#2c2c2e] text-xs sm:text-sm resize-none" rows={3} />
                        </div>
                    </div>

                    {/* Font Properties */}
                    <div className="space-y-3">
                        <h3 className="text-xs sm:text-sm text-muted-foreground">Font Properties</h3>

                        {/* Font Family and Weight - Side by side on larger screens */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <Label htmlFor="font-family" className="text-xs mb-2">Font Family</Label>
                                <Select value={textProps.fontFamily} onValueChange={(value) => { setTextProps((prev) => ({ ...prev, fontFamily: value })) }}>
                                    <SelectTrigger className="mt-1 bg-[#1c1c1e] text-white border border-[#2c2c2e] text-xs sm:text-sm">
                                        <SelectValue placeholder="Select font" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {FONTS.map((font) => (
                                            <SelectItem className="bg-gray-600 text-white text-xs sm:text-sm" key={font} value={font}>
                                                {font}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="font-weight" className="text-xs mb-2">Font Weight</Label>
                                <Select value={textProps.fontWeight} onValueChange={(value) => { setTextProps((prev) => ({ ...prev, fontWeight: value })) }}>
                                    <SelectTrigger className="mt-1 bg-[#1c1c1e] text-white border border-[#2c2c2e] text-xs sm:text-sm">
                                        <SelectValue placeholder="Select weight" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {FONT_WEIGHTS.map(({ label, value }) => (
                                            <SelectItem key={value} value={value} className="bg-gray-600 text-white text-xs sm:text-sm">
                                                {label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div>
                            <Label className="text-xs mb-2">Font Size</Label>
                            <div className="grid grid-cols-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-1 sm:gap-2 mt-1">
                                {FONT_SIZES.map((size) => (
                                    <button
                                        key={size}
                                        className="text-xs px-1.5 sm:px-2 py-1 rounded bg-[#2c2c2e] text-white hover:bg-[#3a3a3c] transition-colors"
                                        onClick={() => setTextProps((prev) => ({ ...prev, fontSize: size }))}
                                    >
                                        {size}px
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <Label className="text-xs mb-2">Letter Spacing</Label>
                            <div className="flex items-center gap-2 sm:gap-3">
                                <Slider value={[5]} min={0}
                                    max={20}
                                    step={1}
                                    className="flex-1 bg-white text-[#8B43F7]"
                                    onValueChange={(v: number[]) => { setTextProps((prev) => ({ ...prev, letterSpacing: v[0] })) }} />
                                <span className="text-xs text-muted-foreground min-w-[40px]">+1.5%</span>
                            </div>
                        </div>

                        <div>
                            <Label className="text-xs mb-2">Font Color</Label>
                            <div className="grid grid-cols-8 gap-1 sm:gap-1.5 mt-1">
                                {COLORS.map((color, i) => (
                                    <div
                                        key={i}
                                        className="w-5 h-5 sm:w-6 sm:h-6 rounded-full cursor-pointer border border-gray-600 hover:scale-110 transition-transform"
                                        style={{ backgroundColor: color }}
                                        onClick={() => setTextProps((prev) => ({ ...prev, color: color }))}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </TabsContent>

                {/* Style Tab */}
                <TabsContent value="style" className="space-y-4 sm:space-y-6 pt-3 sm:pt-4">
                    {/* Background */}
                    <div className="space-y-3">
                        <h3 className="text-xs sm:text-sm text-muted-foreground">Background</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <Label className="text-xs mb-2">Background Color</Label>
                                <div className="grid grid-cols-6 gap-1 mt-1">
                                    {COLORS.slice(0, 6).map((color, i) => (
                                        <div
                                            key={i}
                                            className="w-6 h-6 rounded cursor-pointer border border-gray-600 hover:scale-110 transition-transform"
                                            style={{ backgroundColor: color }}
                                            onClick={() => setTextProps((prev) => ({ ...prev, backgroundColor: color }))}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div>
                                <Label className="text-xs mb-2">Opacity</Label>
                                <div className="flex items-center gap-2">
                                    <Slider defaultValue={[100]} min={0} max={100} step={5} className="flex-1"
                                        onValueChange={(v: number[]) => { setTextProps((prev) => ({ ...prev, opacity: v[0] })) }}
                                    />
                                    <span className="text-xs text-muted-foreground min-w-[35px]">100%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Animation */}
                    <div className="space-y-3">
                        <h3 className="text-xs sm:text-sm text-muted-foreground">Animation</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <Label className="text-xs mb-2">Animation Type</Label>
                                <Select defaultValue="fade">
                                    <SelectTrigger className="mt-1 bg-[#1c1c1e] text-white border border-[#2c2c2e] text-xs sm:text-sm">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {ANIMATIONS.map((animation) => (
                                            <SelectItem key={animation} value={animation} className="bg-gray-600 text-white text-xs sm:text-sm">
                                                {animation}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label className="text-xs mb-2">Transition</Label>
                                <Select defaultValue="ease">
                                    <SelectTrigger className="mt-1 bg-[#1c1c1e] text-white border border-[#2c2c2e] text-xs sm:text-sm">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {TRANSITIONS.map((transition) => (
                                            <SelectItem key={transition} value={transition} className="bg-gray-600 text-white text-xs sm:text-sm">
                                                {transition}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div>
                            <Label className="text-xs mb-2">Duration (seconds)</Label>
                            <div className="flex items-center gap-2">
                                <Slider defaultValue={[2]} min={0.5} max={5} step={0.1} className="flex-1 bg-white" />
                                <span className="text-xs text-muted-foreground min-w-[30px]">2.0s</span>
                            </div>
                        </div>
                    </div>

                    {/* Positioning */}
                    <div className="space-y-3">
                        <h3 className="text-xs sm:text-sm text-muted-foreground">Position & Alignment</h3>
                        <div className="grid grid-cols-3 gap-2">
                            {['left', 'center', 'right'].map((align) => (
                                <button
                                    key={align}
                                    className="text-xs px-2 py-1.5 rounded bg-[#2c2c2e] text-white hover:bg-[#3a3a3c] transition-colors capitalize"
                                >
                                    {align}
                                </button>
                            ))}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <Label className="text-xs mb-2">X Position</Label>
                                <Input placeholder="0" className="bg-[#1c1c1e] text-white border border-[#2c2c2e] text-xs sm:text-sm" />
                            </div>
                            <div>
                                <Label className="text-xs mb-2">Y Position</Label>
                                <Input placeholder="0" className="bg-[#1c1c1e] text-white border border-[#2c2c2e] text-xs sm:text-sm" />
                            </div>
                        </div>
                    </div>
                </TabsContent>

                {/* Media Tab */}
                <TabsContent value="media" className="space-y-4 sm:space-y-6 pt-3 sm:pt-4">
                    {/* Background Media */}
                    <div className="space-y-3">
                        <h3 className="text-xs sm:text-sm text-muted-foreground">Background Media</h3>
                        <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" className="flex items-center gap-2 bg-[#1c1c1e] border-[#2c2c2e] text-white hover:bg-[#2c2c2e] text-xs">
                                <Image className="w-4 h-4" />
                                Image
                            </Button>
                            <Button variant="outline" className="flex items-center gap-2 bg-[#1c1c1e] border-[#2c2c2e] text-white hover:bg-[#2c2c2e] text-xs">
                                <Upload className="w-4 h-4" />
                                Upload
                            </Button>
                        </div>
                        <div className="p-3 border-2 border-dashed border-[#2c2c2e] rounded-lg text-center">
                            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-500" />
                            <p className="text-xs text-gray-500">Drop image or video here</p>
                        </div>
                    </div>

                    {/* Audio Settings */}
                    <div className="space-y-3">
                        <h3 className="text-xs sm:text-sm text-muted-foreground">Audio</h3>
                        <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" className="flex items-center gap-2 bg-[#1c1c1e] border-[#2c2c2e] text-white hover:bg-[#2c2c2e] text-xs">
                                <Music className="w-4 h-4" />
                                Music
                            </Button>
                            <Button variant="outline" className="flex items-center gap-2 bg-[#1c1c1e] border-[#2c2c2e] text-white hover:bg-[#2c2c2e] text-xs">
                                <Volume2 className="w-4 h-4" />
                                Voice
                            </Button>
                        </div>
                        <div>
                            <Label className="text-xs mb-2">Background Music</Label>
                            <Select>
                                <SelectTrigger className="mt-1 bg-[#1c1c1e] text-white border border-[#2c2c2e] text-xs sm:text-sm">
                                    <SelectValue placeholder="Choose music" />
                                </SelectTrigger>
                                <SelectContent>
                                    {['upbeat', 'calm', 'corporate', 'cinematic', 'modern'].map((music) => (
                                        <SelectItem key={music} value={music} className="bg-gray-600 text-white text-xs sm:text-sm">
                                            {music}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label className="text-xs mb-2">Volume</Label>
                            <div className="flex items-center gap-2">
                                <Slider defaultValue={[70]} min={0} max={100} step={5} className="flex-1 bg-white" />
                                <span className="text-xs text-muted-foreground min-w-[30px]">70%</span>
                            </div>
                        </div>
                    </div>

                    {/* Video Settings */}
                    <div className="space-y-3">
                        <h3 className="text-xs sm:text-sm text-muted-foreground">Video Settings</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <Label className="text-xs mb-2">Duration</Label>
                                <Input placeholder="10s" className="bg-[#1c1c1e] text-white border border-[#2c2c2e] text-xs sm:text-sm" />
                            </div>
                            <div>
                                <Label className="text-xs mb-2">Quality</Label>
                                <Select defaultValue="1080p">
                                    <SelectTrigger className="bg-[#1c1c1e] text-white border border-[#2c2c2e] text-xs sm:text-sm">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {['720p', '1080p', '4K'].map((quality) => (
                                            <SelectItem key={quality} value={quality} className="bg-gray-600 text-white text-xs sm:text-sm">
                                                {quality}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div>
                            <Label className="text-xs mb-2">Aspect Ratio</Label>
                            <div className="grid grid-cols-3 gap-2">
                                {['16:9', '9:16', '1:1'].map((ratio) => (
                                    <button
                                        key={ratio}
                                        className="text-xs px-2 py-1.5 rounded bg-[#2c2c2e] text-white hover:bg-[#3a3a3c] transition-colors"
                                    >
                                        {ratio}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
