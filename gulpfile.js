var gulp = require('gulp');
var browserSync = require('browser-sync');
var jspm = require('jspm');
var del = require('del');
var karma = require('karma').server;
var args   = require('yargs').argv;
var runSequence = require('run-sequence');
var $ = require('gulp-load-plugins')();

var path = {
  base: 'app',
  build: 'components/boot + chiasm/plugins/*',
  systemConfig: 'app/system.config.js',
  dist: 'dist',
  bundle: 'dist/components/bundle.js',
  dataset: args.dataset ? 'dataset/' + args.dataset : null,
  temp: '.tmp'
};

gulp.task('help', $.taskListing);

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
      path.base+'/*.{js,json,ico,txt}',
      path.base+'/{jspm_packages,lib}/*.{js,map}',
      path.base+'/{jspm_packages,lib}/**/*.{svg,png,eot,ttf,wot,woff,woff2,gif}',
      path.base+'/{components,common,assets}/**/*.{json,csv,png,svg,tsv,txt,md}'
    ];

  if (path.dataset) {
    paths.push(path.dataset+'/*.{json,ico,txt}');
    paths.push(path.dataset+'/{components,common,assets}/**/*.{json,csv,png,svg,tsv,txt,md}');
  }

  return gulp.src(paths)
    .pipe($.cached('copy'))
    .pipe($.plumber())
    .pipe(gulp.dest(path.dist));
});

gulp.task('html', function () {
  var paths = [
      path.base+'/*.html',
      path.base+'/{components,common}/**/*.html'
    ];

  if (path.dataset) {
    paths.push(path.dataset+'/*.html');
    paths.push(path.dataset+'/{components,common}/**/*.html');
  }

  return gulp.src(paths)
    .pipe($.cached('html'))
    .pipe($.plumber())
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(gulp.dest(path.dist));
});

gulp.task('js', [], function () {
  var paths = [
    path.base+'/*.js',
    path.base+'/{components,common}/**/*.js'
  ];

  if (path.dataset) {
    paths.push(path.dataset+'/{components,common}/**/*.js');
  }

  return gulp.src(paths)
    .pipe($.cached('js'))
    .pipe($.plumber())
    /* .pipe(babel({
      modules: 'system',
      externalHelpers: true,
    	comments: false,
    	compact: false,
      moduleIds: false
    }))
    .pipe(ngAnnotate({
      sourceType: 'module'
    })) */
    .pipe(gulp.dest(path.temp));
});

gulp.task('css', [], function () {
  var paths = [
    path.base+'/*.{css,css.map}',
    path.base+'/{components,common}/**/*.{css,css.map}'
  ];

  if (path.dataset) {
    paths.push(path.dataset+'/{components,common}/**/*.{css,css.map}');
  }

  return gulp.src(paths)
    .pipe($.cached('css'))
    .pipe($.plumber())
    .pipe(gulp.dest(path.temp));
});

gulp.task('symlink', function () {
  return gulp.src([path.base+'/jspm_packages/'])
    .pipe($.symlink.absolute([path.temp+'/jspm_packages'], {force: true}));
});

gulp.task('builder', [], function() {
  var builder = new jspm.Builder();

  return builder.loadConfig(path.systemConfig)
  .then(function() {
    builder.config({
      baseURL: path.temp,
      lib: path.temp,
      buildCSS: true,
      meta: {
        'github:curran/chiasm@0.1.8/plugins/crossfilter': {
          build: false
        }
      }
    });

    return builder.build(path.build, path.bundle,
      {
        sourceMaps: true,
        minify: true,
        mangle: true,
        runtime: false
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

gulp.task('server:dist', [], function (done) {
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
  del(path.dist, cb);
});

gulp.task('clean:tmp', function (cb) {
  del(path.temp, cb);
});

gulp.task('deploy', [], function() {
  return gulp.src(path.dist+'/**/*')
    .pipe($.ghPages());
});

gulp.task('build', function(callback) {
  runSequence('clean',
              ['copy', 'js', 'css', 'html','symlink'],
              'builder',
              callback);
});

gulp.task('run',['test:watch','serve']);
