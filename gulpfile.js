var gulp = require('gulp'),
    del = require('del'),
    pump = require('pump'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin');

// ///////////////////////////////
// minify js
// ///////////////////////////////

gulp.task('uglify', function(cb) {
  pump([
      gulp.src(['src/js/main.js', 'src/js/perfmatters.js']),
      uglify(),
      gulp.dest('dist/js')
  ], cb);
});

// ///////////////////////////////
// minify css
// ///////////////////////////////

gulp.task('cleancss', function() {
  return gulp.src('src/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'))
});

// ///////////////////////////////
// minify html
// ///////////////////////////////

gulp.task('minhtml', function() {
  return gulp.src(['src/index.html', 'src/pizza.html'])
    .pipe(htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    }))
    .pipe(gulp.dest('dist'))
    //might be really wrong with the '.' thing
});

// ///////////////////////////////
// clean out image dest folder
// ///////////////////////////////

gulp.task('clean:images', function() {
  return del([
      'dist/images/**/*'
  ]);
});

// ///////////////////////////////
// minify images
// ///////////////////////////////

gulp.task('minimage', ['clean:images'], function() {
  return gulp.src('src/img/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/img'))
});

// ///////////////////////////////
// Default task
// ///////////////////////////////

gulp.task('default', ['minhtml', 'minimage']);
