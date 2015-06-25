var gulp = require('gulp');
var browserSync = require('browser-sync');
var jspm = require('jspm');
var del = require('del');
var cache = require('gulp-cached');
var ghPages = require('gulp-gh-pages');
var karma = require('karma').server;
var args   = require('yargs').argv;
//var ngAnnotate = require('gulp-ng-annotate');
//var babel = require('gulp-babel');
var runSequence = require('run-sequence');

var path = {
  base: 'app',
  build: 'components/boot + chiasm/plugins/*',
  systemConfig: 'app/system.config.js',
  dist: 'dist',
  bundle: 'dist/components/bundle.js',
  dataset: args.dataset ? 'dataset/' + args.dataset : null,
  temp: '.tmp'
};

gulp.task('test', [], function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, function(){
    done();
  });
});

gulp.task('test:watch', [], function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  }, function(){
    done();
  });
});

gulp.task('copy', [], function () {
  var paths = [
      path.base+'/*.{js,json,html,ico,txt}',
      path.base+'/{jspm_packages,lib}/*.{js,map}',
      path.base+'/{jspm_packages,lib}/**/*.{css,svg,png,eot,ttf,wot,woff,woff2,gif}',
      path.base+'/{components,images}/**/*.{css,json,html,csv,png,svg,tsv,txt,md}'
    ];

  if (path.dataset) {
    paths.push(path.dataset+'/*.{json,html,ico,txt}');
    paths.push(path.dataset+'/{components,images}/**/*.{css,json,html,csv,png,svg,tsv,txt,md}');
  }

  return gulp.src(paths)
    .pipe(cache('copy'))
    .pipe(gulp.dest(path.dist));
});

gulp.task('js', [], function () {
  var paths = [
    path.base+'/*.js',
    path.base+'/{jspm_packages,lib}/*.{js,map}',
    path.base+'/{jspm_packages,lib}/**/*.js',
    path.base+'/{components,services}/**/*.js'
  ];

  if (path.dataset) {
    paths.push(path.dataset+'/{components,services}/**/*.js');
  }

  return gulp.src(paths)
    .pipe(cache('js'))
    //.pipe(ngAnnotate({
    //  sourceType: 'module'
    //}))
    .pipe(gulp.dest(path.temp));
});

gulp.task('builder', [], function() {
  var builder = new jspm.Builder();

  return builder.loadConfig(path.systemConfig)
  .then(function() {
    builder.config({
      baseURL: path.temp,
      lib: path.temp,
      buildCSS: false,
      meta: {
        'github:curran/chiasm@gh-pages/plugins/crossfilter': {
          build: false
        }
      }
    });

    return builder.build(path.build, path.bundle,
      { 
        sourceMaps: true,
        minify: false,
        mangle: true,
        runtime: true
      });

  });
});

gulp.task('server', [], function (done) {
  browserSync({
    open: false,
    port: 9000,
    server: {
      baseDir: path.dataset ? [path.dataset,path.base] : path.base,        // dataset overrides base
      middleware: function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  }, done);
});

gulp.task('serve:dist', [], function (done) {
  browserSync({
    open: false,
    port: 9000,
    server: {
      baseDir: [path.dist],
      middleware: function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  }, done);
});

gulp.task('watch', ['server'], function() {
  gulp.watch([path.base+'/**/*.{js,css,html,json}'], function(file){
    browserSync.reload(file.path);
  }).on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

gulp.task('clean', function (cb) {
  del(['dist',], cb);
});

gulp.task('deploy', ['build'], function() {
  return gulp.src(path.dist+'/**/*')
    .pipe(ghPages());
});

gulp.task('build', function(callback) {
  runSequence('clean',
              ['copy', 'js'],
              'builder',
              callback);
});

gulp.task('run',['test:watch','serve']);
