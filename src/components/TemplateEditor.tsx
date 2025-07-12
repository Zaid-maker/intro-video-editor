"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "@/components/ui/color-picker";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { ZodSchema } from "zod";

type Props<TSchema extends ZodSchema> = {
	schema: TSchema;
	defaultValues: any;
	onSubmit: (values: any) => Promise<void> | void;
	tab?: "general" | "colors" | "animation";
};

export function TemplateEditor<TSchema extends ZodSchema>({
	schema,
	defaultValues,
	onSubmit,
	tab = "general",
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

	const getFieldType = (key: string, value: any) => {
		// Check if it's a color field
		if (typeof value === "string" && value.startsWith("#")) {
			return "color";
		}

		// Check if it's a boolean field
		if (typeof value === "boolean") {
			return "boolean";
		}

		// Check if it's an enum field (we'll detect this by checking if it's a string with specific values)
		if (
			typeof value === "string" &&
			["left", "right", "top", "bottom"].includes(value)
		) {
			return "enum";
		}

		// Default types
		if (typeof value === "string") return "string";
		if (typeof value === "number") return "number";

		return "string";
	};

	const renderField = (key: string, value: any, field: any) => {
		const fieldType = getFieldType(key, value);

		switch (fieldType) {
			case "color":
				return <ColorPicker value={field.value} onChange={field.onChange} />;
			case "boolean":
				return (
					<Checkbox checked={field.value} onCheckedChange={field.onChange} />
				);
			case "enum":
				return (
					<Select value={field.value} onValueChange={field.onChange}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="left">Left</SelectItem>
							<SelectItem value="right">Right</SelectItem>
							<SelectItem value="top">Top</SelectItem>
							<SelectItem value="bottom">Bottom</SelectItem>
						</SelectContent>
					</Select>
				);
			case "number":
				return (
					<Slider
						value={[field.value]}
						onValueChange={(v) => field.onChange(v[0])}
						min={1}
						max={200}
					/>
				);
			default:
				return <Input {...field} />;
		}
	};

	// Group fields by tab
	const fieldTab = (key: string) => {
		if (["color", "bgColor"].includes(key)) return "colors";
		if (
			[
				"text",
				"fontSize",
				"fontFamily",
				"fontWeight",
				"direction",
				"bounce",
				"bounceCount",
				"duration",
				"speed",
			].includes(key)
		)
			return "general";
		return "animation";
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
									<FormLabel className="capitalize">
										{key.replace(/([A-Z])/g, " $1").trim()}
									</FormLabel>
									<FormControl>{renderField(key, val, field)}</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					))}

				<Button type="submit" disabled={isSubmitting} className="w-full">
					{isSubmitting ? (
						<div className="flex items-center">
							<svg
								className="animate-spin h-5 w-5 mr-2"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
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
						</div>
					) : (
						"Apply"
					)}
				</Button>
			</form>
		</Form>
	);
}
