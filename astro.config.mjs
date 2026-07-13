// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import castro from './.castro/integration.ts';

export default defineConfig({
	integrations: [
		castro({
			title: 'AVS Forum Archive',
			githubPages: true,
		}),
		sitemap(),
	],
});
