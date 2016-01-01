var gulp = require("gulp");
var ts = require("gulp-typescript");
var del = require("del");
var zip = require("gulp-zip");
var sourcemaps = require("gulp-sourcemaps");
var project = ts.createProject("tsconfig.json");

gulp.task("clean:all", [
  "clean:dev", 
  "clean:dist"
]);

gulp.task("clean:dev", function() {
  return del([
    "lib/*"
  ]);
});

gulp.task("clean:dist", function() {
  return del([
    "dist/*"
  ]);
});

gulp.task("transpile:dev", function() {
    return project.src()
      .pipe(sourcemaps.init())
      .pipe(ts(project))
      .js.pipe(sourcemaps.write("."))
      .pipe(gulp.dest("."));  
});

gulp.task("zip:dist", function() {
  return gulp.src([
    "index.js",
    "package.json"
  ], {base: "."}).pipe(zip("webjob.zip"))
  .pipe(gulp.dest("dist/"));
});

gulp.task("dist", ["clean:dist", "zip:dist"]);

gulp.task("watch", ["clean:dev", "transpile:dev"], function() {
  gulp.watch("src/*.ts", ["transpile:dev"]);
});

gulp.task("clean", ["clean:all"]);