const gulp = require('gulp');
const path = require('path');

const GulpFunctions = function GulpFunctions(){
    this.fn = {};
    this.dependencies = {};
    return this;
};

function logFileChange(event) {
  console.log('File ' + event.path ? event.path : event + ' was changed, running tasks...');
}

function handleError(err) {
  error(err);
  try {
    this.emit('end');
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

GulpFunctions.prototype.register = function(name, dependencies, fn){
    this.fn[name] = fn;
    this.dependencies[name] = dependencies;
    //Check if just dependecies setup (no function body)
    if(!(typeof fn === 'function')){
      if(gulp.series) {
        gulp.task(name, gulp.series(dependencies, function(done){done()}));
      } else {
        gulp.task(name, dependencies, function(done){done()});
      }
      return;
    }
    if(!(Array.isArray(dependencies))){
      gulp.task(name, fn);
      return;
    }
    //Ducktype for 4.x
    if(gulp.series) {
        //Setup old behaviors
      gulp.task(name, gulp.series(dependencies, fn));
    } else {
      gulp.task(name, dependencies, fn)
    }
};

GulpFunctions.prototype.watch = function(globs, actions){
  if(!(Array.isArray(globs)) || !globs.every(function(value){return typeof value === 'string'})){
    throw 'Globs must in an array of strings';
  }
  
  //Ducktype for 4.x
  if(gulp.series) {
    switch(typeof actions) {
      
      case 'function':
        gulp.watch(globs, actions).on('change', logFileChange);
      break;
      
      case 'string':
        gulp.watch(globs, gulp.series(actions, function(done){done();})).on('change', logFileChange);
      break;
      
      case 'object':
        if((Array.isArray(actions)) && actions.every(function(value){return typeof value === 'string'})){
          actions.push(function(done){done();});
          gulp.watch(globs, gulp.series.apply(gulp,actions)).on('change', logFileChange);
        }
      break;
    
    }
  } else {
    switch(typeof actions) {
      
      case 'function':
        gulp.watch(globs, actions).on('change', logFileChange);
      break;
      
      case 'string':
      gulp.watch(globs, [actions]).on('change', logFileChange);
      break;
      
      case 'object':
      if((Array.isArray(actions)) && actions.every(function(value){return typeof value === 'string'})){
          gulp.watch(globs, actions).on('change', logFileChange);
        }
      break;
    
    }
  }
};

GulpFunctions.prototype.normalizePath = function normalizePath() {
  return path
      .relative(
      process.cwd(),
      path.resolve.apply(this, arguments)
      )
      .replace(/\\/g, "/");
}

GulpFunctions.prototype.handleError = function handleError(err) {
  error(err);
  try {
      this.emit('end');
  } catch (e) {
      console.log(e);
      process.exit(1);
  }
}



GulpFunctions.prototype.gulp = gulp;

module.exports = new GulpFunctions();