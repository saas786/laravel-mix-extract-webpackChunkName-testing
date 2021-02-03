const polyfillCSSVars = [];
const hasCSSVarsSupport = ((window || {}).CSS || {}).supports && window.CSS.supports('(--a: 0)');

if (!hasCSSVarsSupport) {

	polyfillCSSVars.push(new Promise((resolve, reject) => {
		(async () => {
			try {
				const cssVars = (await import(
					/* webpackChunkName: "css-vars-ponyfill" */
					'css-vars-ponyfill')).default;

				if ( "function" == typeof cssVars ) {
					cssVars({
						shadowDOM     : false,
						include       : 'link[rel=stylesheet],style',
						onlyLegacy    : true,
						watch         : false,

						onBeforeSend: function(xhr, elm, url) {
							console.log(xhr, elm, url);
						},
						onSuccess: function(cssText, elm, url) {
							console.log(cssText, elm, url);
						}
					});
				}
			} catch (error) {
				console.error('Failed fetching css vars ponyfil', error);
			}

			resolve();
		})();
	}));
}

export default polyfillCSSVars;

