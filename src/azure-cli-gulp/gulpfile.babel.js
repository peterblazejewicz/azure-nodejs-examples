"use strict";
const gulp = require("gulp");
import {exec} from "child_process";
const gulpExec = require("gulp-exec");
const dargs = require("dargs");
import util from "util";
import del from "del";
const zip = require("gulp-zip");
import nconf from "nconf";
const pkg = require("./package.json");

gulp.task("clean:dist", () => del("dist/"));

gulp.task("clean", ["clean:dist"]);

gulp.task("zip:dist", () => {
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
gulp.task("webjob:deploy", (cb) => {
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
    let args = dargs(nconf.get("options")).concat(nconf.get("site")) || [];
    let execString = util.format("node ./node_modules/.bin/azure site job upload %s",
        args.join(" "));
    let child = exec(execString);
    child.stdout.on("data", (data) => console.log(data));
    child.stderr.on("data", (data) => console.error(data));
    child.on("close", (code) => cb(code));
});


/**
 * azure site job start --help
 * Starts a web job from Azure portal using azure-cli command line tool
 * and options from config.json or defaults one
 * The task will fail if your current azure-cli session expired
 */
gulp.task("webjob:start", (cb) => {
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
    let args = dargs(nconf.get("options")).concat(nconf.get("site")) || [];
    let execString = util.format("node ./node_modules/.bin/azure site job start %s",
        args.join(" "));
    let child = exec(execString);
    child.stdout.on("data", (data) => console.log(data));
    child.stderr.on("data", (data) => console.error(data));
    child.on("close", (code) => cb(code));
});

/**
 * azure site job history list --help
 * Show history of web job from Azure portal using azure-cli command line tool
 * and options from config.json or defaults one
 * The task will fail if your current azure-cli session expired
 */
gulp.task("webjob:history", (cb) => {
    nconf.file({
        file: './config.json'
    }) // defaults if not found in `config.json`
        .defaults({
            "options": {
                "jobName": pkg.name,
            },
            "site": "your-web-app-name"
        });
    // we dont need "jobFile" and jobType args
    nconf.clear("options:jobFile");
    nconf.clear("options:jobType");
    // constructs arguments for azure-cli
    let args = dargs(nconf.get("options")).concat(nconf.get("site")) || [];
    let execString = util.format("node ./node_modules/.bin/azure site job history list %s",
        args.join(" "));
    let child = exec(execString);
    child.stdout.on("data", (data) => console.log(data));
    child.stderr.on("data", (data) => console.error(data));
    child.on("close", (code) => cb(code));
});
