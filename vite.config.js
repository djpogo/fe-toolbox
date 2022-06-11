import { defineConfig } from 'vite';

import { pageRouter, pages } from './.utils/pageRouter';

export default defineConfig({
    root: 'src',
    build: {
        rollupOptions: {
            input: pages(),
        },
    },
    plugins: [
        pageRouter({
            viewFolder: '/views'
        }),
    ],
});