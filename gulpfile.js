/* eslint-disable */

/**
 * required modules
 */
const gulp = require('gulp');
const gutil = require('gulp-util');
const browserify = require('browserify');
const watchify = require('watchify');
const source = require('vinyl-source-stream');
const browserSync = require('browser-sync');
const eslint = require('gulp-eslint');

/**
 * importing config variables
 */
var config = require('./config');

/**
 * function to handle errors from any task
 */
function handleError (err) {
  gutil.log(err.toString());
  process.exit(-1);
}

/**
 * task to check for lint errors
 */
gulp.task('lint', function() {

  //perform es lint check only if CHECK_LINT_ERRORS flag is true
  if (config.CHECK_LINT_ERRORS) {
    return gulp.src(config.ROOT_DIR + '/**')
      .pipe(eslint())
      // printing the eslint output to console
      .pipe(eslint.format())
      //returning with exit status 1 if there is any lint errors
      .pipe(eslint.failAfterError())
      // passing erros to handleError if any
      .on('error', handleError);
  }
  return true;

});

/**
 * task to bundle all the javscript files from scripts folder
 */
gulp.task('scripts', function() {
  var bundler = watchify(browserify(config.ROOT_DIR + '/' + config.INDEX_FILE, {
    extensions: config.BUNDLING_EXTENSIONS
  }));

  var compile = function() {
    bundler
      .transform('babelify', {
        extensions: config.BUNDLING_EXTENSIONS
      })
      .bundle()
      .on('error', handleError)
      .pipe(source(config.MAIN_JS_FILE))
      .pipe(gulp.dest(config.DIST_DIR));
  };

  bundler.on('update', function() {
    compile();
    gutil.log('Re bundling javascript files...');
  });

  gutil.log('Bundling javascript files...');
  return compile();

});

/**
 * build task
 */
gulp.task('build', ['lint', 'scripts'], function() {
  gutil.log('Build complete...');
});

/**
 * task to start browserSync
 */
gulp.task('browserSync', ['build'], function() {
  browserSync({
    server: {
      baseDir: config.APP_ROOT_DIR
    },
    ghostMode: false
  });
  gulp.watch(config.APP_ROOT_DIR + config.MAIN_JS_FILE, browserSync.reload);
});

/**
 * default task for gulp
 */
gulp.task('default', ['build', 'browserSync'], function() {

  //action to be taken after all the tasks are completed
  gutil.log('Gulp initiating your project');

});

/* eslint-enable */
