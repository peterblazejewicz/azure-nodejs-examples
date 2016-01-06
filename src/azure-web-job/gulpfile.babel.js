const gulp = require("gulp");
const ts = require("gulp-typescript");
const del = require("del")
const zip = require("gulp-zip");
const sourcemaps = require("gulp-sourcemaps");
const project = ts.createProject("tsconfig.json");

gulp.task("clean:all", ["clean:dev", "clean:dist"]);

gulp.task("clean:dev", () => del("lib/*"));

gulp.task("clean:dist", () => del("dist/*"));

gulp.task("transpile:dev", () => {
  return project.src()
    .pipe(sourcemaps.init())
    .pipe(ts(project))
    .js.pipe(sourcemaps.write("."))
    .pipe(gulp.dest("."));
});

gulp.task("zip:dist", () => {
  return gulp.src([
    "index.js",
    "package.json"
  ], { base: "." }).pipe(zip("webjob.zip"))
    .pipe(gulp.dest("dist/"));
});

gulp.task("dist", ["clean:dist", "zip:dist"]);

gulp.task("watch", ["clean:dev", "transpile:dev"],
  () => gulp.watch("src/*.ts", ["transpile:dev"]));

gulp.task("clean", ["clean:all"]);