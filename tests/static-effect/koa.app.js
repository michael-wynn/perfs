'use strict';
var Koa = require('koa');
var app = new Koa;

var errorHandler = function * (next) {
    try {
        yield next;
    } catch (err) {
        this.status = 500;
        this.body = 'internal server error';
        this.app.emit('error', err, this);
    }
};

app.use(require('koa-static')('public'));

app.use(function *(next) {
    if(this.path == '/hello-world')
        this.body = 'Hello World';
    yield next;
});

app.listen(+process.argv[2] || 3000);
process.on('STOP', function () {
    process.exit(0)
});
