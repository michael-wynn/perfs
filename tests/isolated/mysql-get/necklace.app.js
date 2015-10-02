'use strict';
var necklace = require('necklace');
var common = require('../../../lib/common');

var app = new necklace.App();
app.mount('mysql-get', function () {
    return this.run(common.mysql.selectAll)
        .then(this.sendJson);
});

process.on('STOP', function () {
    process.exit(0)
});

common.mysql.initialize()
    .then(function(){
        app.listen(+process.argv[2] || 3000);
    });

