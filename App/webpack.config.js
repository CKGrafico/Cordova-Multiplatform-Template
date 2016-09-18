var webpack = require('webpack');
var config = require('./bundle/bundle.config.js');

// Plugins
var HtmlWebPackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// PostCSS
var postcss = {
    autoprefixer: require('autoprefixer'),
    stylelint: require('stylelint'),
    scss: require('postcss-scss')
};

module.exports = {
    entry: {
        app: config.files.app,
        vendor: config.files.vendor
    },
    output: {
        path: config.folders.dist,
        filename: config.files.output.js
    },
    module: {
        preLoaders: [
            {
                // TypeScript Linting
                test: /\.ts$/,
                loader: 'tslint'
            },
            {
                // Bagagge config for templates cache
                test: /\.js$/,
                loader: 'baggage?[file].html'
            }
        ],

        loaders: [
            {
                // 1.- TypeScript transpilation
                // 2.- Angular annotations
                // Chainning is right to left
                test: /\.ts$/,
                loaders: ['ng-annotate', 'ts']
            },
            {
                // 1.- Sass transpilation
                // 2.- CSS to Webpack
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(['css', 'resolve-url', 'sass?sourceMap', 'postcss-loader'])
            },
            {
                // 1.- Generate templates cache
                test: /\.html$/,
                loader: 'ngtemplate?relativeTo=!html',
                exclude: /index\.html$/,
            },
            {
                // 1.- Extract fonts
                test: /(fonts).*\.(eot|svg|ttf|woff)$/,
                loader: 'file?name=' + config.files.output.fonts
            },
            {
                // 1.- Minify images
                // 2.- Extract images
                test: /(images).*\.(jpe?g|png|gif|svg)$/,
                loaders: ['file?name=' + config.files.output.images, 'img?minimize']
            }
        ]
    },
    plugins: [
        // Inject files into index
        new HtmlWebPackPlugin({
            hash: false,
            template: config.files.index
        }),
        // Extract css to a bundle
        new ExtractTextPlugin(config.files.output.css)
    ],
    postcss: function () {
        return {
            // 1.- SCSS Linting
            // 2.- Add Browser prefixes
            plugins: [postcss.stylelint, postcss.autoprefixer],
            syntax: postcss.scss
        };
    }
};
