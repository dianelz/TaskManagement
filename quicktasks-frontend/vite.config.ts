import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
    plugins: [sveltekit()],
    resolve: {
        dedupe: ['@fullcalendar/common'],
    },
    optimizeDeps: {
        include: ['@fullcalendar/common'],
    },
});
