var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var livereload = require('gulp-livereload');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function() {
    gulp.src('src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./css/'));
});

gulp.task('scripts', function() {
    return gulp.src(['src/javascript/modules/**/*.js', 'src/javascript/main.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./js/'));
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(['src/sass/**/*.scss', 'src/javascript/**/*.js'], ['default', 'watch']);
});

gulp.task('default', function() {
    gulp.run(['styles', 'scripts']);
});


