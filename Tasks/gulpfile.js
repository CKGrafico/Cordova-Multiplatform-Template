/// <binding BeforeBuild='default' />
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var mainBowerFiles = require('main-bower-files');

var files = {
    filePaths: ['css/**/*.css', 'scripts/lib/**/*.js', 'scripts/appbundle.js'],
    index: 'index.html',
    indexBkp: 'index.html.bkp',
    scss: 'scss/*.scss',
    ts: 'ts/**/*.ts'
};

var paths = {
	build: 'build',
	css: 'css',
    project: '../App/',
    scss: 'scss',
    ts: 'ts',
    js: 'scripts',
    www: 'www'
};

function getCorrectPaths(folder, files) {
    var cfiles = [];
    for (var i = 0; i < files.length; i++) {
        cfiles.push(folder + files[i]);
    }
    return cfiles;
}

// Tasks
gulp.task('default', function (callback) {
    runSequence('default:scss', 'default:inject');
});

gulp.task('initialize', function (callback) {
    runSequence('initialize:bower', 'default');
});

// Filter node packages
gulp.task('initialize:bower',['initialize:bower:install'], function () {
	gulp.src(mainBowerFiles('**/*.js'), { base: 'bower_components' })
		.pipe(gulp.dest(paths.project + paths.www + '/' + paths.js + '/lib'));
	
	gulp.src(mainBowerFiles('**/*.d.ts'), { base: 'bower_components' })
		.pipe(gulp.dest(paths.project + paths.ts + '/lib/typings'));
	
	gulp.src(mainBowerFiles('**/fonts/**.*'), { base: 'bower_components' })
		.pipe(gulp.dest(paths.project + paths.www + '/fonts/lib'));

	return gulp.src(mainBowerFiles(['**/*.css', '**/*.scss']), { base: 'bower_components' })
		.pipe(plugins.minifyCss({ keepSpecialComments: 0 })) // Because sass import fails with variables in comments
		.pipe(plugins.rename(function (path) {
			path.extname = ".scss"
		}))
		.pipe(gulp.dest(paths.project + '/' + paths.scss + '/lib'));
});

// Install bower dependencies
gulp.task('initialize:bower:install', function () {
    return plugins.bower();
});

// Inject JS & CSS Files
gulp.task('default:inject', function() {
	return gulp.src(paths.project + paths.www + '/' + files.index)
		.pipe(plugins.inject(
			gulp.src(getCorrectPaths(paths.project + paths.www + '/', files.filePaths), { read: false }),
			{
				transform: function (filepath) {
					if (filepath.indexOf('.js') > -1) {
						return '<script src="' + filepath.replace(paths.project + paths.www + '/', '').substring(1) + '"></script>'
					}
					// Css
					return ' <link rel="stylesheet" href="' + filepath.replace(paths.project + paths.www + '/', '').substring(1) + '">'
				}
			}
		))
		.pipe(gulp.dest(paths.project + paths.www));
});

// Compile Sass
gulp.task('default:scss', function () {
    return gulp.src(paths.project + files.scss)
		.pipe(plugins.sass())
		.pipe(plugins.autoprefixer({
        browsers: ['last 2 version', 'android 4']
    }))
		.pipe(gulp.dest(paths.project + paths.www + '/' + paths.css));
});

// TODO Build