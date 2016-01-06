"use strict";
const pkg = require("./package.json");
//
var execute = () =>  {
    console.log(`Executing task from ${pkg.version} version`);
    console.log("Finishing ...");
}
//
execute();