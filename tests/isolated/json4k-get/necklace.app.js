'use strict';
var necklace = require('necklace');
var common = require('../../../lib/common');

var app = new necklace.App();
app.route('json-4k', function () {
    this.sendJson(common.json4k);
});

app.listen(+process.argv[2] || 3000);
process.on('STOP', function () {
    process.exit(0)
});
