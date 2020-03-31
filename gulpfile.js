const gulp = require("gulp"),
  sass = require("gulp-sass"),
  sourcemaps = require("gulp-sourcemaps"),
  autoprefixer = require("gulp-autoprefixer"),
  rename = require("gulp-rename"),
  media = require('gulp-group-css-media-queries'),
  clean = require("gulp-clean"),
  notify = require("gulp-notify"),
  csso = require("gulp-csso"),
  gutil = require("gulp-util"),
  ftp = require('vinyl-ftp'),
  uglify = require("gulp-uglify"),
  babel = require('gulp-babel'),
  concat = require("gulp-concat"),
  imageMin = require("gulp-imagemin"),
  pngquant = require("imagemin-pngquant"),
  tinypng = require("gulp-tinypng-unlimited"),
  cache = require("gulp-cache"),
  filesize = require("gulp-filesize"),
  browser = require("browser-sync").create();

let paths = {
  distHtml: "./dist/",
  buildHtml: "./build/",
  distPhp: "./dist/",
  buildPhp: "./build/",
  distCss: "./dist/scss/",
  buildCss: "./build/css",
  distJs: "./dist/js/",
  buildJs: "./build/js/",
  distImg: "./dist/img/**/",
  buildImg: "./build/img/",
  distFonts: "./dist/fonts/**/",
  buildFonts: "./build/fonts/",
};

function html(done) {
  gulp
    .src(paths.distHtml + "*.html")
    .pipe(gulp.dest(paths.buildHtml))
    .pipe(browser.stream());
  done();
}

function php(done) {
  gulp
    .src(paths.distPhp + "*.php")
    .pipe(gulp.dest(paths.buildPhp))
    .pipe(browser.stream());
  done();
}


function fonts(done) {
  gulp
    .src(paths.distFonts + "*")
    .pipe(gulp.dest(paths.buildFonts))
    .pipe(browser.stream());
  done();
}


function css(done) {
  gulp
    .src(paths.distCss + "*.scss")
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        includePaths: require("node-normalize-scss").includePaths,
        errorLogToConsole: true,
        outputStyle: "compressed"
      })
    )
    .on("error", console.error.bind(console))
    .pipe(media())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 5 versions"],
        cascade: false
      })
    )
    // .pipe(csso())
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(paths.buildCss))
    //.pipe(notify("CSS Ready!")) //сообщение в консоли
    // .pipe(
    //   notify({
    //     message: 'Стили отработали' //сообщение в винде
    //   })
    // )
    .pipe(browser.stream());
  done();
}

function js(done) {
  gulp
    .src(paths.distJs + "*.js")
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat("scripts.js"))
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    // .pipe(uglify().on('error', function (e) {
    //console.log(e);
    // }))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(paths.buildJs))
    //.pipe(notify("Scripts Ready!"))
    .pipe(browser.stream());
  done();
}

function img(done) {
  gulp
    .src(paths.distImg + "*")
    .pipe(filesize())
    // .pipe(cache(imageMin({
    //  optimizationLevel: 7,
    //  interlaced: true,
    //  progressive: true,
    //  svgoPlugins: [{
    //    removeViewBox: false
    //  }],
    //  use: [pngquant()]
    // })))
    .pipe(tinypng())
    .pipe(gulp.dest(paths.buildImg))
    .pipe(filesize())
    .pipe(browser.stream());
  done();
}

function browserSync() {
  browser.init({
    server: "./build",
    online: true
    // tunnel: true,
    //logLevel: 'debug'
  });
}

function deploy(done) {
  let conn = ftp.create({
    host: 'demo.lector-web.com',
    user: 'host1488038_lector',
    password: 'evilLector061182',
    parallel: 10,
    log: gutil.log
  });

  let globs = [
    'build/**'
  ];

  return gulp.src(globs, { buffer: false })
    .pipe(conn.dest('/lector-web.com/htdocs/demo/'));
  done();
}


function watchFiles() {
  gulp.watch(paths.distHtml + "*.html", gulp.series("html"));
  gulp.watch(paths.distPhp + "*.php", gulp.series("php"));
  gulp.watch(paths.distFonts + "*", gulp.series("fonts"));
  gulp.watch(paths.distCss + "*.scss", gulp.series("css"));
  gulp.watch(paths.distJs + "*.js", gulp.series("js"));
  gulp.watch(paths.distImg + "*", gulp.series("img"));
}

gulp.task("html", html);
gulp.task("php", php);
gulp.task("fonts", fonts);
gulp.task("css", css);
gulp.task("js", js);
gulp.task("img", img);
gulp.task("server", browserSync);
gulp.task("watch", watchFiles);
gulp.task("deploy", deploy);

gulp.task(
  "default",
  gulp.series(
    gulp.parallel("html", "fonts", "php", "css", "js", "img"),
    gulp.parallel("watch", "server")
  )
);
