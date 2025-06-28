"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "@/components/ui/color-picker";
import type { ZodSchema } from "zod";

type Props<TSchema extends ZodSchema> = {
    schema: TSchema;
    defaultValues: any;
    onSubmit: (values: any) => Promise<void> | void;
};

export function TemplateEditor<TSchema extends ZodSchema>({
    schema,
    defaultValues,
    onSubmit,
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

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {Object.entries(defaultValues).map(([key, val]) => (
                    <FormField
                        key={key}
                        control={control}
                        name={key}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{key}</FormLabel>
                                <FormControl>
                                    {typeof val === "string" && val.startsWith("#") ? (
                                        <ColorPicker value={field.value} onChange={field.onChange} />
                                    ) : typeof val === "string" ? (
                                        <Input {...field} />
                                    ) : typeof val === "number" ? (
                                        <Slider
                                            value={[field.value]}
                                            onValueChange={(v) => field.onChange(v[0])}
                                            min={1}
                                            max={200}
                                        />
                                    ) : null}
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}

                <Button type="submit" disabled={isSubmitting}>
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
