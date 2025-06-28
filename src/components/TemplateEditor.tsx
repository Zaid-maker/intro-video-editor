import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { typewriterSchema } from "@/remotion/Typewriter/TypewriterEffect";
import {
    Form, FormField, FormItem, FormLabel, FormControl, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ColorPicker } from "@/components/ui/color-picker";
import { Button } from "@/components/ui/button";

type Props = {
    schema: typeof typewriterSchema;
    defaultValues: any;
    onSubmit: (values: any) => void;
}

export const TemplateEditor: React.FC<Props> = ({ schema, defaultValues, onSubmit }) => {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues,
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {Object.keys(defaultValues).map((key) => {
                    const val = defaultValues[key];
                    return (
                        <FormField
                            key={key}
                            control={form.control}
                            name={key}
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>{key}</FormLabel>
                                        <FormControl>
                                            {typeof val === "string" && val.match(/^#/)
                                                ? <ColorPicker value={field.value} onChange={field.onChange} />
                                                : typeof val === "string"
                                                    ? <Input {...field} />
                                                    : typeof val === "number"
                                                        ? <Slider value={[field.value]} onValueChange={(v) => field.onChange(v[0])} min={1} max={200} />
                                                        : null}
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                    )
                })}
                <Button type="submit">Apply</Button>
            </form>
        </Form>
    )
}