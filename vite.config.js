import { defineConfig, loadEnv } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { pageRouter, pages } from './.utils/pageRouter';
import { cleanupPath } from './.utils/cleanupPath';

const hash = Date.now().toString(32);
const env = loadEnv(process.env.NODE_ENV, process.cwd());

export default defineConfig({
    base: env.VITE_BASE,
    root: 'src',
    build: {
        rollupOptions: {
            input: pages(),
            output: {
                entryFileNames: `${hash}/js/[name].js`,
                chunkFileNames: `${hash}/js/[name].js`,
                assetFileNames: `${hash}/[ext]/[name].[ext]`,
            }
        },
        emptyOutDir: true,
        outDir: '../dist',
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
        cleanupPath({
            views: 'views',
            hash,
            hashFile: env.VITE_HASH_FILE,
        }),
    ],
});