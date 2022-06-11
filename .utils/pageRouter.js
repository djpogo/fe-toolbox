import { glob } from 'glob';
import  fs from 'fs';

export const pageRouter = (pluginOptions) => {
    const options = {
        ...pluginOptions,
    };
    let _config = {};

    return {
        name: 'vite-plugin-page-router',
        configureServer(server) {
            server.middlewares.use('/', async (req, res, next) => {
                const assumedViewPath = `${_config.root}${options.viewFolder}${req.url}`;
                if (fs.existsSync(assumedViewPath)) {
                    req.url = `${options.viewFolder}${req.url}`;

                    // if this path exists, but does not end with `.html` we suffix the url with `index.html`
                    // this way the /sub-route will be mapped to `/sub-route/index.html`
                    if (!req.url.endsWith ('.html')) {
                        req.url += '/index.html';
                    }
                }                
                return next();
            })
        },
        async config(userConfig) {
            _config = userConfig;
        },
    };
};

export const pages = (pageOptions) => {
    const options = {
        root: 'src/',
        viewFolder: 'views/',
        fileExtension: '.html',
        ...pageOptions
    };
    const pages = glob.sync(`${options.root}${options.viewFolder}**/*${options.fileExtension}`);
    const returnPages = {};
    console.log(pages);
    pages.forEach(page => {
        // check for "main" index view
        if (page === `${options.root}${options.viewFolder}index${options.fileExtension}`) {
            returnPages.main = page;
        } else {
            returnPages[page.replace(`${options.root}${options.viewFolder}`, '').replace(options.fileExtension, '')] = page;
        }
    });
    return returnPages;
};