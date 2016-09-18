// Sass input
require.context('../src/scss/app', true, /\.scss$/);

// TypeScript input
require('../src/modules/main.ts');

// Tenokates
require.context('../src/modules/', true, /\.html$/);

// Images
require.context('../src/images/', true, /\.(jpe?g|png|gif|svg)$/);

// Fontsc:\datos\github\cordova-multiplatform-template\app\bundle\bundle.app.js
require.context('../src/fonts/', true, /\.(eot|svg|ttf|woff)$/);
