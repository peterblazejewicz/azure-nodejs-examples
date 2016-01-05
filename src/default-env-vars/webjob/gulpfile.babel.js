import del from "del";
import gulp from "gulp";
import zip from "gulp-zip";

gulp.task("clear:dist", () => {
    return del([
        "dist/"
    ]);
});

gulp.task("zip:dist", ["clear:dist"], () => {
    return gulp.src([
        "README.md",
        "index.js",
        "package.json",
        "node_modules/nconf"
    ], { base: "." })
        .pipe(zip("webjob.zip"))
        .pipe(gulp.dest("dist/"));
});

gulp.task("clear", ["clear:dist"]);

gulp.task("dist", ["zip:dist"]);
