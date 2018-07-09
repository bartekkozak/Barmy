const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const babelify = require("babelify");
const browserify = require("browserify");
const connect = require("gulp-connect");
const source = require("vinyl-source-stream");

// optimize images

gulp.task("imageMin", () =>
  gulp
    .src("src/images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("main/images"))
);

// babel

gulp.task("babel", function() {
  return browserify({
    entries: ["src/js/scripts.js"]
  })
    .transform(
      babelify.configure({
        presets: ["es2015"]
      })
    )
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("main/js"));
});

// compile sass

gulp.task("sass", function() {
  gulp
    .src("src/sass/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        browsers: ["last 3 versions"]
      })
    )
    .pipe(gulp.dest("main/css"));
});

// browser sync

gulp.task("browserSync", function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task("watch", function() {
  gulp.watch("src/js/*.js", ["babel"]).on("change", browserSync.reload);
  gulp.watch("src/images/*", ["imageMin"]).on("change", browserSync.reload);
  gulp.watch("src/sass/*.scss", ["sass"]).on("change", browserSync.reload);
  gulp.watch("./*.html", ["browserSync"]).on("change", browserSync.reload);
});

gulp.task("default", ["imageMin", "sass", "babel", "browserSync", "watch"]);
