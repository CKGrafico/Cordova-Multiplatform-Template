var webpack = require('webpack');
var config = require('./bundle/bundle.config.js');

// Plugins
var HtmlWebPackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

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
                loader: ExtractTextPlugin.extract(['css', 'resolve-url', 'sass?sourceMap'])
            },
            {
                // 1.- Extract fonts
                test: /\.(eot|svg|ttf|woff)$/,
                loader: 'file?name=' + config.files.output.fonts
            },
            {
                // 1.- Minify images
                // 2.- Extract images
                test: /\.(jpe?g|png|gif)$/,
                loaders: ['file?name=' + config.files.output.images, 'img']
            }
        ]
    },
    plugins: [
        // Inject files into index
        new HtmlWebPackPlugin({
            template: config.files.index
        }),
        // Extract css to a bundle
        new ExtractTextPlugin(config.files.output.css)
    ]
};
