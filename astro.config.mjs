// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import castro from './.castro/integration.ts';

export default defineConfig({
	integrations: [
		castro({
			title: 'AVS Forum Archive',
			description: 'Mirror of the AVS forum on Winamp.com',
			keywords: [
				'AVS Presets',
				'avs',
				'Advanced Visualization Studio',
				'winamp',
				'wvs',
				'Winamp Visualization Studio',
				'audio visualization',
			],
			githubPages: true,
		}),
		sitemap(),
	],
});
