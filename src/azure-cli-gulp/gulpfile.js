var gulp = require("gulp");
var exec = require("child_process").exec;
var gulpExec = require("gulp-exec");
var dargs = require("dargs");
var util = require("util");
var del = require("del");
var zip = require("gulp-zip");
var nconf = require("nconf");
var pkg = require("./package.json");

gulp.task("clean:dist", function () {
    return del([
        "dist/"
    ]);
});

gulp.task("clean", ["clean:dist"]);

gulp.task("zip:dist", function () {
    return gulp.src([
        "index.js",
        "package.json",
        "README.md"
    ], { base: "." }).pipe(zip("webjob.zip"))
        .pipe(gulp.dest("dist/"));
});

gulp.task("dist", ["clean:dist", "zip:dist"]);

/**
 * azure site job upload --help
 * Deploys target archive file as web job to Azure
 * portal using azure-cli command line tool and
 * options from config.json or defaults one
 * The task will fail if your current azure-cli session expired
 */
gulp.task("webjob:deploy", function (cb) {
    nconf.file({
            file: './config.json'
        }) // defaults if not found in `config.json`
        .defaults({
            "options": {
                "jobName": pkg.name,
                "jobType": "triggered",
                "jobFile": "./dist/webjob.zip"
            },
            "site": "your-web-app-name"
        });
    // constructs arguments for azure-cli
    var args = dargs(nconf.get("options")).concat(nconf.get("site")) || [];
    var execString = util.format("node ./node_modules/.bin/azure site job upload %s",
        args.join(" "));
    var child = exec(execString);
    child.stdout.on("data", function (data) {
        console.log(data);
    });
    child.stderr.on("data", function (data) {
        console.error(data);
    });
    child.on("close", function (code) {
        cb(code);
    });
});


/**
 * azure site job start --help
 * Starts a web job from Azure portal using azure-cli command line tool
 * and options from config.json or defaults one
 * The task will fail if your current azure-cli session expired
 */
gulp.task("webjob:start", function (cb) {
    nconf.file({
            file: './config.json'
        }) // defaults if not found in `config.json`
        .defaults({
            "options": {
                "jobName": pkg.name,
                "jobType": "triggered"
            },
            "site": "your-web-app-name"
        });
    // we dont need "jobFile"
    nconf.clear("options:jobFile"); 
    // constructs arguments for azure-cli
    var args = dargs(nconf.get("options")).concat(nconf.get("site")) || [];
    var execString = util.format("node ./node_modules/.bin/azure site job start %s",
        args.join(" "));
    var child = exec(execString);
    child.stdout.on("data", function (data) {
        console.log(data);
    });
    child.stderr.on("data", function (data) {
        console.error(data);
    });
    child.on("close", function (code) {
        cb(code);
    });
});