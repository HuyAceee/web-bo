# Project structure

- [Project structure](#architecture)
  - [`.vscode`](#vscode)
  - [`.vuepress`](#vuepress)
  - [`docs`](#docs)
  - [`public`](#public)
  - [`src`](#src)
    - [`assets`](#assets)
    - [`common`](#common)
    - [`components`](#components)
    - [`composables`](#composables)
    - [`router`](#router)
    - [`services`](#services)
    - [`stores`](#state)
    - [`app.config.json`](#appconfigjson)
    - [`app.vue`](#appvue)
    - [`main.js`](#mainjs)

## `.vscode`

Settings and extensions specific to this project, for Visual Studio Code.

## `docs`

This folder contains documentation as markdown format, it includes document about setup environments, file and folder explanation, UI KIT component description,etc ....

## `nginx`

This folder contains the config of nginx when deploy to production server: gzip content ....

## `patches`

This folder the patch content that some point we need change source code to fix bug or update a third party library.

## `public`

Where you'll keep any static assets, to be added to the `dist` directory without processing from our build system.

## `src`

Where we keep all our source files.

### `assets`

This project manages assets via Vue CLI. Learn more about [its asset handling here](https://cli.vuejs.org/guide/html-and-static-assets.html).

### `common`

These are common folder, everything is constant or utility function can be add there. It contains variables constant, colors, commons function as validation ...

### `components`

Where most of the components in our app will live.

### `composables`

All functions that added there, it make we can reuse code for common tasks in this project. And separate logic coding and UI coding (prevent mixed them together)

### `models`

All interface or type model will define there. It make we can clear type of function when using.

### `router`

Where the router, routes, and any routing-related components live. We using vue-router third party for this.

### `services`

The API to call outside will stay there as Back-end API.....

### `stores`

Where all our global state management lives. We using piana state management third party for this.

### `app.vue`

The root Vue component that simply delegates to the router view. This is typically the only component to contain global CSS.

### `main.js`

The entry point to our app, were we create our Vue instance and mount it to the DOM, setup using router, state management, add custom directive,etc ....

## `package.json`

It contains some config for build scripts, and third party dependencies that using in this project. Reading more [third party explanation](https://cli.vuejs.org/guide/html-and-static-assets.html).
