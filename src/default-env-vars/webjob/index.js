"use strict";
const nconf = require("nconf");

// a simple job task
var execute = () => {
    nconf.env().argv();
    console.log(JSON.stringify(nconf.get(), null, 2));
}

execute();