'use strict';
var Koa = require('koa');
var common = require('../../../lib/common');

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

app.use(errorHandler);
app.use(function *(next) {
    if(this.path == '/json-4k')
        this.body = common.json4k;
    yield next;
});

app.listen(+process.argv[2] || 3000);
process.on('STOP', function () {
    process.exit(0)
});
