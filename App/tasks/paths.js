var root = './';
var www = root + 'www/';

module.exports = {
    root: root,

    index: {
        path: www,
        source: www + 'index.html'
    },

    css: {
        path: {
            debug: www + 'debug/',
            release: www + 'release/'
        },
        sources: {
            debug: www + 'debug/**/*.css',
            release: www + 'release/**/*.css'
        }
    },

    fonts: {
        bower: www + 'fonts/'
    },

    js: {
        path: {
            bower: www + 'libs/',
            debug: www + 'debug/',
            release: www + 'release/'
        },
        sources: {
            bower: www + 'libs/**/*.js',
            debug: www + 'debug/**/*.js',
            release: www + 'release/**/*.js'
        }
    },

    scss: {
        path: root + 'scss/',
        sources: root + 'scss/*.scss',
        bower: root + 'scss/vendor'
    },

    templates: {
        path: {
            debug: www + 'modules/',
            release: www + 'modules/'
        },
        sources: root + 'modules/**/*.html'
    },

    ts: {
        path: root,
        sources: [root + 'app.ts', root + 'constants/**/.ts', root + 'modules/**/.ts'],
        tsd: root + 'tsd.json',
        tsconfig: root + 'tsconfig.json'
    }
};