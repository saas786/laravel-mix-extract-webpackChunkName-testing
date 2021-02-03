import './polyfills/dynamic-path';
import 'core-js/features/promise';
import polyfills from './polyfills';
import App from "./app/index";

Promise.allSettled(polyfills)
	.then(() => {
		// initialize the app
		new App();
	});

