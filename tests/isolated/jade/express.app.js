'use strict';
var express = require('express');
var common = require('../../../lib/common.js');

var app = express();

app.set('views', common.jadeViews);
app.set('view engine', 'jade');

app.use('/jade', function (req, res, next) {
    //common.jadeData.cache = true;
    res.render('welcome', common.jadeData);
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
