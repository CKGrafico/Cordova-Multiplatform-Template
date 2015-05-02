// TODO UPdate this
//var gulp = require('gulp');
//var plugins = require('gulp-load-plugins')();
//var mainBowerFiles = require('main-bower-files');

//var files = {
//	build: 'build/**/*.*',
//	buildJS: 'build/code.js',
//	buildCSS: 'build/styles.css',
//	css: 'css/**/*.css',
//	filePaths: ['css/**/*.css', 'ts/lib/**/*.js', 'ts/Config.js', 'ts/Services/*.js', 'ts/Models/*.js', 'ts/Interfaces/*.js', 'ts/Directives/*.js', 'ts/Filters/*.js', 'ts/Controllers/Base/*.js', 'ts/Controllers/*.js', 'ts/App.js'],
//	index: 'index.html',
//    indexBkp: 'index.html.bkp',
//    js: 'ts/**/*.js',
//	scss: 'scss/*.scss',
//	scssAll: 'scss/**/*.scss'
//};

//var paths = {
//	build: 'build',
//	css: 'css',
//	ts: 'ts',
//	project: '../App/',
//	scss: 'scss'
//};

//function getCorrectPaths(folder, files) {
//    var cfiles = [];
//    for (var i = 0; i < files.length; i++) {
//        cfiles.push(folder + files[i]);
//    }
    
//    return cfiles;
//}

//// Compile Sass
//gulp.task('sass', function(){
//	return gulp.src(paths.project + files.scss)
//		.pipe(plugins.sass())
//		.pipe(plugins.autoprefixer({
//		    browsers: ['last 2 version', 'android 4']
//		}))
//		.pipe(gulp.dest(paths.project + paths.css));
//});

//// Install bower dependencies
//gulp.task('bower.install', function () {
//	return plugins.bower();
//});

//// Filter node packages
//gulp.task('bower',['bower.install'], function () {
//	gulp.src(mainBowerFiles('**/*.js'), { base: 'bower_components' })
//		.pipe(gulp.dest(paths.project + '/' + paths.ts + '/lib'));
	
//	gulp.src(mainBowerFiles('**/*.d.ts'), { base: 'bower_components' })
//		.pipe(gulp.dest(paths.project + '/' + paths.ts + '/lib/typings'));
	
//	gulp.src(mainBowerFiles('**/fonts/**.*'), { base: 'bower_components' })
//		.pipe(gulp.dest(paths.project + '/fonts/lib'));

//	return gulp.src(mainBowerFiles(['**/*.css', '**/*.scss']), { base: 'bower_components' })
//		.pipe(plugins.minifyCss({ keepSpecialComments: 0 })) // Because sass import fails with variables in comments
//		.pipe(plugins.rename(function (path) {
//			path.extname = ".scss"
//		}))
//		.pipe(gulp.dest(paths.project + '/' + paths.scss + '/lib'));
//});

//// Inject JS & CSS Files
//gulp.task('inject',['bower'], function() {
//	return gulp.src(paths.project + files.index)
//		.pipe(plugins.inject(
//			gulp.src(getCorrectPaths(paths.project, files.filePaths), { read: false }),
//			{
//				transform: function (filepath) {
//					if (filepath.indexOf('.js') > -1) {
//						return '<script src="' + filepath.replace(paths.project, '').substring(1) + '"></script>'
//					}
//					// Css
//					return ' <link rel="stylesheet" href="' + filepath.replace(paths.project, '').substring(1) + '">'
//				}
//			}
//		))
//		.pipe(gulp.dest(paths.project));
//});

//// Celan specific folders
//gulp.task('clear', function () {

//	// If exist indexBkp replace normal index and delete this
//	gulp.src(paths.project + files.indexBkp)
//		.pipe(plugins.rename(files.index))
//		.pipe(gulp.dest(paths.project)); 

//	return gulp.src(paths.project + files.build, { read: false })
//	   .pipe(plugins.clean({ force: true }));
//});

//// Build Files
//gulp.task('buildFiles', function() {
//	// Save index
//	gulp.src(paths.project + files.index)
//		.pipe(plugins.clone())
//		.pipe(plugins.rename(files.indexBkp))
//		.pipe(gulp.dest(paths.project));

//	// Build files
//	gulp.src(paths.project + files.index)
//		.pipe(plugins.usemin(
//			{
//				css: [plugins.minifyCss()],
//				js: [plugins.uglify()]
//			}
//		))
//		.pipe(gulp.dest(paths.project));
	
//	gulp.src(paths.project + files.buildJS)
//		.pipe(plugins.uglify())
//		.pipe(gulp.dest(paths.project + paths.build));

//	return gulp.src(paths.project + files.buildCSS)
//		.pipe(plugins.minifyCss())
//		.pipe(gulp.dest(paths.project + paths.build));
//});

//// Init watch
//gulp.task('watch', function () {
//	gulp.watch(paths.project + files.js, ['inject']);
//	gulp.watch(paths.project + files.scssAll, ['sass', 'inject']);
//});

//gulp.task('default', ['clear', 'inject', 'sass']);
//gulp.task('build', ['default', 'buildFiles']);
//