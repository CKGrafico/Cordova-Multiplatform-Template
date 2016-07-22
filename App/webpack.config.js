// TO DO improve
var webpack = require('webpack');
var HtmlWebPackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js',
        vendor: ['./node_modules/ionic-angular/release/js/ionic.bundle.js']
    },
    output: {
        path: './www',
        filename: '[name].bundle.js'
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
                loaders: ['file?name=images/[name].[ext]', 'img']
            }
        ]
    },
    resolve: {
        extensions: ['', '.js']
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html'
        }),
        new ExtractTextPlugin('[name].css')
    ]
};
