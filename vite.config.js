import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
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
            viewFolder: '/views',
        }),
        handlebars({
            partialDirectory: [
                'src/views',
                'src/layouts',
                'src/components',
            ],
        }),
    ],
});