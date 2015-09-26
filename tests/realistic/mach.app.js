'use strict';
var mach = require('mach');
var path = require('path');

var app = mach.stack();

app.use(mach.file, {
    root: path.join(process.cwd(), 'public'),
    index: 'index.htm',
    useETag: true
});

app.get('/hello-world', function (conn) {
    return 'Hello World';
});

mach.serve(app, {port: process.argv[2] || 3000})