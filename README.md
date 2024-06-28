# Welfare-bo

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Recommend setup environment

- Node (version: 18.18.2)
- Yarn (version: 1.22.5 )

## Quickly project Setup and build

```sh
yarn install
```

##### Build for development

```sh
yarn dev
```

##### Build for production

```sh
yarn build
```

##### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```

After run script, the dev server will start at http://127.0.0.1:1234, you can access through it.
HTML list url: http://127.0.0.1:1234/html-list

#### Additional resources

We are add some information related useful resources. It include:

- [Environment](./docs/environment.md)
- [Project structure](./docs/project-structure.md)
- [Framework and third party](./docs/third-party.md)
- [UI Kit components](./docs/ui-kit/README.md)
