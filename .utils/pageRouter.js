import { glob } from 'glob';

export const pageRouter = (pluginOptions) => {
    const options = {
        ...pluginOptions,
    };

    return {
        name: 'vite-plugin-page-router',
        configureServer(server) {
            server.middlewares.use('/', async (req, res, next) => {
                if (req.url.endsWith('.html') || req.url === '/') { 
                    req.url = `${options.viewFolder}${req.url}`;
                }
                return next();
            })
        }
    }
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