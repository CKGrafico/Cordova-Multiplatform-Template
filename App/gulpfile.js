/// <binding BeforeBuild='default:clean' AfterBuild='defaultVS' ProjectOpened='initialize' />
require('require-dir')('tasks');
var gulp = require('gulp');
var runSequence = require('run-sequence');

// Working without Visual Studio
    // 1.- `npm install`
    // 2.- `gulp initialize`
    // 3.- `gulp watch`
    // 4.- `ionic serve`

// Working with Visual Studio
    // 1.- Open your project and wait auto npm installation
    // 3.- Build

gulp.task('default', function () {
    // Compile Sass, TypeScript and inject files into index.html
    runSequence('default:clean', 'default:scss', 'default:ts', 'default:html', 'default:inject');
});
    
gulp.task('defaultVS', function () {
    // Compile Sass, inject files into index.html (for Visual Studio)
    runSequence('default:scss', 'default:html', 'default:inject');
});
    
gulp.task('initialize', function () {
    // Download and install bower packages
    runSequence('initialize:tsd', 'initialize:bower');
});
    
gulp.task('build', function () {
    // Build project
    runSequence('default', 'build:files', 'build:clean');
});