// TravelSite.com

// Required Packages
var gulp       = require('gulp'),
    jshint     = require('gulp-jshint'),
    sass       = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    browserify = require('browserify'),
    source     = require('vinyl-source-stream'),
    buffer     = require('vinyl-buffer'),
    minify     = require('gulp-minify'),
    es         = require('event-stream'),
    rename     = require('gulp-rename'),
    html2js    = require('html2js-browserify'),
    wrap       = require('gulp-wrap'),
    declare    = require('gulp-declare'),
    concat     = require('gulp-concat'),
    image      = require('gulp-image'),
    jasmine    = require('gulp-jasmine'),
    glob       = require('glob'),
    karma      = require('karma-as-promised');

// Default task
gulp.task('default', ['watch']);

// JSHint
gulp.task('js:hint', function(){
  return gulp.src(['./src/js/**/*.js', '!./src/js/vendor/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('js:test', function(){
  return karma.server.start({
    configFile: __dirname+'/karma.conf.js',
    singleRun: true
  });
});

// Js Bundle with Browserify
gulp.task('js:bundle', function(){

  var files = [
    './src/js/app.js',
    './src/js/search_results.js',
    './src/js/vendor.js'
  ];

  var tasks = files.map(function(entry){
    return browserify({
      entries: entry,
      transform: [html2js],
      paths: [
        './src/templates/',
        './src/js/'
      ]
    })
    .bundle()
      .on( 'error', function(err){
        console.log(err.message);
        this.emit('end');
      })
      .pipe( source(entry.replace('./src/js/', '')) )
      // .pipe( buffer() )
      // .pipe( sourcemaps.init({ loadMaps: true }) )
      //   .pipe( minify({
      //     mangle: false
      //   }) )
      // .pipe( sourcemaps.write() )
      .pipe(rename({
        extname: '.bundle.js'
      }))
      .pipe( gulp.dest('./build/js') );
  });

  return es.merge.apply(null, tasks);
});

// Pre-compile scss into css
gulp.task('css:build', function(){
  return gulp.src( './src/sass/**/*.scss' )
    .pipe( sourcemaps.init() )
      .pipe( sass({
        outputStyle: 'nested',
        sourceComments: true
      }).on('error', sass.logError)  )
    .pipe( sourcemaps.write() )
    .pipe( gulp.dest('./build/css') );
});

// Optimize images
gulp.task('img:optimize', function() {
  return gulp.src('./src/imgs/**/*')
    .pipe(image())
    .pipe(gulp.dest('./build/imgs/'));
});

// Watch task
gulp.task('watch', function(){
  gulp.start(['js:hint', 'js:bundle', 'css:build', 'img:optimize']);
  gulp.watch(['./src/js/**/*.js', './src/templates/**/*.html'], ['js:hint', 'js:test', 'js:bundle']);
  gulp.watch('./src/sass/**/*.scss', ['css:build']);
  gulp.watch('./src/imgs/**/*', ['img:optimize']);
  gulp.watch('./tests/**/*.spec.js', ['js:test']);
});
