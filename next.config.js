/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	eslint: {
		ignoreDuringBuilds: true,
	},
	webpack: (config, { isServer }) => {
		// Ignore TypeScript declaration files from node_modules
		config.module.rules.push({
			test: /\.d\.ts$/,
			use: "ignore-loader",
		});

		// Handle Node.js modules that might not be available in the browser
		config.resolve.fallback = {
			...config.resolve.fallback,
			fs: false,
			path: false,
			os: false,
			crypto: false,
		};

		// Exclude Remotion from SSR
		if (isServer) {
			config.externals = config.externals || [];
			config.externals.push({
				"@remotion/bundler": "commonjs @remotion/bundler",
				"@remotion/renderer": "commonjs @remotion/renderer",
				"@remotion/lambda": "commonjs @remotion/lambda",
				remotion: "commonjs remotion",
				"@remotion/player": "commonjs @remotion/player",
			});
		}

		return config;
	},
	serverExternalPackages: [
		"@remotion/bundler",
		"@remotion/renderer",
		"@remotion/lambda",
		"remotion",
		"@remotion/player",
	],
};

module.exports = nextConfig;
