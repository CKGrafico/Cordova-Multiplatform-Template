/// <binding BeforeBuild='default' />
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var mainBowerFiles = require('main-bower-files');

var files = {
    css: 'css/**/*.css',
    index: 'index.html',
    indexBkp: 'index.html.bkp',
    js: ['scripts/lib/**/*.js', 'scripts/appbundle.js'],
    maps: ['scripts/appbundle.js.map'],
    scss: 'scss/*.scss',
    ts: 'scripts/**/*.ts'
};

var paths = {
    build: 'build',
    css: 'css',
    project: '../App/',
    scss: 'scss',
    ts: 'scripts',
    js: 'scripts',
    www: 'www'
};

function getCorrectPaths(folder, filesa, filesb) {
    var cfiles = [];
    for (var i = 0; i < filesa.length; i++) {
        cfiles.push(folder + filesa[i]);
    }
    if (filesb) {
        for (var i = 0; i < filesb.length; i++) {
            cfiles.push(folder + filesb[i]);
        }
    }
    return cfiles;
}

// Tasks
gulp.task('default', function () {
    runSequence('default:scss', 'default:inject');
});

gulp.task('initialize', function () {
    runSequence('initialize:bower');
    // 1 Initialize
    // 2 Build Visual Studio Project
    // 3 Default
});

gulp.task('build', function () {
    runSequence('build:js', 'build:clean');
});

gulp.task('zip', function () {
    runSequence('zip:copy', 'zip:compress', 'zip:clean');
});

// Filter node packages
gulp.task('initialize:bower', ['initialize:bower:install'], function () {
    gulp.src(mainBowerFiles('**/*.js'), { base: 'bower_components' })
		.pipe(gulp.dest(paths.project + paths.www + '/' + paths.js + '/lib'));
    
    gulp.src(mainBowerFiles('**/*.d.ts'), { base: 'bower_components' })
		.pipe(gulp.dest(paths.project + paths.ts + '/lib/typings'));
    
    gulp.src(mainBowerFiles('**/fonts/**.*'), { base: 'bower_components' })
		.pipe(gulp.dest(paths.project + paths.www + '/fonts/lib'));
    
    return gulp.src(mainBowerFiles(['**/*.css', '**/*.scss']), { base: 'bower_components' })
		.pipe(plugins.minifyCss({ keepSpecialComments: 0 }))// Because sass import fails with variables in comments
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
gulp.task('default:inject', function () {
    return gulp.src(paths.project + paths.www + '/' + files.index)
		.pipe(plugins.inject(
        gulp.src(getCorrectPaths(paths.project + paths.www + '/', files.css, files.js), { read: false }),
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

// Build JavaScript
gulp.task('build:js', function () {
    return gulp.src(paths.project + paths.www + '/' + files.index)
		.pipe(plugins.inject(
        gulp.src(getCorrectPaths(paths.project + paths.www + '/', files.js))
                .pipe(plugins.concat('scripts/build.min.js'))
                .pipe(plugins.uglify())
                .pipe(gulp.dest(paths.project + paths.www)),
			{
            transform: function (filepath) {
                return '<script src="' + filepath.replace(paths.project + paths.www + '/', '').substring(1) + '"></script>'
            }
        }
    ))
     .pipe(gulp.dest(paths.project + paths.www))
});

// Build Clean
gulp.task('build:clean', function () {
    return gulp.src(getCorrectPaths(paths.project + paths.www + '/', files.js, files.maps), { read: false })
        .pipe(plugins.clean({ force: true }));
});

// Create a Zip template for VS
gulp.task('zip:copy', function () {
    var dest = '../zipCreatorTemp';
    gulp.src(['../__TemplateIcon.ico', '../LICENSE', '../*.md', '../*.sln', '../*.vstemplate'])
        .pipe(plugins.clone())
        .pipe(gulp.dest(dest));
        
    gulp.src('../Tasks/*.*')
        .pipe(plugins.clone())
        .pipe(gulp.dest(dest + '/Tasks'));
        
    gulp.src('../App/*.*')
        .pipe(plugins.clone())
        .pipe(gulp.dest(dest + '/App'));
        
    gulp.src('../App/merges/**/*.*')
        .pipe(plugins.clone())
        .pipe(gulp.dest(dest + '/App/merges'));
        
    gulp.src('../App/plugins/**/*.*')
        .pipe(plugins.clone())
        .pipe(gulp.dest(dest + '/App/plugins'));
    
    gulp.src('../App/res/**/*.*')
        .pipe(plugins.clone())
        .pipe(gulp.dest(dest + '/App/res'));
        
    gulp.src('../App/scss/**/*.*')
        .pipe(plugins.clone())
        .pipe(gulp.dest(dest + '/App/scss'));
        
    gulp.src('../App/scripts/**/*.*')
        .pipe(plugins.clone())
        .pipe(gulp.dest(dest + '/App/scripts'));
        
    return gulp.src('../App/www/**/*.*')
        .pipe(plugins.clone())
        .pipe(gulp.dest(dest + '/App/www'));
});

var zip;
gulp.task('zip:compress', function () {
    var dest = '../zipCreatorTemp';
    var d = new Date(Date.now());
    zip = 'Cordova-' + d.getDate() + '_' + (d.getMonth()+1) + '_' + d.getFullYear() + '-' + d.getHours() + '_' + d.getMinutes() + '_' + d.getSeconds();
    return gulp.src(dest + '/**/*')
        .pipe(plugins.zip(zip + '.zip'))
        .pipe(gulp.dest('../'));
});

gulp.task('zip:clean', function () {
    //gulp.src('../' + zip + '.zip/**/lib??', { read: false })
    //    .pipe(plugins.clean({ force: true }));
    // Todo remove /lib folders    
    var dest = '../zipCreatorTemp';
    return gulp.src(dest, {read: false})
        .pipe(plugins.clean({force: true}))
});