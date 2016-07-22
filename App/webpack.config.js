// TO DO improve
var webpack = require('webpack');
var HtmlWebPackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: './src/main.ts',
        vendor: ['./node_modules/ionic-angular/release/js/ionic.bundle.js'],
        scss: require('./src/main.scss')
    },
    output: {
        path: './www',
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts' },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(['css', 'sass'])
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.ts', '.scss']
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html'
        }),
        new ExtractTextPlugin('[name].css')
    ]
};
