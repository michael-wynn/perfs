'use strict';
var necklace = require('necklace');
var common = require('../../../lib/common.js');

var app = new necklace.App();
app.registerViewEngine('jade', common.jadeViewsDir, '.jade')
    .mount('jade', function () {
        this.render('jade', 'welcome', {title: 'Jade performance test', date: new Date});
    });

app.listen(+process.argv[2] || 3000);
process.on('STOP', function () {
    process.exit(0)
});
