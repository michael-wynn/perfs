'use strict';
var Koa = require('koa');
var common = require('../../../lib/common');
var parse = require('co-body');

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

var printed = false;
app.use(function *(next) {
    if(this.path == '/json4k-post') {
        var postedObject = yield parse(this);
        var result = {received: common.getJsonCharactersCount(postedObject).toString() + ' characters' };
        this.body = result;
        if(!printed){
            printed = true;
            console.log(result);
        }
    }
    yield next;
});

app.listen(+process.argv[2] || 3000);
process.on('STOP', function () {
    process.exit(0)
});
