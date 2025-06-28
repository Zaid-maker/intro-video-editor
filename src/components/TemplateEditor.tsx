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
    // Initialize the form with the schema and default values
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues,
    });

    const { handleSubmit, formState } = form;
    const { isSubmitting } = formState;

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
                                            {typeof val === "string" && val.startsWith("#")
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
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <svg
                                className="animate-spin h-5 w-5 mr-2"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12" cy="12" r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8H4z"
                                />
                            </svg>
                            Applying...
                        </>
                    ) : (
                        'Apply'
                    )}
                </Button>
            </form>
        </Form>
    )
}