var root = './';

module.exports = {

    index: {
        path: root + 'www/',
        source: root + 'www/index.html',
        backup: root + 'www/index.html.bkp'
    },

    fonts: {
        bower: root + 'www/fonts/'
    },

    js: {
        bower: root + 'www/lib/'
    },

    scss: {
        path: root + 'scss/',
        sources: root + 'scss/*.scss',
        bower: root + 'scss/vendor'
    },

    templates: {
        path: root + 'modules/',
        sources: root + 'modules/**/*.html'
    },

    ts: {
        path: root,
        sources: [root + 'app.ts', root + 'constants/**/.ts', root + 'modules/**/.ts'],
        tsd: root + 'tsd.json'
    }
};