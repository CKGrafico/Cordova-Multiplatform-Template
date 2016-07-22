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
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(['css', 'sass'])
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: ['file?name=' + config.files.output.images, 'img']
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: config.files.index
        }),
        new ExtractTextPlugin(config.files.output.css)
    ]
};
