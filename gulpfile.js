/* eslint-disable */

/**
 * required modules
 */
const gulp = require('gulp');
const gutil = require('gulp-util');
const browserify = require('browserify');
const watchify = require('watchify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserSync = require('browser-sync');
const eslint = require('gulp-eslint');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

/**
 * function to handle errors from any task
 */
function handleError (err) {
  gutil.log(err.toString());
  process.exit(-1);
}

/**
 * extensions which will be bundled by babelify and browserify
 */
const bundlingExtensions = [
  '.jsx',
  '.js',
];

/**
 * function that does the actual check for lint errors
 * @param  {Boolean} failOnErr [whether to fail the task if there is any lint error]
 * @return {Function}           [does all the check for lint for linting gulp tasks]
 */
const checkLint = function(failOnErr) {
  return function() {
    const linting = gulp.src('src/**')
    .pipe(eslint())
    // printing the eslint output to console
    .pipe(eslint.format())
    // passing erros to handleError if any
    .on('error', gutil.log);

    if (failOnErr) {
      //returning with exit status 1 if there is any lint errors
      linting.pipe(eslint.failAfterError())
    }
    return linting;
  }
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
      extensions: bundlingExtensions,
      debug: options.development,
    }));

    const compile = function() {
      const bundle = bundler
      .transform('babelify', {
        extensions: bundlingExtensions,
        sourceMaps: options.development,
      })
      .bundle()
      .pipe(source(options.destFile))
      .pipe(buffer())
      .pipe(sourcemaps.init({
        loadMaps: options.development,
      }))
      .on('error', handleError)
      .pipe(gulp.dest(options.destDir));

      if (options.development) {
        bundle.pipe(sourcemaps.write('./'));
      } else {
        bundle.pipe(uglify());
      }
    };

    if (options.development) {
      bundler.on('update', function() {
        compile();
        console.log('ansh');
        gutil.log('Re bundling javascript files...');
      });
    }

    gutil.log('Bundling javascript files...');
    return compile();
  };
}

/**
 * tasks to check for lint errors
 */
// this task fails on lint error
gulp.task('lint:failOnError', checkLint(true));

// this task does not fail on any lint error
gulp.task('lint:noFailOnError', checkLint(false));

/**
 * tasks to bundle all the javscript files
 */

// from example scripts directory - development mode
gulp.task('scripts:development', bundleJs({
  srcDir: 'example/scripts',
  srcFile: 'Root.jsx',
  destDir: 'example/build',
  destFile: 'main.js',
  development: true,
}));

// from src directory to distribution directory - release/production mode
gulp.task('scripts:release', bundleJs({
  srcDir: 'src',
  srcFile: 'index.js',
  destDir: 'dist',
  destFile: 'index.js',
  development: false,
}));

/**
 * build task
 */
gulp.task('build', ['lint:noFailOnError', 'scripts:development'], function() {
  gutil.log('Build complete...');
});

/**
 * task to start browserSync
 */
gulp.task('browserSync', ['build'], function() {
  browserSync({
    server: {
      baseDir: 'example'
    },
    ghostMode: false
  });
  gulp.watch('example/build/main.js', browserSync.reload);
});

/**
 * default task for gulp
 */
gulp.task('default', ['build', 'browserSync'], function() {

  //action to be taken after all the tasks are completed
  gutil.log('Gulp initiating your project');

});

/**
 * release task for gulp
 */
gulp.task('release', ['lint:failOnError', 'scripts:release'], function() {
  gutil.log('Project is released');
});

/* eslint-enable */
