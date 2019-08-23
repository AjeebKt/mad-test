const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const cssnano = require('cssnano')
const runSequence = require('run-sequence');
const livereload = require('gulp-livereload');
const connect = require('gulp-connect');
const nunjucksRender = require('gulp-nunjucks-render');
const notify = require('gulp-notify');
const htmlmin = require('gulp-htmlmin');
const rename = require('gulp-rename');

const config = {
    htmlPath: './assets',
    sassDir: './assets/scss',
    jsPath: './assets/js',
    imageDir: './assets/images'
};
const processors = [
    autoprefixer({ browsers: 'last 2 versions, ie 11' }),
    mqpacker,
    cssnano,
  ];

  
gulp.task('images', function () {
    return gulp.src(config.imageDir + '/*.{png,gif,jpg,ico}')
        .pipe(gulp.dest('./public/images'));
});

gulp.task('styles', function () {
    return gulp.src(config.sassDir + '/app.scss')
        .pipe(sass())
        .on("error", notify.onError(function (error) {
            return "Error: " + error.message;
        }))
        .pipe(postcss(processors))
        .pipe(gulp.dest('./public/css'))
        .pipe(livereload());
});

  nunjucksRender.nunjucks.configure(['assets/']);
  gulp.task('renderTemplates', function () {
    return gulp.src('assets/index.html')
      .pipe(nunjucksRender({
        path: ['assets/'],
        watch: false
      }))
      .pipe(htmlmin({
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        conservativeCollapse: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
      }))
      .pipe(rename(function (file) {
        file.dirname = file.dirname.substring(file.dirname.lastIndexOf("/") + 1);
        return file;
      }))
      .pipe(gulp.dest('./public'));
  });

gulp.task('connect', function () {
    connect.server({
      root: 'public/',
      port: 8081,
      livereload: true
    });
  });

gulp.task('watch', function () {
    gulp.watch(['resources/**/*'], ['build']);
    livereload.listen();
});

gulp.task('dev', function () {
    runSequence('watch', 'build',  'connect')
});

gulp.task('build', function () {
    runSequence('styles', 'images', 'renderTemplates', function (done) {
    // runSequence('styles', 'images', 'svgo', 'renderTemplates', function (done) {
        console.log(new Date().toLocaleTimeString() + " - Build finished");
    });
});

// gulp.task('default', gulp.series(['watch']));
