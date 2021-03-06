'use strict';
var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');
var common = require('../../lib/common.js');

var app = express();

app.use(favicon(path.join(process.cwd(), '/public/files/favicon.ico')));
app.use(express.static('public')); //serve static at top

app.set('views', common.jadeViewsDir);
app.set('view engine', 'jade');

app.use('/', function (req, res, next) {
    common.jadeData.cache = true;
    res.render('welcome', common.jadeData);
});

app.use('/readme', function (req, res, next) {
    res.end('this is the read-me file')
});

app.use(function (err, req, res, next) {
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
