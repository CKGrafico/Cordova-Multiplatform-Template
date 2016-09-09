var folders = {
    dist: './www'
};

var files = {
    app: './src/webpack.js',
    index: './src/index.html',
    output: {
        js: './js/[name].bundle.js',
        css: './css/[name].css',
        images: 'images/[name].[ext]',
        fonts: 'fonts/[name]/[name].[ext]'
    },
    vendor: [
        './node_modules/ionic-angular/release/js/ionic.bundle.js'
    ]
};

module.exports = {
    folders: folders,
    files: files
};
