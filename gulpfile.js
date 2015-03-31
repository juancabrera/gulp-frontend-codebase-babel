'use strict';

var
  fs                 = require("fs"), 
  gulp               = require('gulp'),
  connect            = require('gulp-connect'),
  browserify         = require("browserify"), 
  to5ify             = require("babelify"), 
  sass               = require('gulp-ruby-sass'), 
  prefix             = require('gulp-autoprefixer'),
  slim               = require("gulp-slim")
;

// JavaScript
gulp.task('to5ify', function() {
  browserify('./source/js/main.js', { debug: false })
    .transform(to5ify)
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(fs.createWriteStream("./dist/js/main.js"));
});

// Styles
gulp.task('scss2css', function() {
  sass('./source/scss/main.scss') 
  .on('error', function (err) {
    console.error('Error!', err.message);
  })
  .pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7"))
  .pipe(gulp.dest('./dist/css/'));
});

// Templates
gulp.task('slim2html', function(){
  gulp.src("./source/slim/*.slim")
    .pipe(slim({
      pretty: true
    }))
    .pipe(gulp.dest("./dist/"));
});

// Local webserver
gulp.task('connect', function() {
  connect.server();
});

gulp.task('watch', function() {
  gulp.watch('./source/js/*.js', ['to5ify']);
  gulp.watch('./source/scss/*.scss', ['scss2css']);
  gulp.watch('./source/slim/*.slim', ['slim2html']);
});

gulp.task('default', ['connect', 'watch']);