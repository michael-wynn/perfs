'use strict';
var express = require('express');
var app = express();

app.use('/', function (req, res, next) {
    res.setHeader('content-type', 'text/plain; charset=utf-8');
    res.end('Hello World');
});

app.listen(+process.argv[2] || 3000);
process.on('STOP', function () {
    process.exit(0)
});
