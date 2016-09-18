// Sass input
require.context('../src/scss/app', true, /\.scss$/);

// TypeScript input
require('../src/modules/main.ts');

// Images
require.context('../src/images/', true, /\.(jpe?g|png|gif|svg)$/);

// Fonts
require.context('../src/fonts/', true, /\.(eot|svg|ttf|woff)$/);
