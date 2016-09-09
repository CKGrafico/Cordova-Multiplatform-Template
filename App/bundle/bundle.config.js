var folders = {
    dist: './www'
};

var files = {
    app: './bundle/bundle.app.js',
    vendor: './bundle/bundle.vendor.js',
    index: './src/index.html',
    output: {
        js: './js/[name].bundle.js',
        css: './css/[name].css',
        images: './images/[name].[ext]',
        fonts: './fonts/[name]/[name].[ext]'
    }
};

module.exports = {
    folders: folders,
    files: files
};
