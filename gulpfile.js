var gulp = require('gulp'),
	copy = require('copy'),
	sass = require('gulp-sass'),	
	uglify = require('gulp-uglify'),	
    lib    = require('bower-files')(),
    browserSync = require('browser-sync').create();

var config = {
	src: "app",
	dest: "build",
	copy: {
		src: "app/images",
		dest: "build/images"
	},
	js: {
		src: "app/scripts/**/*.js",
		dest: "build/js"
	},
	html: {
		src: ["app/index.html", "app/**/*.html"],
		dest: "build/js"
	},
	css: {
		src: "app/css/*.scss",
		dest: "build/css"
	}
};

gulp.task('browser-sync', function() {
	browserSync.init({
    	files: 'build/',
		server: {
            baseDir: "build"
        }
	});
});

gulp.task('js', function() {
  gulp.src(config.js.src)
      .pipe(gulp.dest(config.js.dest));
});


gulp.task('bower', function () {
  gulp.src(lib.ext('js').files)
      .pipe(uglify())
      .pipe(gulp.dest(config.js.dest));
});

gulp.task('default', function() {
	gulp.start(
		'copy',
		'sass',
		'sass:watch', 
		'browser-sync',
		'js',
		'js:watch',
		'html',
		'html:watch',
		'bower'
		);
});

gulp.task('copy', function() {
	gulp.src(config.copy.src)
		.pipe(gulp.dest(config.dest))
});

gulp.task('sass', ['copy'], function() {
	gulp.src(config.css.src)
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(gulp.dest(config.css.dest))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('sass:watch', ['sass'], function () {
  gulp.watch(config.css.src, ['sass']);
});

gulp.task('js:watch', ['js'], function () {
  gulp.watch(config.js.src, ['js']);
});



gulp.task('html', function() {
  gulp.src(config.html.src)
      .pipe(gulp.dest(config.dest));
});

gulp.task('html:watch', ['html'], function () {
  gulp.watch(config.html.src, ['html']);
});