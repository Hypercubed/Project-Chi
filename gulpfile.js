var gulp = require('gulp');
var browserSync = require('browser-sync');
var jspm = require('jspm');
var del = require('del');
var cache = require('gulp-cached');
var ghPages = require('gulp-gh-pages');
var karma = require('karma').server;

var path = {
  base: 'app',
  build: 'components/boot',
  systemConfig: 'app/system.config.js',
  dist: 'dist',
  bundle: 'dist/components/bundle.js',
};

gulp.task('test', [], function (done) {
	karma.start({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, function(){
		done();
	});
});

gulp.task('copy', function () {
  return gulp.src([
      path.base+'/*.{js,json,html,ico,txt}',
      path.base+'/{jspm_packages,lib}/*.{js,map}',
			path.base+'/{jspm_packages,lib}/**/*.{svg,png,eot,ttf,wot,gif}',
      path.base+'/{components,images}/**/*.{json,html,csv,png}'
    ])
    .pipe(cache('copy'))
    .pipe(gulp.dest(path.dist))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('builder', function() {
  var builder = new jspm.Builder();

  return builder.loadConfig(path.systemConfig)
  .then(function() {
    builder.config({
      baseURL: path.base,
      lib: path.base
    });

    return builder.build(path.build, path.bundle,
      {
        sourceMaps: true,
        minify: true,
        mangle: true,
				runtime: true
      });
  });
});

gulp.task('serve', [], function (done) {
  browserSync({
    open: true,
    port: 9000,
    server: {
      baseDir: [path.base],
      middleware: function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  }, done);
});

gulp.task('serve:dist', ['build'], function (done) {
  browserSync({
    open: true,
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

gulp.task('watch', ['serve'], function() {
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

gulp.task('build', ['copy', 'builder']);
