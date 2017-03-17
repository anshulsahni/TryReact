module.exports = {

  /**
   * Root directory of the js source code
   */
  ROOT_DIR: 'src',

  /**
   * Root directory for the app
   * @type {String}
   */
  APP_ROOT_DIR: 'example',

  /**
   * name of js file to be loaded in the final project
   * @type {String}
   */
  MAIN_JS_FILE: 'index.js',

  /**
   * name of index file root dir
   * @type {String}
   */
  INDEX_FILE: 'index.js',

  /**
   * extensions to be used by browserify or watchify
   * @type {Array}
   */
  BUNDLING_EXTENSIONS: ['.jsx', '.js'],

  /**
   * enable or disable checking of linting errors
   * @type {Boolean}
   */
  CHECK_LINT_ERRORS: true,

  /**
   * directory having build code
   * @type {String}
   */
  DIST_DIR: 'dist',
};
