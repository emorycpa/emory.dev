
const gulpFunctions = require('./gulpFunctions');
const browserSync = require('browser-sync').create();

var config = {};

module.exports = function(configurationObject){
    config = configurationObject;


    gulpFunctions.register('serve', null, function (done) {
        if (config.browserSync.enabled) {
          browserSync.init({
            server: {
              baseDir: gulpFunctions.normalizePath(config.browserSync.directory),
              directory: true
            }
          });
        }
        done();
    });

    gulpFunctions.register('serve:reload', null, function reload(done) {
        browserSync.reload();
        done();
      });

};