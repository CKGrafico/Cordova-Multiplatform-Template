'use strict';

var path = require('path');
var conf = require('./tasks/paths');

var _ = require('lodash');
var wiredep = require('wiredep');

var pathSrcHtml = [
  './www/modules/**/*.html'
  //path.join(conf.paths.src, '/**/*.html')
];

var wiredepOpts = {
  exclude: [ 
  'bower_components/angular/',
  'bower_components/angular-animate/',
  'bower_components/angular-sanitize/',
  'bower_components/angular-ui-router/',
    ],
  "overrides": {
    "ionic": {
      "main": [
        "**/ionic.bundle.js",
        "**/**/*.scss",
        "**/release/fonts/**.*"
      ]
    },
    "angular": {
      "ignore": true
    },
    "angular-animate": {
      "ignore": true
    },
    "angular-sanitize": {
      "ignore": true
    },
    "angular-ui-router": {
      "ignore": true
    }
  }
};

function listFiles() {
  var wiredepOptions = _.extend({}, wiredepOpts, {
    dependencies: true,
    devDependencies: true
  });

  return wiredep(wiredepOptions).js
    .concat([
      conf.js.sources.debug//path.join(, '/serve/app/index.module.js'),
    ])
    .concat(pathSrcHtml);
}

module.exports = function(config) { //

  var configuration = {
    files: listFiles(),

    singleRun: false,

    autoWatch: false,

    ngHtml2JsPreprocessor: {
      stripPrefix: 'www/',
      moduleName: 'app',
      cacheIdFromPath: function(filepath) {
        // example strips 'public/' from anywhere in the path
        // module(app/templates/template.html) => app/public/templates/template.html
        var cacheId = filepath.replace('www/', '');
        return cacheId;
      },
    },

    logLevel: 'WARN',

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],

    plugins : [
      'karma-phantomjs-launcher',
      'karma-coverage',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor',
      'karma-spec-reporter'
    ],

    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },

    reporters: ['progress', 'spec']
  };

  // This is the default preprocessors configuration for a usage with Karma cli
  // The coverage preprocessor is added in gulp/unit-test.js only for single tests
  // It was not possible to do it there because karma doesn't let us now if we are
  // running a single test or not
  configuration.preprocessors = {};
  pathSrcHtml.forEach(function(path) {
    configuration.preprocessors[path] = ['ng-html2js'];
  });

  // This block is needed to execute Chrome on Travis
  // If you ever plan to use Chrome and Travis, you can keep it
  // If not, you can safely remove it
  // https://github.com/karma-runner/karma/issues/1144#issuecomment-53633076
  if(configuration.browsers[0] === 'Chrome' && process.env.TRAVIS) {
    configuration.customLaunchers = {
      'chrome-travis-ci': {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    };
    configuration.browsers = ['chrome-travis-ci'];
  }

  config.set(configuration);
};
