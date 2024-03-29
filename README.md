# (yet another) fe toolbox

This repository belongs to this blog post ~~[viet.js + mpa + handlebars + sass](https://raoulkramer.de/vite-mpa-handlebars-sass)~~ (blog post not ready yet).

Powered by:
* [vite](https://vitejs.dev/) based on vites [vanilla](https://vitejs.dev/guide/#trying-vite-online) template
* [multi-page application](https://vitejs.dev/guide/build.html#multi-page-app)
* [sass](https://sass-lang.com/) [dart-sass](https://github.com/sass/dart-sass)
* [handlebars](https://handlebarsjs.com/) [vite-plugin-handlebars](https://github.com/alexlafroscia/vite-plugin-handlebars)
* and of course JavaScript 🧡
* [Demo Image](https://unsplash.com/photos/u7ldh_tgH3s) used in project from [Dakota Roos](https://unsplash.com/@dakotaroosphotography)

## quick start

``` bash
$ npm ci
$ npm run dev
$ npm run build
```

## slow start

For more information about the motivation of this repository please read my [blog post](https://raoulkramer.de/vite-mpa-handlebars-sass).

## production bundle

Right now `npm run build` will create a `./dist` folder with all files.
JS and CSS can be found under `./dist/[hash]/js/**` or `./dist/[hash]/css/**`. The hash is generated during the build process and stored in a `./build-hash.json` file in project root. If a framework/css needs to know this hash, this is where it can be readed:

``` js
// build-hash.json
{"hash":"1g6lqj2mc"}

```
To change this hash to a longer or securer value adjust line 6 from [`vite.config.js`](vite.config.js#L6).

## project structure

Entry point html-wise is the [`src/views/index.html`](src/views/index.html) file.
Entry point js-wise is the [`src/main.js`](src/main.js) file.
Entry point (s)css-wise is the [`src/style.scss`](src/style.scss) file.

### views

This repository follows vites mpa workflow. And even if we write components with handlebars, the view-files should end with `.html`.`

**`src/views/**/*.html`**

But we will use handlebars syntax within our views. I just wanted to stay as close as possible to the vites mpa style.

### components

Components should be written in the `src/components/**` folder, with every component in its own directory.

Components can/should be self-containing:

``` html
<!-- src/components/image/image.hbs -->
<picture class="picture">
    ...
</picture>
<script type="module" src="{{resolve-from-root 'components/image/image.js'}}"></script>
```

``` js
// src/components/image/image.js
import './image.scss';
```

``` scss
/* src/components/image/image.scss */
.picture {
    width: 100%;
    height: auto;
    display: block;

    &__img {
        width: 100%;
        height: auto;
    }
}
```

This way, every time a handlebar component is used, it will bring its own js and css to the party and vite will take care of this.

## data

Take a look at **`/src/json/**`** and find three example json files.

These json files have the following filename convention `<pagePath>[.<scope>].json` with the exception for `global[.<scope>].json`.

Whenever your `index.html` is called, all `*.json` matching one the following rules are injected into your view:
* `global.json`
* `global.<scope>.json`
* `global.<scope2>.json`
* `index.json`
* `index.<scope>.json`
* `index.<scope2>.json`

All data from non-scoped files are merged together (using spread object merging) and injected into your views.

`scoped` data will be injected as a `scope:` property into your views.

### scoped data

When using the `<scope>` feature for example `index.stage.json` all data from this json will be accessible under the `stage` property:

``` handlebars
{{ stage.headline }}
```

Non-scoped data will be direct 1:1 accessible in your view: 
``` handlebars
{{ headline }}
```

Scoped files are loaded **after** non scoped files. If your non-scoped file has a property like your `<scope>` the scoped file will overwrite this data.
## static assets

Files and folders within the [`src/public/**`](src/public/) folder will be copied 1:1 in the `dist` folder.

## .utils?

This repository comes with 2 vite plugins written by me.

### pageRouter

During development, the pageRouter handles the mapping urls to the view files.

The second `pages` function provides a list of the views for the `rollupOptions.input` property when running `npm run build`.

### cleanupPath

`npm run build` always wanted to generate all view files under `dist/views`, so I write this plugin which moves the view-files to the root of the `dist` folder.