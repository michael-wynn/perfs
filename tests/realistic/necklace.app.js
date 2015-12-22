'use strict';
var necklace = require('necklace');
var common = require('../../lib/common.js');
var path = require('path');

var app = new necklace.App();

app.registerViewEngine('jade', common.jadeViewsDir, '.jade')
    .map(path.join(process.cwd(), 'lib/necklace'));

app.listen(+process.argv[2] || 3000);
process.on('STOP', function () {
    process.exit(0)
});
