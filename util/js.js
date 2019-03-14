const gulpFunctions = require('./gulpFunctions');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const gulpif = require('gulp-if');
const rename = require('gulp-rename');
const ts = require('gulp-typescript');
const  uglify = require('gulp-uglify');

//Load Configuration 
var config = {};

const getWatchedArray = function(configObj){
  const watchArray = [];
    if(configObj.js.jsPreprocessor){
      watchArray.push(gulpFunctions.normalizePath(configObj.js.source.replace('*','**/*')));
    } else {
      watchArray.push(gulpFunctions.normalizePath(configObj.js.source));
    }
  return watchArray;
};

module.exports = function(configurationObject){
  
  config = configurationObject;
  
  gulpFunctions.register('build:clean:js', null, function buildCleanJsFn (done) {
      return gulpFunctions.gulp.src(gulpFunctions.normalizePath(config.js.build + '*'))
        .pipe(gulpif(config.js.clean, clean()))
        .on('end', done);
    });
      
  gulpFunctions.register('build:js', ['build:clean:js'], function buildJsFn (done) {
    return gulpFunctions.gulp.src(gulpFunctions.normalizePath(config.js.source))
    .on("error", gulpFunctions.handleError)
    .pipe(gulpif(config.js.jsPreprocessor === 'ts', ts()))
    .on("error", gulpFunctions.handleError)
    .pipe(gulpif(config.js.minizine, uglify()))
    .pipe(rename({
      suffix: config.js.suffix
    }))
    .pipe(gulpif(config.js.concat, concat('site.js')))
    .pipe(gulpFunctions.gulp.dest(gulpFunctions.normalizePath(config.js.build)))
    .on("error", gulpFunctions.handleError)
    .on('end', done);
  });
      

  gulpFunctions.register('watch:build:js', null , function watchBuildJsFn(done){
    gulpFunctions.watch(getWatchedArray(config), ['build:js']);
    
    done();
  });

  gulpFunctions.register('watch:serve:build:js', null , function watchServeBuildJsFn (done){
    if(gulpFunctions.fn['serve:reload']){
      gulpFunctions.watch(getWatchedArray(config), ['build:js', 'serve:reload']);
    } else {
      gulpFunctions.watch(getWatchedArray(config), ['build:js']);
    }
    done();
  });
}