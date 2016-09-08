var webpack = require('webpack');
var config = require('./src/app.config.js');

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
                // Transpile TypeScript
                // Add angular annotations
                test: /\.ts$/,
                loader: ['ts']
            },
            {
                // Transpile SCSS
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(['css', 'sass'])
            },
            {
                // Move images
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: ['file?name=' + config.files.output.images, 'img']
            }
        ]
    },
    plugins: [
        // Inject into HTML
        new HtmlWebPackPlugin({
            template: config.files.index
        }),
        // Create css bundle
        new ExtractTextPlugin(config.files.output.css)
    ]
};
