const gulp = require('gulp')
const less = require('gulp-less')
const minifyCss = require('gulp-minify-css')

gulp.task('less', async function () {
  return gulp
    .src('components/css/**/*.less')
    .pipe(less())
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/css'))
})
