'use strict';
var express = require('express');
var common = require('../../../lib/common');

var app = express();
app.get('/mysql-get', function (req, res, next) {
    return common.mysql.selectAll()
        .then(function (data) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
        })
        .catch(next)    //will not handle promise errors properly without this
        ;
})
    .use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            stack: err.stack
        });
    });

process.on('STOP', function () {
    process.exit(0)
});

common.mysql.initialize()
    .then(function(){
        app.listen(+process.argv[2] || 3000);
    })
