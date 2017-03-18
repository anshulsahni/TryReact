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
 * returns a method which will be called by different tasks to bundle js files
 * @param  {string} dir    destination directory
 * @param  {string} file   name of bundled file
 * @param  {Boolean} update whether to put watch on updation or not
 * @return {function}        method which will be called by gulp tasks
 */
const bundleJs = function(options) {
  return function() {

    const bundler = watchify(browserify(options.srcDir + '/' + options.srcFile, {
      extensions: config.BUNDLING_EXTENSIONS
    }));

    const compile = function() {
      bundler
      .transform('babelify', {
        extensions: config.BUNDLING_EXTENSIONS
      })
      .bundle()
      .on('error', handleError)
      .pipe(source(options.destFile))
      .pipe(gulp.dest(options.destDir));
    };

    if (options.update) {
      bundler.on('update', function() {
        compile();
        gutil.log('Re bundling javascript files...');
      });
    }

    gutil.log('Bundling javascript files...');
    return compile();
  };
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
gulp.task('scripts:development', bundleJs({
  srcDir: config.EXAMPLE_DIR + '/scripts',
  srcFile: 'Root.jsx',
  destDir: config.EXAMPLE_DIR + '/build',
  destFile: 'main.js',
}));

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
