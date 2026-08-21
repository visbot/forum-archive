import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import * as core from '@actions/core';
import Sitemapper from 'sitemapper';

const sitemap = new Sitemapper({
	timeout: 10_000,
});

async function run(): Promise<void> {
	try {
		const { sites } = await sitemap.fetch(core.getInput('sitemap-url', { required: true }));
		core.info(`Found ${sites.length} URLs in sitemap.`);

		const chunkSize = Number(core.getInput('chunk-size') || 50);

		if (!Number.isInteger(chunkSize) || chunkSize < 1) {
			throw new Error(`Invalid chunk-size: ${core.getInput('chunk-size')}`);
		}

		const outputDir = core.getInput('output-dir') || '.ia-chunks';
		await mkdir(outputDir, { recursive: true });

		const indices: number[] = [];

		// The URLs themselves are written to disk rather than passed through a job
		// output, which is capped at 1 MB. The matrix only carries chunk indices.
		for (let index = 0; index * chunkSize < sites.length; index++) {
			const chunk = sites.slice(index * chunkSize, (index + 1) * chunkSize);

			await writeFile(join(outputDir, `chunk-${index}.json`), JSON.stringify(chunk));
			indices.push(index);
		}

		// GitHub refuses to schedule a matrix with more than 256 jobs
		if (indices.length > 256) {
			throw new Error(`${indices.length} chunks exceed the matrix limit of 256, increase chunk-size`);
		}

		core.info(`Split into ${indices.length} chunks of up to ${chunkSize} URLs.`);
		core.setOutput('matrix', JSON.stringify(indices));
		core.setOutput('chunk-dir', outputDir);
	} catch (error) {
		if (error instanceof Error) core.setFailed(error.message);
	}
}

await run();
