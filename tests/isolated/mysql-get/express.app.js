'use strict';
var express = require('express');
var common = require('../../../lib/common');

var app = express();

app.get('/mysql-get', function (req, res, next) {
    return common.mysqlExecute(common.query.mysqlGet)
        .then(function (data) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data[0]));
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

app.listen(+process.argv[2] || 3000);
process.on('STOP', function () {
    process.exit(0)
});
