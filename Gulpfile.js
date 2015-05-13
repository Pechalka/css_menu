var gulp = require('gulp'),
    connect = require('gulp-connect');

var nib = require('nib');
var rename = require('gulp-rename');
var stylus = require('gulp-stylus');
var minifyCss = require('gulp-minify-css');

gulp.task('connect', function() {
  connect.server({
    port : 5000,
    root: 'public',
    livereload: true
  });
});

gulp.task('html', function () {
    gulp.src('./public/*.html')
        .pipe(connect.reload());
});

gulp.task('css', function(){
    return gulp.src('assets/css/main.styl')
        .pipe(stylus({
            errors: true,
            use: [nib()]
        }))
        .pipe(rename('style.css'))
        // .pipe(minifyCss({
        //     keepSpecialComments: 0,
        //     processImport: true
        // }))
        .pipe(gulp.dest('public'))
        .pipe(connect.reload());
})

gulp.task('watch', function () {
    gulp.watch(['./public/*.html'], ['html']);  
    gulp.watch(['./assets/css/*.*'], ['css']);      
});


gulp.task('default', ['connect', 'watch']);

