"use strict";

// Modules
const gulp          = require('gulp'),
      postcss       = require('gulp-postcss'),
      sass          = require('gulp-sass'),
      plumber       = require('gulp-plumber'),
      sourcemaps    = require('gulp-sourcemaps'),
      inlinesvg     = require('postcss-inline-svg'),
      autoprefixer  = require('autoprefixer'),
      cssnano       = require('cssnano'),
      gulpStylelint = require('gulp-stylelint'),
      tildeImporter = require('node-sass-tilde-importer'),
      sassdoc       = require('sassdoc'),
      browserSync   = require('browser-sync').create();

// Paths
const pathSrc = './src/**/*.scss';
const pathDist = './public/dist';

// Documentation
gulp.task('sassdoc', function() {
  const sassdocOptions = {
    'dest': 'docs',
  };

  return gulp.src(pathSrc)
             .pipe(sassdoc(sassdocOptions));
});

// SCSS
gulp.task('scss', function() {
  // Preprocessor
  const processors = [
    autoprefixer({ // Autoprefixer
      browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
      remove: true
    }),
    inlinesvg({ // Inline SVG's
      path: './public/svg'
    }),
    cssnano({ // Minify
      zindex: false,
      reduceIdents: {
        keyframes: false
      },
      discardUnused: {
        keyframes: false
      }
    })
  ];

  return gulp.src(pathSrc)
             // Plumber prevents Gulp from breaking because of errors
             .pipe(plumber({
               errorHandler: function(error) {
                 console.log(error.message);
                 this.emit('end');
               }
             }))

             // Style Compiling Config.
             .pipe(gulpStylelint({ // Linting
               reporters: [
                 {
                   formatter: 'string',
                   console: true
                 }
               ]
             }))

             // Initiate Source Map
             .pipe(sourcemaps.init())

             // SASS Compiling
             .pipe(sass({
               importer: tildeImporter,
             }))

             // PostCSS Preprocessing
             .pipe(postcss(processors))

             // Write the Source Map
             .pipe(sourcemaps.write('.'))

             // Output
             .pipe(gulp.dest(pathDist));

  browserSync.reload();
});

// Run and create documentation
gulp.task('doc', function() {
  gulp.watch(pathSrc, ['scss']);
  gulp.watch(pathSrc, ['sassdoc']);
});

// The Default Watcher
gulp.task('default', function() {
  gulp.watch(pathSrc, ['scss']);
});
