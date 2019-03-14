const buildConfig = require('./build-config.json');
const serveTasks = require('./util/serve');
const cssTasks = require('./util/css');
const jsTasks = require('./util/js');
const htmlTasks = require('./util/html');
const staticTasks = require('./util/static');
const gulpFunctions = require('./util/gulpFunctions');

serveTasks(buildConfig);
cssTasks(buildConfig);
jsTasks(buildConfig);
htmlTasks(buildConfig);
staticTasks(buildConfig);
const buildTasks = ['build:css','build:js', 'build:html'];
const watchTasks = ['watch:serve:build:css','watch:serve:build:js', 'watch:serve:build:html'];

buildConfig.static.forEach(function (staticResource) {
    buildTasks.push('build:' + staticResource.task);
    watchTasks.push('watch:serve:build:' + staticResource.task);
});

gulpFunctions.register('build', buildTasks , function fullBuildFn (done){done()});

gulpFunctions.register('watch', watchTasks , function fullWatchFn (done){done()});

gulpFunctions.register('default', ['build', 'serve', 'watch'], function buildWatchServeFn (done){done()});