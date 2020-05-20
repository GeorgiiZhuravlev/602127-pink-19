'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sourcemap = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var webp = require('gulp-webp');
var svgstore = require('gulp-svgstore');
var posthtml = require('gulp-posthtml');
var include = require('posthtml-include');
var del = require('del');
var minify = require('gulp-minifier');
var server = require('browser-sync').create();

gulp.task('css', function () {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('images', function () {
  return gulp.src('source/img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('source/img'));
})

gulp.task('webp', function () {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest('source/img'));
})

gulp.task('icon-sprite', function () {
  return gulp.src('source/img/icon-*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('icon-sprite.svg'))
    .pipe(gulp.dest('build/img'));
})

gulp.task('logo-sprite', function () {
  return gulp.src('source/img/logo-*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('logo-sprite.svg'))
    .pipe(gulp.dest('build/img'));
})

gulp.task('js-min', function () {
  return gulp.src('source/js/**/*.js')
    .pipe(rename(function (path) {
      path.basename += '.min';
    }))
    .pipe(minify({
      minify: true,
      minifyJS: {
        sourceMap: true
      }
    }))
    .pipe(gulp.dest('build/js'))
})

gulp.task('html', function () {
  return gulp.src('source/*.html')
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest('build'));
})

gulp.task('html-min', function () {
  return gulp.src('build/**/*.html')
    .pipe(minify({
      minify: true,
      minifyHTML: {
        collapseWhitespace: true,
        conservativeCollapse: true
      }
    }))
    .pipe(gulp.dest('build'))
})

gulp.task('copy', function () {
  return gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source/img/**',
    'source/*.ico'
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('build'));
})

gulp.task('clean', function () {
  return del('build');
})

gulp.task('server', function () {
  server.init({
    server: { baseDir: 'build/', index: 'index.html' },
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/js/**/*.js', gulp.series('js-min', 'refresh'));
  gulp.watch('source/sass/**/*.scss', gulp.series('css'));
  gulp.watch('source/img/icon-*.svg', gulp.series(
    'icon-sprite',
    'logo-sprite',
    'html',
    'refresh'
  ));
  gulp.watch('source/*.html', gulp.series('html', 'html-min', 'refresh'));
});

gulp.task('refresh', function (done) {
  server.reload();
  done();
})

gulp.task('build', gulp.series(
  'clean',
  'copy',
  'css',
  'icon-sprite',
  'logo-sprite',
  'js-min',
  'html',
  'html-min'
));

gulp.task('start', gulp.series(
  'build',
  'server'
));
