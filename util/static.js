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


function jsUcfirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = function(configurationObject){
  
    config = configurationObject;

    config.static.forEach(function (staticResource) {

        const buildCleanFn = function (done) {
            return gulpFunctions.gulp.src(gulpFunctions.normalizePath(staticResource.build + '*'))
              .pipe(clean())
              .on('end', done);
        };

        Object.defineProperty(buildCleanFn, "name", { value: "buildClean" + jsUcfirst(staticResource.task) + "Fn" });

        gulpFunctions.register('build:clean:' + staticResource.task, null, buildCleanFn);
      
        const buildFn = function (done) {
            
            return gulpFunctions.gulp.src(gulpFunctions.normalizePath(staticResource.source))
              .on("error", gulpFunctions.handleError)
              .pipe(gulpFunctions.gulp.dest(gulpFunctions.normalizePath(staticResource.build)))
              .on("error", gulpFunctions.handleError)
              .on('end', done);
        };

        Object.defineProperty(buildFn, "name", { value: "build" + jsUcfirst(staticResource.task) + "Fn" });
      
        gulpFunctions.register('build:' + staticResource.task, ['build:clean:' + staticResource.task], buildFn);

        gulpFunctions.register('watch:build:'+ staticResource.task, null , function(done){
            gulpFunctions.watch([gulpFunctions.normalizePath(staticResource.source)], ['build:'+ staticResource.task]);
            done();
        });

        gulpFunctions.register('watch:serve:build:'+ staticResource.task, null , function(done){
            if(gulpFunctions.fn['serve:reload']){
              gulpFunctions.watch([gulpFunctions.normalizePath(staticResource.source)], ['build:'+ staticResource.task, 'serve:reload']);
            } else {
              gulpFunctions.watch([gulpFunctions.normalizePath(staticResource.source)], ['build:'+ staticResource.task]);
            }
            done();
        });

      });
    
      

};
