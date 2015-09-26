'use strict';
var mach = require('mach');

var app = mach.stack();
app.get('/hello-world', function (conn) {
    return 'Hello World';
});

mach.serve(app, {port: process.argv[2] || 3000})