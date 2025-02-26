import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: [vitePreprocess(), preprocess()],

    kit: {
        adapter: adapter(),
    },

    vitePlugin: {
        experimental: {
            useVitePreprocess: true,
        },
    },
};

export default config;