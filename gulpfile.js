var gulp        = require('gulp');
var watch       = require('gulp-watch');
var plumber     = require('gulp-plumber'); // Stream中に起こるエラーが原因でタスクが強制停止することを防止するモジュール。watch中にエラーが発生するとwatchが停止してしまう。
var notify      = require('gulp-notify'); // エラーが発生した時にデスクトップに通知するモジュール
var sass        = require('gulp-sass'); // sassを使用するためのモジュール
var browserSync = require('browser-sync').create();
var webpack     = require('webpack');
var webpackStream = require('webpack-stream'); // webpack.config.jsを読み込むためのモジュール
var webpackConfig = require('./webpack.config.js'); // webpackの設定ファイル

gulp.task('compile', function(){
  return gulp.src([
    './src/js/index.js',
    ])
    .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
    .pipe(webpackStream(webpackConfig), null, function(err, stats){
      if(stats.compliation.errors.length > 0){
        notify({
          title: 'webpack error',
          message: stats.compliation.errors[0].error
        });
      }
    })
    .pipe(gulp.dest('js'))
});

gulp.task('sass', function(){
  return gulp.src('./src/sass/**/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(sass())
    .pipe(gulp.dest('./css'));
})

// Static server
gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
});

gulp.task('watch', function () {
  watch(['./src/js/**/**.js'], gulp.task(['compile']));
  watch(['./src/sass/**/**.scss'], gulp.task(['sass']));
  // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
  watch(['./**/*.html', './js/**/*.js', './css/**/**.css'], function () {
      browserSync.reload();
  });
});

gulp.task('default', gulp.series( gulp.parallel('compile', 'sass', 'browser-sync', 'watch'), function(){

}));