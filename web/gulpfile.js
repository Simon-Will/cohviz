var gulp = require('gulp');
var sass = require('gulp-sass')(require("sass"));
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var eslint = require('gulp-eslint');
var mainBowerFiles = require('main-bower-files');
var filter = require('gulp-filter');
var $ = require('gulp-load-plugins')({lazy: true});
var newer = require('gulp-newer');
var size = require('gulp-size');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');
var handlebars = require('gulp-handlebars');
var shell = require('gulp-shell');
// var babel = require('babel-core');

/**
 * Save bower files in appropriate folders
 * @param  {String} Name of gulp method
 * @return {null}   Nothing
 */
function taskBowerFiles(done) {
  // Js filter
  const jsFiles = filter('**/*.js');
  const cssFiles = filter('**/*.css');

  var mainBower = mainBowerFiles();

  // Bring js files to .tmp directory
  gulp.src(mainBower)
    .pipe(jsFiles)
    .pipe(gulp.dest('./cohapp/static/cohapp/js_big/vendor/'));

  // Bring css files to .tmp directory
  gulp.src(mainBower)
    .pipe(cssFiles)
    .pipe(gulp.dest('./cohapp/static/cohapp/css/vendor/'));
  done();
}

/**
 * Concatenate and minify vendor javascript files
 */
function taskScriptsVendor(done) {
  gulp.src([
    // Note: Since we are not using useref in the scripts build pipeline,
    //       you need to explicitly list your scripts here in the right order
    //       to be correctly concatenated
    './cohapp/static/cohapp/js_big/vendor/jquery.js',
    './cohapp/static/cohapp/js_big/vendor/underscore.js',
    './cohapp/static/cohapp/js_big/vendor/materialize.js',
    './cohapp/static/cohapp/js_big/vendor/d3.js',
    './cohapp/static/cohapp/js_big/vendor/handlebars.js',
    './cohapp/static/cohapp/js_big/vendor/medium-editor.js',
    './cohapp/static/cohapp/js_big/vendor/backbone.js',
  ])
    .pipe($.newer('./cohapp/static/cohapp/js/vendor/'))
    .pipe($.sourcemaps.init())
    .pipe($.sourcemaps.write())
    .pipe($.concat('vendor.js'))
    .pipe($.uglify())
    // Output files
    .pipe($.size({title: 'scripts'}))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./cohapp/static/cohapp/js/'))
    .pipe(gulp.dest('./static/cohapp/js/'));
  done();
}

/**
 * Build handlebars
 */
function taskHandlebars(done) {
  gulp.src('./cohapp/templates/cohapp/handlebars/*.hbs')
    .pipe(handlebars({
      handlebars: require('handlebars')
    }))
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'Handlebars.templates',
      noRedeclare: true,
    }))
    .pipe(concat('handlebars.js'))
    .pipe($.sourcemaps.init())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./cohapp/static/cohapp/js/', {overwrite: true}))
    .pipe(gulp.dest('./static/cohapp/js/', {overwrite: true}));
  done();
}

/**
 * Uglify scripts for app. Write sourcemaps to it
 */
function taskScriptsApp(done) {
	gulp.src([
      './cohapp/static/cohapp/js_big/app/app.js',
      './cohapp/static/cohapp/js_big/app/models/textanalyzer.js',
      './cohapp/static/cohapp/js_big/app/models/experiment.js',
      './cohapp/static/cohapp/js_big/app/models/user.js',
      './cohapp/static/cohapp/js_big/app/models/user_specific.js',
      './cohapp/static/cohapp/js_big/app/models/groups.js',
      './cohapp/static/cohapp/js_big/app/models/measurement.js',
      './cohapp/static/cohapp/js_big/app/models/experiment_create.js',
      './cohapp/static/cohapp/js_big/app/models/textmodel.js',
      './cohapp/static/cohapp/js_big/app/collections/experiments.js',
      './cohapp/static/cohapp/js_big/app/collections/users.js',
      './cohapp/static/cohapp/js_big/app/collections/measurement.js',
      './cohapp/static/cohapp/js_big/app/views/login.js',
      './cohapp/static/cohapp/js_big/app/views/dashboard.js',
      './cohapp/static/cohapp/js_big/app/views/experiment.js',
      './cohapp/static/cohapp/js_big/app/views/new_experiment.js',
      './cohapp/static/cohapp/js_big/app/views/subject_login.js'
    ])
      .pipe($.newer('./cohapp/static/cohapp/**/*.js'))
      .pipe($.sourcemaps.init())
      .pipe($.sourcemaps.write())
      .pipe($.concat('app.js'))
      .pipe($.uglify())
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest('./cohapp/static/cohapp/js/'))
      .pipe(gulp.dest('./static/cohapp/js/'));
  done();
}

/**
 * Minify treatment files
 */
function taskTreatmentMinify(done) {
  gulp.src('./cohapp/static/cohapp/js_big/app/views/treatments/*.js')
    .pipe($.newer('./cohapp/static/cohapp/js/treatments/*.js'))
    .pipe($.sourcemaps.init())
    .pipe($.sourcemaps.write())
    .pipe($.uglify())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./cohapp/static/cohapp/js/treatments/'))
    .pipe(gulp.dest('./static/cohapp/js/treatments/'));
  done();
}

function taskSass(done) {
    const AUTOPREFIXER_BROWSERS = [
      'ie >= 10',
      'ie_mob >= 10',
      'ff >= 30',
      'chrome >= 34',
      'safari >= 7',
      'opera >= 23',
      'ios >= 7',
      'android >= 4.4',
      'bb >= 10'
    ];

    gulp.src('./cohapp/static/cohapp/scss/custom.scss')
        .pipe($.newer('./cohapp/static/cohapp/'))
        .pipe($.sourcemaps.init())
        .pipe(sass({precision: 10}).on('error', sass.logError))
        .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('./cohapp/static/cohapp/css'))
        .pipe(gulp.dest('./static/cohapp/css'));

    gulp.src('./cohapp/static/cohapp/css/**/*.css')
      .pipe(gulp.dest('./static/cohapp/css'));

    done();
}

function taskLint(done) {
  // ESLint ignores files with "node_modules" paths.
  // So, it's best to have gulp ignore the directory as well.
  // Also, Be sure to return the stream from the task;
  // Otherwise, the task may end before the stream has finished.
  gulp.src('./cohapp/static/cohapp/js_big/app/*.js')
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError());
  done();
}

function taskWatch() {
	gulp.watch('./cohapp/static/cohapp/scss/**/*.scss', taskSass);
	gulp.watch('./cohapp/static/cohapp/js_big/app/**/*.js', taskScriptsApp);
  gulp.watch('./cohapp/static/cohapp/js_big/**/*.jsx', taskWebpack);
  gulp.watch('./cohapp/static/cohapp/js_big/app/views/treatments/*.js', taskTreatmentMinify);
  gulp.watch('./cohapp/templates/cohapp/handlebars/*.hbs', taskHandlebars);
}

exports.bowerFiles = taskBowerFiles;
exports.scriptsVendor = taskScriptsVendor;
exports.sass = taskSass;
exports.scriptsApp = taskScriptsApp;
exports.treatmentMinify = taskTreatmentMinify;
exports.handlebars = taskHandlebars;
