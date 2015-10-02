'use strict';
var Koa = require('koa');
var common = require('../../../lib/common');
var parse = require('co-body');

var printed = false;

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
    if(this.path == '/mysql-insert') {
        var context = this;
        var reply;
        var thisPromise = parse(this)
            .then(function(rows) {
                reply = {received: `${rows.length} rows`};//reply
                var promises = rows.map(function(row){
                    return common.mysql.insertRow(1, row);
                });
                return common.Promise.all(promises)})
            .then(function(){
                context.body = reply;
                if(!printed){
                    printed = true;
                    console.log(reply);
                }
            })
        yield Promise.resolve(thisPromise);    //must wrap in es6 promise to work
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

