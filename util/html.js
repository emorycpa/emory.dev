const gulpFunctions = require('./gulpFunctions');
const clean = require('gulp-clean');
const gulpif = require('gulp-if');
const path = require('path');
const rename = require('gulp-rename');
const mustache = require('gulp-mustache');
const tap = require('gulp-tap');
const nunjucks = require('./gulpNunjucks');

//Load Configuration 
var config = {};

const getWatchedArray = function(configObj){
  const watchArray = [];
    watchArray.push(gulpFunctions.normalizePath(configObj.js.source));
    if(configObj.html.templateEngine === 'njk' && configObj.html.templates != false){
      watchArray.push(gulpFunctions.normalizePath(config.html.templates + '/**/*.*'));
    }
    if(configObj.html.templateEngine === 'mustache' && configObj.html.templates != false){
      watchArray.push(gulpFunctions.normalizePath(configObj.html.templates.replace('.mustache', '.json')));
      watchArray.push(gulpFunctions.normalizePath(configObj.html.templates + '/**/*.*'));
    }
  return watchArray;
};

module.exports = function(configurationObject){
  
  config = configurationObject;
  
  gulpFunctions.register('build:clean:html', null, function buildCleanHtmlFn (done) {
      return gulpFunctions.gulp.src(gulpFunctions.normalizePath(config.html.build + '*'+ config.html.extension))
        .pipe(gulpif(config.html.clean, clean()))
        .on('end', done);
    });
      
  gulpFunctions.register('build:html', ['build:clean:html'], function buildHtmlFn (done) {
    return gulpFunctions.gulp.src(gulpFunctions.normalizePath(config.html.source))
    .on("error", gulpFunctions.handleError)
    .pipe(gulpif(config.html.templateEngine === 'njk', nunjucks({
      "path": [config.html.templates]
    })))
    .on("error", gulpFunctions.handleError)
    .pipe(gulpif(config.html.templateEngine === 'mustache', tap(
      function(file, t) {
        var dataFileName = path.basename(file.path, path.extname(file.path)) + '.json';
        var dataFilePath =  path.join(path.dirname(file.path), dataFileName);
        return t.through(mustache, [require(dataFilePath)])
      }
    )))
    .on("error", gulpFunctions.handleError)
    .pipe(rename({suffix: config.html.suffix}))
    .pipe(rename({extname: config.html.extension}))
    .pipe(gulpFunctions.gulp.dest(gulpFunctions.normalizePath(config.html.build)))
    .on("error", gulpFunctions.handleError)
    .on('end', done);
  });
      

  gulpFunctions.register('watch:build:html', null , function watchBuildHtmlFn (done){
    gulpFunctions.watch(getWatchedArray(config), ['build:html']);
    done();
  });

  gulpFunctions.register('watch:serve:build:html', null , function watchServeBuildHtmlFn (done){
    if(gulpFunctions.fn['serve:reload']){
      gulpFunctions.watch(getWatchedArray(config), ['build:html', 'serve:reload']);
    } else {
      gulpFunctions.watch(getWatchedArray(config), ['build:html']);
    }
    done();
  });
}