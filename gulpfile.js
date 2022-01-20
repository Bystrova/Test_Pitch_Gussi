const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const sync = require('browser-sync').create();
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const postcss = require('gulp-postcss');
const csso = require('postcss-csso');
const rename = require('gulp-rename');
const terser = require('gulp-terser');
const squoosh = require('gulp-libsquoosh');

// Styles

const styles = () => {
	return gulp.src('source/sass/style.scss')
		.pipe(plumber())
		.pipe(sourcemap.init())
		.pipe(sass())
		.pipe(postcss([autoprefixer(),
			csso()
		]))
		.pipe(rename('style.min.css'))
		.pipe(sourcemap.write('.'))
		.pipe(gulp.dest('build/css'))
		.pipe(sync.stream());
}

exports.styles = styles;

//HTML

const html = () => {
	return gulp.src('source/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('build'))
}

exports.html = html;

//Scripts

const scripts = () => {
	return gulp.src('source/scripts/*.js')
		.pipe(terser())
		.pipe(rename('script.min.js'))
		.pipe(gulp.dest('build/scripts'))
}

exports.scripts = scripts;

//Img

const optimizeImages = () => {
	return gulp.src('source/img/**/*.{png,jpg,svg}')
		.pipe(squoosh())
		.pipe(gulp.dest('build/img'))
}

const copyImages = () => {
	return gulp.src('source/img/**/*.{png,jpg,svg}')
		.pipe(gulp.dest('build/img'))
}

exports.copyImages = copyImages;

//Clean

const clean = () => {
	return del('build');
}

exports.clean = clean;

//Copy

const copy = (done) => {
	gulp.src([
			"source/*.ico",
		], {
			base: "source"
		})
		.pipe(gulp.dest("build"))
	done();
}

exports.copy = copy;

// Server

const server = (done) => {
	sync.init({
		server: {
			baseDir: 'build'
		},
		cors: true,
		notify: false,
		ui: false,
	});
	done();
}

exports.server = server;

//Reload

const reload = (done) => {
	sync.reload();
	done();
}

// Watcher

const watcher = () => {
	gulp.watch('source/sass/**/*.scss', gulp.series('styles'));
	gulp.watch('source/scripts/script.js', gulp.series(scripts));
	// gulp.watch('source/*.html').on('change', sync.reload);
	gulp.watch('source/*.html', gulp.series(html, reload));
}

//Build

const build = gulp.series(
	clean,
	copy,
	optimizeImages,
	scripts,
	gulp.parallel(
		html,
		styles,
	),
);

exports.build = build;

//Start

exports.default = gulp.series(
	clean,
	copy,
	copyImages,
	scripts,
	gulp.parallel(
		html,
		styles,
	),
	gulp.series(
		server, watcher
	));