var gulp = require('gulp');
var browserSync = require('browser-sync');
// var jspm = require('jspm');
var SystemJSBuilder = require('systemjs-builder');
var del = require('del');
var karma = require('karma').server;
var args = require('yargs').argv;
var runSequence = require('run-sequence');
var $ = require('gulp-load-plugins')();

var path = {
  base: 'app',
  build: 'components/boot',
  systemConfig: 'app/system.config.js',
  dist: 'dist',
  bundle: 'dist/components/bundle.js',
  dataset: args.dataset || null,
  temp: '.tmp'
};

gulp.task('help', $.taskListing);

gulp.task('test', [], function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, function () {
    done();
  });
});

gulp.task('test:watch', [], function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  }, function () {
    done();
  });
});

// copy resource to distribution folder
gulp.task('copy', [], function () {
  var paths = [
    path.base + '/*.{js,json,ico,txt}',
    path.base + '/{jspm_packages,lib}/*.{js,map}',
    path.base + '/{jspm_packages,lib}/**/*.{svg,png,eot,ttf,wot,woff,woff2,gif,html}',
    path.base + '/{components,common,assets}/**/*.{png,svg,txt,md}'
  ];

  if (path.dataset) {
    paths.push(path.dataset + '/*.{json,ico,txt}');
    paths.push(path.dataset + '/{components,common,assets,data}/**/*.{png,svg,md}');
  }

  return gulp.src(paths)
    .pipe($.cached('copy'))
    .pipe($.plumber())
    .pipe(gulp.dest(path.dist));
});

// copy data to distribution folder
gulp.task('data', [], function () {
  var paths = [
    path.base + '/{components,common,assets}/**/*.{json,csv,tsv,txt}'
  ];

  if (path.dataset) {
    paths.push(path.dataset + '/{components,common,assets,data}/**/*.{json,csv,tsv,txt}');
  }

  return gulp.src(paths)
    .pipe(gulp.dest(path.dist));
});

// copy html to temp and distribution folder
gulp.task('html', function () {
  var paths = [
    path.base + '/*.html',
    path.base + '/{components,common}/**/*.html'
  ];

  if (path.dataset) {
    paths.push(path.dataset + '/*.html');
    paths.push(path.dataset + '/{components,common}/**/*.html');
  }

  return gulp.src(paths)
    .pipe($.cached('html'))
    .pipe($.plumber())
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(gulp.dest(path.temp))
    .pipe(gulp.dest(path.dist));
});

// copy js to temp folder
gulp.task('js', [], function () {
  var paths = [
    path.base + '/*.js',
    path.base + '/{components,common}/**/*.js'
  ];

  if (path.dataset) {
    paths.push(path.dataset + '/{components,common}/**/*.js');
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

// copy bundles to dist folder
gulp.task('bundles', [], function () {
  return gulp.src(path.temp + '/components/bundle.*', { base: path.temp })
    // .pipe($.cached('bundle'))
    // .pipe($.plumber())
    .pipe(gulp.dest(path.dist));
});

// copy css to dist folder
gulp.task('css', [], function () {
  var paths = [
    path.base + '/*.{css,css.map}',
    path.base + '/{components,common}/**/*.{css,css.map}'
  ];

  if (path.dataset) {
    paths.push(path.dataset + '/{components,common}/**/*.{css,css.map}');
  }

  return gulp.src(paths)
    .pipe($.cached('css'))
    .pipe($.plumber())
    .pipe(gulp.dest(path.temp));
});

gulp.task('symlink', function () {
  return gulp.src([path.base + '/jspm_packages/'])
    .pipe($.symlink.absolute([path.temp + '/jspm_packages'], {force: true}));
});

gulp.task('builder', [], function () {
  var builder = new SystemJSBuilder(path.temp, path.temp + '/system.config.js');

  // var builder = new jspm.Builder({baseURL: path.temp});

  builder.config({
    buildCSS: true,
    buildHTML: true
  });

  return builder.bundle(path.build, path.temp + '/components/bundle.js', {
    sourceMaps: true,
    minify: true,
    mangle: true,
    runtime: false
    /* inject: true */
  });
});

gulp.task('server', [], function (done) {
  browserSync({
    open: false,
    port: 9000,
    server: {
      baseDir: path.dataset ? [path.dataset, path.base] : path.base,        // dataset overrides base
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

gulp.task('watch', ['server'], function () {
  gulp.watch([path.base + '/**/*.{js,css,html,json}'], function (file) {
    browserSync.reload(file.path);
  }).on('change', function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

gulp.task('clean', function (cb) {
  del(path.dist, cb);
});

gulp.task('clean:tmp', function (cb) {
  del(path.temp, cb);
});

gulp.task('deploy', [], function () {
  return gulp.src(path.dist + '/**/*')
    .pipe($.ghPages());
});

gulp.task('build', function (callback) {
  runSequence(['clean', 'clean:tmp'],
              ['copy', 'js', 'css', 'data', 'html', 'symlink'],
              'builder',
              'bundles',
              callback);
});

gulp.task('run', ['test:watch', 'serve']);
