var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var del = require("del");
var ts = require("gulp-typescript");
var project = ts.createProject("./tsconfig.json");
var zip = require("gulp-zip");
var merge = require("merge2");

gulp.task("clean:dist", function() {
    return del([
        "dist/*"
    ]);
});

gulp.task("clean:lib", function() {
    return del([
        "lib/*"
    ]);
});

gulp.task("clean", ["clean:dist", "clean:lib"]);


gulp.task("dist", ["clean:dist"], function() {
  return merge(gulp.src([
      "node_modules/babel-polyfill/**",
      "package.json",
      "config.json"
    ], {base: "."}), gulp.src([
        "lib/**",
        "!lib/**/*.js.map"
    ], { base: "lib/" })).pipe(zip("webjob.zip"))
  .pipe(gulp.dest("dist/"));
});


gulp.task("babel", function() {
    return project.src()
        .pipe(sourcemaps.init())
        .pipe(ts(project))
        .pipe(babel())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("lib"));
});

gulp.task("watch", ["clean:lib", "babel"], function() {
    gulp.watch(project.config.files, ["babel"]);
});
