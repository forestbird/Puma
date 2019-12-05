"use strict";

const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const browserify = require('browserify');
const webpack = require("webpack");
const webpackconfig = require("./webpack.config.js");
const webpackstream = require("webpack-stream");
const sass = require("gulp-sass");
const rename = require("gulp-rename");

// Lint scripts
function scriptsLint() {
  return gulp
    .src(["./assets/js/**/*", "./gulpfile.js"])
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}


function css() {
  return gulp
    .src("./sass/app.scss")
    .pipe(plumber())
    .pipe(sass({ 
      outputStyle: "expanded",
      includePaths: require('node-normalize-scss').includePaths 
    }))
    .pipe(gulp.dest("./vendor/css/"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest("./vendor/css/"))
}


// Transpile, concatenate and minify scripts
function scripts() {
  return (
    gulp
      .src(["./typescript/app.ts"])
      .pipe(plumber())
      //.pipe(webpackstream(webpackconfig, webpack))
      .pipe(concat('all.bundle.ts'))
      .pipe(babel({
      presets: ['@babel/preset-env',"@babel/typescript"]
    }))
      .pipe(uglify())
    .pipe(gulp.dest('./vendor/js/'))
  );
}

// Watch files
function watchFiles() {
   //gulp.watch(["./typescript/*.ts"], gulp.series(scripts));
    gulp.watch(["./sass/*","./sass/components/*","./sass/base/*"], gulp.series(css));
}

// define complex tasks
const js = gulp.series(scripts);
const watch = gulp.parallel(watchFiles);
const build = gulp.parallel(watch,gulp.parallel(css));

exports.css = css;
//exports.js = js;
exports.build = build;
exports.watch = watch;
exports.default = build;