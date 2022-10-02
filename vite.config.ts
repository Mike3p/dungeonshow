import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import ViteYaml from '@modyfi/vite-plugin-yaml';

const config: UserConfig = {
	plugins: [sveltekit(), ViteYaml()]
};

export default config;
