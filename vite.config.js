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
    publicDir: 'public',
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: [
                    '@import "/scss/_mixins.scss";',
                ].join(''),
            },
        }
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