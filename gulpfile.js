const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const terser = require("gulp-terser");
const browsersync = require("browser-sync").create();

function compliecss() {
  return src("src/scss/**/*.scss", { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([cssnano]))
    .pipe(dest("dist", { sourcemaps: "." }));
}

function minifyjs() {
  return src("src/js/**/*.js", { sourcemaps: true })
    .pipe(terser())
    .pipe(dest("dist", { sourcemaps: true }));
}

function browsersyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: ".",
    },
  });
  cb();
}

function serverReload(cb) {
  browsersync.reload();
  cb();
}

function watchTask() {
  watch("*.html", serverReload);
  watch(
    ["src/scss/**/*.scss", "src/js/**/*.js"],
    series(compliecss, minifyjs, serverReload)
  );
}

exports.default = series(compliecss, minifyjs, browsersyncServe, watchTask);
