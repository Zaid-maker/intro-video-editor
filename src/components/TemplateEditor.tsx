"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "@/components/ui/color-picker";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ZodSchema } from "zod";

type Props<TSchema extends ZodSchema> = {
    schema: TSchema;
    defaultValues: any;
    onSubmit: (values: any) => Promise<void> | void;
    tab?: 'general' | 'colors' | 'animation';
};

export function TemplateEditor<TSchema extends ZodSchema>({
    schema,
    defaultValues,
    onSubmit,
    tab = 'general',
}: Props<TSchema>) {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues,
    });

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = form;

    const getFieldType = (key: string, value: any, fieldDefinition: any) => {
        // Check for zColor object
        if (
            typeof value === 'object' &&
            value !== null &&
            'r' in value && 'g' in value && 'b' in value && 'a' in value &&
            Object.keys(value).length === 4
        ) {
            return "zColor";
        }
        // Check if it's a color field (string starting with #) - keep for compatibility
        if (typeof value === "string" && value.startsWith("#")) {
            return "colorString";
        }
        if (typeof value === "boolean") return "boolean";
        // A simple way to check for enum: if the schema has an 'enum' or 'options' property
        // This requires passing more info to getFieldType or making assumptions based on key names
        if (key === 'direction' && typeof value === "string" && ["left", "right", "top", "bottom"].includes(value)) {
            return "enumDirection";
        }
        if (key === 'logoUrl' && typeof value === "string") {
            return "imageUrl"; // Could be a special input for URLs or file uploads later
        }
        if (typeof value === "string") return "string";
        if (typeof value === "number") {
            if (key === 'logoScale') return 'sliderNumber'; // Example for specific slider
            return "number";
        }
        return "string"; // Default fallback
    };

    const renderField = (key: string, value: any, field: any, fieldDefinition: any) => {
        const fieldType = getFieldType(key, value, fieldDefinition);
        
        switch (fieldType) {
            case "zColor": // Handles {r,g,b,a} from zColor()
            case "colorString": // Handles hex strings like "#RRGGBB"
                // Assuming ColorPicker can handle both {r,g,b,a} objects and hex strings,
                // or it converts/expects one. If zColor is always an object, ensure ColorPicker takes it.
                return <ColorPicker value={field.value} onChange={field.onChange} isRgba />;
            case "boolean":
                return (
                    <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                    />
                );
            case "enumDirection":
                return (
                    <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select direction" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="left">Left</SelectItem>
                            <SelectItem value="right">Right</SelectItem>
                            <SelectItem value="top">Top</SelectItem>
                            <SelectItem value="bottom">Bottom</SelectItem>
                        </SelectContent>
                    </Select>
                );
            case "imageUrl":
                 return <Input {...field} type="url" placeholder="https://example.com/logo.png" />;
            case "sliderNumber": // For specific numeric inputs like logoScale
                 return (
                    <div className="flex items-center gap-2">
                        <Slider
                            value={[field.value]}
                            onValueChange={(v) => field.onChange(v[0])}
                            min={0.1} // Example min for scale
                            max={2}   // Example max for scale
                            step={0.05} // Example step
                        />
                        <span className="text-sm w-12 text-right">{field.value.toFixed(2)}</span>
                    </div>
                );
            case "number": // Generic number input, could be a slider or text input
                return (
                    <Input
                        type="number"
                        value={field.value}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        step={key.includes('Intensity') || key.includes('Count') ? "1" : "0.1"} // Guess step based on name
                    />
                );
            default:
                return <Input {...field} />;
        }
    };

    // Group fields by tab - this might need to be more dynamic or configurable
    const fieldTab = (key: string) => {
        if (key.toLowerCase().includes('color') || key.toLowerCase().includes('bgcolor')) return "colors";
        if (["text", "titletext", "subtitletext", "taglinetext", "fontsize", "fontfamily", "fontweight", "logourl", "logoscale"].includes(key.toLowerCase())) return "general";
        // Add more specific categorizations if needed
        // For example, 'duration', 'speed', 'intensity', 'count' could be 'animation'
        if (["duration", "speed", "bounceintensity", "bouncecount", "direction", "bounce"].includes(key.toLowerCase())) return "animation";
        return "general"; // Default tab
    };

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {Object.entries(defaultValues)
                    .filter(([key]) => fieldTab(key) === tab)
                    .map(([key, val]) => (
                        <FormField
                            key={key}
                            control={control}
                            name={key}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</FormLabel>
                                    <FormControl>
                                        {renderField(key, val, field)}
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}

                <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? (
                        <div className="flex items-center">
                            <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                            </svg>
                            Applying...
                        </div>
                    ) : (
                        "Apply"
                    )}
                </Button>
            </form>
        </Form>
    );
}
