var gulp = require('gulp');
var paths = require('./paths');
var plugins = require('gulp-load-plugins')();
var tsProject = plugins.typescript.createProject(paths.ts.tsconfig);

// Compile Sass
gulp.task('default:scss', function () {
    return gulp.src(paths.scss.sources)
            .pipe(plugins.sass())
            .pipe(plugins.autoprefixer({
            browsers: ['last 2 version', 'android 4']
        }))
        .pipe(plugins.minifyCss())
        .pipe(gulp.dest(paths.css.path.debug));
});

// Compile Typescript
gulp.task('default:ts', function () {
    return tsProject.src()
        .pipe(plugins.typescript(tsProject))
        .pipe(gulp.dest(paths.root));
});

// Inject files into index
gulp.task('default:inject', function () {
    return gulp.src(paths.index.source)
        .pipe(plugins.inject(
            gulp.src([paths.js.sources.bower, paths.js.sources.debug, paths.css.sources.debug]),
                    { read: false, addRootSlash: false, relative: true }))
        .pipe(gulp.dest(paths.index.path));
});