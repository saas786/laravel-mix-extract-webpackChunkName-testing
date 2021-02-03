/**
 * Laravel Mix configuration file.
 *
 * Laravel Mix is a layer built on top of WordPress that simplifies much of the
 * complexity of building out a Webpack configuration file. Use this file to
 * configure how your assets are handled in the build process.
 *
 * @see https://github.com/JeffreyWay/laravel-mix/blob/fe4c1383bd11d25862b557587c97bafd95594365/docs/installation.md
 *
 * @license   https://www.gnu.org/licenses/gpl-2.0.html GPL-2.0-or-later
 */

// Import required packages.
const mix = require('laravel-mix');
const path = require('path');

/**
 * -----------------------------------------------------------------------------
 * Build Process
 * -----------------------------------------------------------------------------
 * The section below handles processing, compiling, transpiling, and combining
 * all of the plugin's assets into their final location. This is the meat of the
 * build process.
 * -----------------------------------------------------------------------------
 */

/**
 * Sets the development path to assets. By default, this is the `/build`
 * folder in the plugin.
 */

const devPath = 'build';

/**
 * Sets the path to the generated assets. By default, this is the `/dist/assets` folder
 * in the plugin. If doing something custom, make sure to change this everywhere.
 */
mix.setPublicPath('dist/assets');

/**
 * Set Laravel Mix options.
 *
 * @see https://github.com/JeffreyWay/laravel-mix/blob/fe4c1383bd11d25862b557587c97bafd95594365/docs/url-rewriting.md#css-url-rewriting
 * @see https://github.com/webpack-contrib/terser-webpack-plugin#options
 */
mix.options({
	postCss: [require('postcss-preset-env')()],
	processCssUrls: false,
	terser: {
		terserOptions: {
			output: {
				comments: false,
			},
		},
		extractComments: false,
	},
});

/**
 * Builds sources maps for assets.
 *
 * @see https://github.com/JeffreyWay/laravel-mix/blob/fe4c1383bd11d25862b557587c97bafd95594365/docs/api.md#sourcemapsgenerateforproduction-devtype-productiontype
 */
mix.sourceMaps();

/**
 * Versioning and cache busting. Append a unique hash for production assets. If
 * you only want versioned assets in production, do a conditional check for
 * `mix.inProduction()`.
 *
 * @see https://github.com/JeffreyWay/laravel-mix/blob/fe4c1383bd11d25862b557587c97bafd95594365/docs/api.md#versionfiles
 */
mix.version();

/**
 * Compile JavaScript.
 *
 * See: https://github.com/JeffreyWay/laravel-mix/blob/fe4c1383bd11d25862b557587c97bafd95594365/docs/mixjs.md#basic-usage
 */
mix.js(`${devPath}/assets/js/app.js`, 'js');

/**
 * Extract vendors etc.
 *
 * See: https://github.com/JeffreyWay/laravel-mix/blob/fe4c1383bd11d25862b557587c97bafd95594365/docs/extract.md#L14
 */
mix.extract();

/**
 * Compile CSS. Mix supports Sass, Less, Stylus, and plain CSS, and has functions
 * for each of them.
 *
 * @see https://github.com/JeffreyWay/laravel-mix/blob/fe4c1383bd11d25862b557587c97bafd95594365/docs/sass.md
 * @see https://github.com/sass/node-sass#options
 */
mix.sass(`${devPath}/assets/css/screen.scss`, 'css');

// Alias for Twitter Bootstrap assets.
// Import from `twbs-bootstrap/js` or `~twbs-bootstrap/scss`.
mix.alias({
	'twbs-bootstrap': path.resolve(
		__dirname,
		'node_modules/bootstrap/'
	),
});

/**
 * Add custom Webpack configuration.
 *
 * Laravel Mix doesn't currently minimize images while using its `.copy()`
 * function, so we're using the `CopyWebpackPlugin` for processing and copying
 * images into the distribution folder.
 *
 * @see https://github.com/JeffreyWay/laravel-mix/blob/fe4c1383bd11d25862b557587c97bafd95594365/docs/quick-webpack-configuration.md
 * @see https://webpack.js.org/configuration/
 */
mix.webpackConfig({
	stats: 'minimal',
	devtool: mix.inProduction() ? false : 'source-map',
	performance: { hints: false },
	externals: { jquery: 'jQuery' },
});
