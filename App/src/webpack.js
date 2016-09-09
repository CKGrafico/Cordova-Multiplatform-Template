// Sass files
require('./scss/main.scss');

// TypeScript entry
require('./modules/main.ts');

// Images
require.context('./images/', true, /\.(jpe?g|png|gif|svg)$/);

// Fonts
require.context('./fonts/', true, /\.(eot|svg|ttf|woff)$/);
