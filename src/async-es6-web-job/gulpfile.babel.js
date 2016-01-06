"use strict";
const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const del = require("del");
const ts = require("gulp-typescript");
const project = ts.createProject("./tsconfig.json");
const zip = require("gulp-zip");
const merge = require("merge2");

gulp.task("clean:dist", () => del("dist/*"));

gulp.task("clean:lib", () => del("lib/*"));

gulp.task("clean", ["clean:dist", "clean:lib"]);


gulp.task("dist", ["clean:dist"], () => {
    return merge(gulp.src([
        "node_modules/babel-polyfill/**",
        "package.json",
        "config.json"
    ], { base: "." }), gulp.src([
        "lib/**",
        "!lib/**/*.js.map"
    ], { base: "lib/" })).pipe(zip("webjob.zip"))
        .pipe(gulp.dest("dist/"));
});


gulp.task("babel", () => {
    return project.src()
        .pipe(sourcemaps.init())
        .pipe(ts(project))
        .pipe(babel())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("lib"));
});

gulp.task("watch", ["clean:lib", "babel"],  () => gulp.watch(project.config.files, ["babel"]));