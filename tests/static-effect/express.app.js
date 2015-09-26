'use strict';
var express = require('express');
var app = express();

app.use(express.static('public')); //serve static at top

app.use('/hello-world', function (req, res, next) {
    res.setHeader('content-type', 'text/plain; charset=utf-8');
    res.end('Hello World');
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
