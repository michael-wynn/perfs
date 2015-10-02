'use strict';
var mach = require('mach');
var common = require('../../../lib/common');

var app = mach.stack();
app.get('/json-4k', function (conn) {
    return common.json4k;
});

mach.serve(app, {port: process.argv[2] || 3000})