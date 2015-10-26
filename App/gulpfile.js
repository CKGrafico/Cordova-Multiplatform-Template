/// <binding BeforeBuild='initialize, default-vs' />
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var mainBowerFiles = require('main-bower-files');
var tsProject = plugins.typescript.createProject('modules/tsconfig.json');

var files = {
    css: ['css/**/*.css'],
    index: 'index.html',
    indexBkp: 'index.html.bkp',
    js: ['lib/**/*.js', 'modules/appbundle.js'],
    maps: ['modules/appbundle.js.map'],
    scss: 'scss/*.scss',
    ts: 'modules/**/*.ts'
};

var paths = {
    build: 'build',
    css: 'css',
    project: '',
    scss: 'scss',
    ts: 'modules',
    js: 'modules',
    www: 'www'
};

// Working without Visual Studio
    // 1.- npm install
    // 2.- gulp initialize
    // 3.- gulp watch
    // 4.- ionic serve

// Working with Visual Studio
    // 1.- npm install

// Tasks definition
    gulp.task('default', function () {
        // Compile Sass, TypeScript and inject files into index.html
        runSequence('default:scss', 'default:ts', 'default:inject');
    });
    
    gulp.task('default-vs', function () {
        // Compile Sass, inject files into index.html (for Visual Studio)
        runSequence('default:scss', 'default:inject');
    });
    
    gulp.task('initialize', function () {
        // Download and install bower packages
        runSequence('initialize:tsd', 'initialize:bower');
    });
    
    gulp.task('build', function () {
        // Build project
        runSequence('build:js', 'build:clean');
    });
    
    gulp.task('zip', function () {
        // Zip template (only for dev purposes)
        runSequence('zip:copy', 'zip:compress', 'zip:clean');
    });
    
    gulp.task('watch', function () {
        runSequence('default');
        gulp.watch(paths.project + files.scss, ['default:scss']);
        return gulp.watch(paths.project + files.ts, ['default:ts']);
    });

// Tasks implementation
    // Download bower dependencies
    gulp.task('initialize:bower:install', function () {
        return plugins.bower();
    });
    
    gulp.task('initialize:tsd', function () {
        return gulp.src('tsd.json').pipe(plugins.tsd());
    });
    
    // Move bower packages to each folder
    gulp.task('initialize:bower', ['initialize:bower:install'], function () {
        gulp.src(mainBowerFiles('**/*.scss'), { base: 'bower_components' })
            .pipe(gulp.dest(paths.project + paths.scss + '/vendor'));
            
        gulp.src(mainBowerFiles('**/*.js'), { base: 'bower_components' })
            .pipe(gulp.dest(paths.project + paths.www + '/lib/js'));

        return gulp.src(mainBowerFiles('**/fonts/**.*'), { base: 'bower_components' })
            .pipe(gulp.dest(paths.project + paths.www + '/lib/fonts'));
        
        //return gulp.src(mainBowerFiles(['**/*.css', '**/*.scss']), { base: 'bower_components' })
            //.pipe(plugins.minifyCss({ keepSpecialComments: 0 }))// Because sass import fails with variables in comments
            //.pipe(plugins.rename(function (path) {
        //    path.extname = ".scss"
        //}))
            //.pipe(gulp.dest(paths.project + '/' + paths.scss + '/lib'));
    });
    
    // Inject files into index
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
    
    // Compile Typescript
    gulp.task('default:ts', function () {
        return tsProject.src()
            .pipe(plugins.typescript(tsProject))
            .pipe(gulp.dest(paths.project));
    });
    
    // Build JavaScript
    gulp.task('build:js', function () {
        return gulp.src(paths.project + paths.www + '/' + files.index)
            .pipe(plugins.inject(
            gulp.src(getCorrectPaths(paths.project + paths.www + '/', files.js))
                    .pipe(plugins.concat('modules/build.min.js'))
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
            
        gulp.src('*.*')
            .pipe(plugins.clone())
            .pipe(gulp.dest(dest + '/App'));
            
        gulp.src('merges/**/*.*')
            .pipe(plugins.clone())
            .pipe(gulp.dest(dest + '/App/merges'));
            
        gulp.src('plugins/**/*.*')
            .pipe(plugins.clone())
            .pipe(gulp.dest(dest + '/App/plugins'));
        
        gulp.src('res/**/*.*')
            .pipe(plugins.clone())
            .pipe(gulp.dest(dest + '/App/res'));
            
        gulp.src(['scss/**/*.*', '!scss/lib/**/*.*'])
            .pipe(plugins.clone())
            .pipe(gulp.dest(dest + '/App/scss'));
            
        gulp.src(['modules/**/*.*', '!modules/lib/**/*.*'])
            .pipe(plugins.clone())
            .pipe(gulp.dest(dest + '/App/scripts'));
            
        return gulp.src(['www/**/*.*', '!www/fonts/lib/**/*.*', '!www/modules/lib/**/*.*', '!www/css/**/*.*', '!www/modules/appbundle.*'])
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
        var dest = '../zipCreatorTemp';
        return gulp.src(dest, {read: false})
            .pipe(plugins.clean({force: true}))
    });
    
    function getCorrectPaths(folder, filesa, filesb) {
        var cfiles = [];
        for (var i = 0; i < filesa.length; i++) {
            cfiles.push(folder + filesa[i]);
        }
        if (filesb) {
            for (var j = 0; j < filesb.length; j++) {
                cfiles.push(folder + filesb[j]);
            }
        }
        return cfiles;
    }