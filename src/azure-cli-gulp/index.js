var pkg = require("./package.json");
//
function execute() {
    console.log("Executing task from %s version", pkg.version);
    console.log("Finishing ...");
}
//
execute();