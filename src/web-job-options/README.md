# Azure WebJob configuration example

This example webjob uses [nconf](https://www.npmjs.com/package/nconf) module to manage task access to configuration options.

## Description

```
npm install
```

```
gulp watch
[23:26:28] Using gulpfile ~/git/azure-nodejs-examples/src/web-job-options/gulpfile.js
[23:26:28] Starting 'clean:dev'...
[23:26:28] Starting 'transpile:dev'...
[23:26:28] Finished 'clean:dev' after 29 ms
[23:26:29] Finished 'transpile:dev' after 1.39 s
[23:26:29] Starting 'watch'...
[23:26:29] Finished 'watch' after 12 ms
```

The `dist` task will prepare `WebJob.zip` archive ready to be deployed to Azure.
Note that Gulp task prepare required NPM modules:

```
gulp.task("zip:dist", function() {
  return gulp.src([
      "node_modules/nconf/**",
      "index.js",
      "package.json",
      "config.json"
    ], {base: "."}).pipe(zip("webjob.zip"))
  .pipe(gulp.dest("dist/"));
});
```

```
gulp dist     
[23:27:54] Using gulpfile ~/git/azure-nodejs-examples/src/web-job-options/gulpfile.js
[23:27:54] Starting 'clean:dist'...
[23:27:54] Starting 'zip:dist'...
[23:27:54] Finished 'clean:dist' after 179 ms
[23:27:54] Finished 'zip:dist' after 334 ms
[23:27:54] Starting 'dist'...
[23:27:54] Finished 'dist' after 17 μs
```

## Author
@peterblazejewicz