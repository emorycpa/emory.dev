const gulpFunctions = require('./gulpFunctions');
const autoprefixer = require('autoprefixer')
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const cssmin = require('gulp-cssmin');
const gulpif = require('gulp-if');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sass = require('gulp-sass');

//Load Configuration 
var config = {};

module.exports = function(configurationObject){
    config = configurationObject;
    
    gulpFunctions.register('build:clean:css', null, function buildCleanCssFn (done) {
        return gulpFunctions.gulp.src(gulpFunctions.normalizePath(config.css.build + '*'))
          .pipe(gulpif(config.css.clean, clean()))
          .on('end', done);
      });
      
      gulpFunctions.register('build:css', ['build:clean:css'], function buildCssFn(done) {
        return gulpFunctions.gulp.src(gulpFunctions.normalizePath(config.css.source))
          .on("error", gulpFunctions.handleError)
          .pipe(gulpif(config.css.cssPreprocessor === 'scss', sass()))
          .on("error", gulpFunctions.handleError)
          .pipe(postcss([autoprefixer]))
          .pipe(gulpif(config.css.minizine, cssmin()))
          .pipe(rename({
            suffix: config.css.suffix
          }))
          .pipe(gulpif(config.css.concat, concat('site.css')))
          .pipe(gulpFunctions.gulp.dest(gulpFunctions.normalizePath(config.css.build)))
          .pipe(rename({
            suffix: '.min'
          }))
          .pipe(cssmin())
          .pipe(gulpFunctions.gulp.dest(gulpFunctions.normalizePath(config.css.build)))
          .on("error", gulpFunctions.handleError)
          .on('end', done);
      });
      
      gulpFunctions.register('watch:build:css', null , function watchBuildCssFn (done){
            if(config.css.cssPreprocessor){
                gulpFunctions.watch([gulpFunctions.normalizePath(config.css.source.replace('*','**/*'))], ['build:css']);
            } else {
                gulpFunctions.watch([gulpFunctions.normalizePath(config.css.source)], ['build:css']);
            }
            done();
      });

      gulpFunctions.register('watch:serve:build:css', null , function watchServeBuildCssFn (done){
        if(gulpFunctions.fn['serve:reload']){
            if(config.css.cssPreprocessor){
                gulpFunctions.watch([gulpFunctions.normalizePath(config.css.source.replace('*','**/*'))], ['build:css', 'serve:reload']);
            } else {
                gulpFunctions.watch([gulpFunctions.normalizePath(config.css.source)], ['build:css', 'serve:reload']);
            }
        } else {
            if(config.css.cssPreprocessor){
                gulpFunctions.watch([gulpFunctions.normalizePath(config.css.source.replace('*','**/*'))], ['build:css']);
            } else {
                gulpFunctions.watch([gulpFunctions.normalizePath(config.css.source)], ['build:css']);
            }
        }
        done();
      });
}