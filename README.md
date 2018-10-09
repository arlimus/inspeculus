# InSpeculus

Web components to view InSpec profiles.

See the live demo ... 🚧 🚧 🚧


![Screenshot](/screenshot.png?raw=true "Screenshot")

## Usage

To use it in your own project:

Step 1: Load the [webcomponents polyfill](https://github.com/webcomponents/webcomponentsjs)

```html
<script src="node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
```

Step 2: Add this module

```bash
yarn add https://github.com/arlimus/inspeculus
```

Step 3: Use it

```html
<script type="module" src="node_modules/inspeculus/src/inspec-profile.js"></script>
<inspec-profile enableInput></inspec-profile>
```

For static HTML see [STATIC.md](STATIC.md)

## Configuration

- `enableInput` to activate the input button and allow users to paste their InSpec JSON into the module


## Development

Requirements:

- NodeJS v10+
- NPM or YARN

Installation:

```bash
yarn
yarn start
```

Build:

```bash
yarn build
```
