'use strict';
'use strict';
var Koa = require('koa');
var common = require('../../../lib/common.js');
var jade = require('koa-jade-render');

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

app.use(jade(common.jadeViewsDir));

app.use(function *(next) {
    if(this.path == '/jade') {
        //common.jadeData.cache = true;
        yield this.render('welcome.jade', common.jadeData);
    }
    yield next;
});

app.listen(+process.argv[2] || 3000);
process.on('STOP', function () {
    process.exit(0)
});
