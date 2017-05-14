/*global require*/
"use strict";

var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var gulp = require('gulp'),
  path = require('path'),
  data = require('gulp-data'),
  pug = require('gulp-pug'),
  prefix = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync');



/*
 * Directories here
 */
var paths = {
  public: './public/',
  sass: './src/sass/',
  css: './public/css/',
  js: './src/js/',
  jsd: './public/js/',
  images: './src/images/',
  img: './public/images/',
  fonts: './src/fonts/',
  font: './public/fonts/',
  data: './src/templates/data/'
};

/**
 * Compile .pug files and pass in data from json file
 * matching file name. index.pug - index.pug.json
 */
gulp.task('pug', function () {
  return gulp.src('./src/*.pug')
    .pipe(data(function (file) {
      return require(paths.data + path.basename(file.path) + '.json');
    }))
    .pipe(pug())
    .on('error', function (err) {
      process.stderr.write(err.message + '\n');
      this.emit('end');
    })
    .pipe(gulp.dest(paths.public));
});




/**
 * Recompile .pug files and live reload the browser
 */
gulp.task('rebuild', ['pug', 'js', 'sass'], function () {
  browserSync.reload();
});

/**
 * Wait for pug and sass tasks, then launch the browser-sync Server
 */
gulp.task('browser-sync', ['sass', 'pug', 'images', 'fonts', 'js'], function () {
  browserSync({
    server: {
      baseDir: paths.public
    },
    notify: false
  });
});

/**
 * Compile .sass files into public css directory With autoprefixer no
 * need for vendor prefixes then live reload the browser.
 */
gulp.task('sass', function () {
  return gulp.src(paths.sass + '*.sass')
    .pipe(sass({
      includePaths: [paths.sass]
    }))
    .on('error', sass.logError)
    .pipe(prefix(['last 4 versions'], {
      cascade: true
    }))
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.reload({
      stream: true
    }));
});

/**
 * Watch sass files for changes & recompile
 * Watch .pug files run pug-rebuild then reload BrowserSync
 */
gulp.task('watch', function () {
  gulp.watch(paths.sass + '**/*.sass', ['sass']);
  gulp.watch('./src/**/*.pug', ['rebuild']);
  gulp.watch('./src/**/*.js', ['js']);
});

gulp.task('images', function() {
    return gulp.src(paths.images + '**/*.jpg') // Берем все изображения 
        .pipe(imagemin({  
            interlaced: true,
            progressive: true
        }))
        .pipe(gulp.dest(paths.img)); // Выгружаем на продакшен
});

gulp.task('js', function(){
  gulp.src(paths.js + '/**/*.js')
  .pipe(uglify())
  .pipe(gulp.dest(paths.jsd))

});


gulp.task('fonts', function() {
    return gulp.src(paths.fonts + ('**/*.woff', '**/*.woff2') ) 
        .pipe(gulp.dest(paths.font)); 
});


// Build task compile sass and pug.
gulp.task('build', ['sass', 'pug', 'js', 'fonts', 'images']);

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync then watch
 * files for changes
 */
gulp.task('default', ['browser-sync', 'watch']);
