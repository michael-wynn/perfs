'use strict';
var express = require('express');
var common = require('../../../lib/common');

var app = express();

app.use('/json-4k', function (req, res, next) {
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify(common.json4k));
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        stack: err.stack
    });
});

app.listen(+process.argv[2] || 3000);
process.on('STOP', function () {
    process.exit(0)
});
