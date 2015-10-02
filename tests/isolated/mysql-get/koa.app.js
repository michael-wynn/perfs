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
    if(this.path == '/mysql-get') {
        var context = this;
        var promise = common.mysql.selectAll()
            .then(function(data){
                context.body = data;
            });
        yield Promise.resolve(promise);    //must wrap in es6 promise to work
    }
    yield next;
});

process.on('STOP', function () {
    process.exit(0)
});

common.mysql.initialize()
    .then(function(){
        app.listen(+process.argv[2] || 3000);
    })

