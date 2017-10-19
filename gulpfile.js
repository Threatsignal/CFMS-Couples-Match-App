var Builder = require('systemjs-builder');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var del = require('del');

var distPath = 'dist';
var pdfMake = 'pdfmake';



//gulp.task('copyData', ['bundleCouplesMatch'], function(){
//  return gulp.src([
//      'data/*/**',
//    ])
//    .pipe(gulp.dest(distPath+'/data'))
//});

gulp.task('deleteDist', function(){
  return del([distPath]);
});

gulp.task("bundleCouplesMatch", ['buildCouplesVendors'], function() {
  var builder = new Builder('', 'systemjs.config.js');
  return builder
  .buildStatic('app/main.js', distPath + '/bundles/couples-match-bundle.min.js')
  .then(function() {
    gulp.src(distPath+'/bundles/couples-match-bundle.min.js')
      .pipe(uglify())
      .pipe(gulp.dest(distPath + '/bundles'));
    console.log('Build complete');
  })
  .catch(function(err) {
    console.log('Build error');
    console.log(err);
  });
  
});

gulp.task("buildCouplesVendors",['deleteDist'], function(){
  return gulp.src([
    pdfMake+ '/pdfmake.min.js',
    pdfMake+ '/vfs_fonts.js'
  ])
  .pipe(concat('couples-match-vendors.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest(distPath + '/bundles'));
  
});
gulp.task("copyFilesTesting", ['bundleCouplesMatch'], function(){
  gulp.src([
      'index.html',
      'data/**/*',
      'js/**/*',
      'stylesheets/**/*',
      'images/**/*',
      'view/**/*'
    ], {base: './'})
    .pipe(gulp.dest(distPath))
});


gulp.task("copyFilesProduction", ['bundleCouplesMatch'], function(){
  gulp.src([
      'index.html',
      'data/**/*',
      'view/**/*'
    ], {base: './'})
    .pipe(gulp.dest(distPath))
});

gulp.task('default', ['copyFilesProduction']);

gulp.task('buildTesting', ['copyFilesTesting']);
  
  
