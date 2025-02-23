import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: '**',
			},
		],
	},
	experimental: {
		ppr: 'incremental',
	},
};

export default nextConfig;
