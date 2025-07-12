import { enableTailwind } from "@remotion/tailwind-v4";
import path from "path";

/**
 *  @param {import('webpack').Configuration} currentConfig
 */
export const webpackOverride = (currentConfig) => {
	const config = enableTailwind(currentConfig);

	// Add path alias resolution for @/*
	config.resolve = {
		...config.resolve,
		alias: {
			...config.resolve?.alias,
			"@": path.resolve(process.cwd(), "src"),
		},
	};

	return config;
};
