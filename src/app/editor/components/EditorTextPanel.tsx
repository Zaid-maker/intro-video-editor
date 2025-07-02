import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export default function EditorTextPanel() {
    return (
        <div className="bg-[#0C0C0E] text-white w-80 p-4 rounded-xl space-y-4">
            <Tabs defaultValue="text">
                <TabsList className="w-full justify-start gap-2 bg-[#1c1c1e] p-1 rounded-md">
                    <TabsTrigger value="text" className="text-sm px-3 py-1.5">Text</TabsTrigger>
                    <TabsTrigger value="style" className="text-sm px-3 py-1.5">Style</TabsTrigger>
                    <TabsTrigger value="media" className="text-sm px-3 py-1.5">Media</TabsTrigger>
                </TabsList>

                <TabsContent value="text" className="space-y-6 pt-4">
                    {/* Content 1 */}
                    <div className="space-y-2">
                        <h3 className="text-sm text-muted-foreground">Content 1</h3>
                        <div>
                            <Label htmlFor="content1-title" className="text-xs  mb-2">Review Title</Label>
                            <Input id="content1-title" placeholder="Text" className="mt-1 bg-[#1c1c1e] text-white border border-[#2c2c2e]" />
                        </div>
                        <div>
                            <Label htmlFor="content1-body" className="text-xs  mb-2">Review Body</Label>
                            <Textarea id="content1-body" placeholder="Text" className="mt-1 bg-[#1c1c1e] text-white border border-[#2c2c2e]" rows={4} />
                        </div>
                    </div>

                    {/* Content 2 */}
                    <div className="space-y-2">
                        <h3 className="text-sm text-muted-foreground">Content 2</h3>
                        <div>
                            <Label htmlFor="content2-title" className="text-xs mb-2">Review Title</Label>
                            <Input id="content2-title" placeholder="Text" className="mt-1 bg-[#1c1c1e] text-white border border-[#2c2c2e]" />
                        </div>
                        <div>
                            <Label htmlFor="content2-body" className="text-xs mb-2">Review Body</Label>
                            <Textarea id="content2-body" placeholder="Text" className="mt-1 bg-[#1c1c1e] text-white border border-[#2c2c2e]" rows={4} />
                        </div>
                    </div>

                    {/* Font Properties */}
                    <div className="space-y-2">
                        <h3 className="text-sm text-muted-foreground">Font Properties</h3>
                        <div>
                            <Label htmlFor="font-family" className="text-xs mb-2">Font Family</Label>
                            <Select defaultValue="inter">
                                <SelectTrigger className="mt-1 bg-[#1c1c1e] text-white border border-[#2c2c2e]">
                                    <SelectValue placeholder="Select font" />
                                </SelectTrigger>
                                <SelectContent>
                                    {['inter', 'poppins', 'roboto', 'lato', 'montserrat'].map((font) => (
                                        <SelectItem className="bg-gray-600 text-white" key={font} value={font}>{font}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                        </div>

                        <div>
                            <Label htmlFor="font-weight" className="text-xs mb-2">Font Weight</Label>
                            <Select defaultValue="400">
                                <SelectTrigger className="mt-1 bg-[#1c1c1e] text-white border border-[#2c2c2e]">
                                    <SelectValue placeholder="Select weight" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[
                                        { label: 'Thin', value: '100' },
                                        { label: 'Light', value: '300' },
                                        { label: 'Regular', value: '400' },
                                        { label: 'Medium', value: '500' },
                                        { label: 'Bold', value: '700' },
                                        { label: 'Black', value: '900' },
                                    ].map(({ label, value }) => (
                                        <SelectItem key={value} value={value} className="bg-gray-600 text-white">{label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                        </div>

                        <div>
                            <Label className="text-xs mb-2">Font Size</Label>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {["12", "14", "16", "18", "20", "24", "32"].map((size) => (
                                    <button
                                        key={size}
                                        className="text-xs mb-2 px-2 py-1 rounded bg-[#2c2c2e] text-white hover:bg-[#3a3a3c]"
                                    >
                                        {size}px
                                    </button>
                                ))}

                            </div>
                        </div>

                        <div>
                            <Label className="text-xs mb-2">Letter Spacing</Label>
                            <div className="flex  items-center gap-2">
                                <Slider defaultValue={[5]} min={0} max={20} step={1} className="w-[80%]   text-[#8B43F7]" />
                                <span className="text-xs mb-2">+1.5%</span>
                            </div>
                        </div>

                        <div>
                            <Label className="text-xs mb-2">Font Color</Label>
                            <div className="grid grid-cols-8 gap-1 mt-1">
                                {["#F59E0B", "#8B43F7", "#ffffff", "#000000", "#22D3EE", "#4ADE80", "#F43F5E", "#3B82F6"].map((color, i) => (
                                    <div
                                        key={i}
                                        className="w-4 h-4 rounded-full cursor-pointer border"
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

