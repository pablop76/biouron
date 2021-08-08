const fileinclude = require('gulp-file-include');
const gulp = require("gulp");
const { src, dest } = require("gulp");
const validator = require('gulp-html');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const webpack = require("webpack");
const sharpResponsive = require("gulp-sharp-responsive");

sass.compiler = require("sass");

const server = function (cb) {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        notify: false, //reszta opcji z dokumentacji browsersync
        //host: "192.168.0.24",
        port: 3000,
        open: true,
        browser: "chrome" //https://stackoverflow.com/questions/24686585/gulp-browser-sync-open-chrome-only
    });

    cb();
}

const img = () => src("src/images/*.{jpg,png}")
    .pipe(sharpResponsive({
        formats: [
            // jpeg
            { width: 640, format: "jpeg", rename: { suffix: "-sm" } },
            { width: 768, format: "jpeg", rename: { suffix: "-md" } },
            { width: 1024, format: "jpeg", rename: { suffix: "-lg" } },
            // webp
            { width: 640, format: "webp", rename: { suffix: "-sm" } },
            { width: 768, format: "webp", rename: { suffix: "-md" } },
            { width: 1024, format: "webp", rename: { suffix: "-lg" } }
        ]
    }))
    .pipe(dest("dist/images"));

const css = function () {
    return gulp.src("src/scss/style.scss")
        .pipe(
            sass({
                outputStyle: "compressed" //styl kodu - extended, compressed
            }).on("error", sass.logError)
        )
        .pipe(autoprefixer()) //autoprefixy https://github.com/browserslist/browserslist#queries
        .pipe(sourcemaps.write(".")) //po modyfikacjach na plikach zapisujemy w pamięci sourcemap
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
}

const js = function (cb) { //https://github.com/webpack/docs/wiki/usage-with-gulp#normal-compilation
    return webpack(require("./webpack.config.js"), function (err, stats) {
        if (err) throw err;
        // console.log(stats);
        browserSync.reload();
        cb();
    })
}

const copyImages = function (cb) {
    return gulp.src('src/images/**/*+(.jpg|png|gif|svg)')
        .pipe(gulp.dest('dist/images'))
}


const html = () => {
    return gulp.src(['src/html/*.html', '!src/html/views/*.html'])
        // .pipe(validator())
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist/'));
};


const htmlReload = function (cb) {
    browserSync.reload();
    cb();
}
const watch = function (cb) {
    gulp.watch("src/scss/**/*.scss", { usePolling: true }, gulp.series(css));
    gulp.watch("src/html/**/*.html", gulp.series(html, htmlReload));
    gulp.watch("src/js/**/*.js", gulp.series(js));
    gulp.watch("src/html/**/*.html").on("change", browserSync.reload);
    cb();
}

exports.default = gulp.series(copyImages, html, img, css, js, server, watch);
exports.html = html;
exports.css = css;
exports.watch = watch;
exports.img = img;
exports.copyImages = copyImages;