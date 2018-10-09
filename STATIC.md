## Usage - static

**only needed if there are no build-tools for module resolution**

Pre-building is a way to include this module into a site whose build-tools cannot resolve module depencencies.

Step 1: Build this library

```bash
yarn
yarn build
```

Results are found in the `build/` directory. `es6-bundled` supports most common browsers natively.

Step 2: Add static loaders to your html

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.0.2/webcomponents-loader.js"></script>
<script>
  requirejs(["src/inspec-profile.js"]);
</script>
```

Step 3: Include the preamble

The final step is a bit tricky: locate the code loader in the build `index.html`. You need to copy it into your HTML before loading the modules via requirejs.

