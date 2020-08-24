
var gulp = require('gulp');
var sass = require('gulp-sass');//Sassコンパイル
var plumber = require('gulp-plumber'); //エラー時の強制終了を防止
var notify = require('gulp-notify'); //エラー発生時にデスクトップ通知する
var sassGlob = require('gulp-sass-glob'); //@importの記述を簡潔にする
var browserSync = require('browser-sync'); //ブラウザ反映
var postcss = require('gulp-postcss');//autoprefixerとセット
var autoprefixer = require('autoprefixer');//ベンダープレフィックス付与
var cssdeclsort = require('css-declaration-sorter'); //css並べ替え
var sourcemaps = require('gulp-sourcemaps');//ソースマップ出力

gulp.task('sass', function () {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sourcemaps.init())   // gulp.srcの直後に指定
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))//エラーチェック
    .pipe(sassGlob())//importの読み込みを簡潔にする
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(postcss([autoprefixer(
      {
        // ☆IEは11以上、Androidは4.4以上
        // その他は最新2バージョンで必要なベンダープレフィックスを付与する
        overrideBrowserslist: ["last 2 versions", "ie >= 11", "Android >= 4"],
        cascade: false
      }
    )]))
    .pipe(postcss([cssdeclsort({ order: 'alphabetically' })]))//プロパティをソートし直す(アルファベット順)
    .pipe(sourcemaps.write())  // gulp.destの直前に指定
    .pipe(gulp.dest('./public/css'));

});
// 保存時のリロード
gulp.task('browser-sync', function (done) {
  browserSync.init({

    //ローカル開発
    server: {
      baseDir: "../",
      index: "index.html"
    }
  });
  done();
});
gulp.task('bs-reload', function (done) {
  browserSync.reload();
  done();
});
gulp.task('watch', function (done) {
  gulp.watch('./public/*.html', gulp.task('bs-reload')); //htmlが更新されたらbs-relaodを実行
  gulp.watch('./src/sass/**/*.scss', gulp.task('sass'));//sassが更新されたらgulp sassを実行
  gulp.watch('./src/sass/**/*.scss', gulp.task('bs-reload')); //sassが更新されたらbs-reloadを実行
  gulp.watch('./src/js/*.js', gulp.task('bs-reload')); //jsが更新されたらbs-relaodを実行
});
// default
gulp.task('default', gulp.series(gulp.parallel('browser-sync', 'watch')));

//gulpfole.js,package.jsonなどあるかチェック→gulpでウォッチさせる。画像圧縮は最後にgulp imagemin、ファイルパスは適宜変える感じ
//npm install で同様の環境構築できる
