// @ts-check
import { defineConfig } from 'astro/config';
import icons from 'unplugin-icons/vite';
import tailwindcss from '@tailwindcss/vite';
import { githubPages, siteConfig } from './.castro/config.ts';

export default defineConfig({
	...githubPages(),
	...siteConfig({
    title: 'AVS Forum Archive',
    description: 'Mirror of the AVS forum on Winamp.com',
    keywords: ['AVS Presets', 'avs', 'Advanced Visualization Studio', 'winamp', 'wvs', 'Winamp Visualization Studio', 'audio visualization']
  }),
	vite: {
		plugins: [
			icons({
				compiler: 'astro',
			}),
			tailwindcss(),
		],
	},
});
