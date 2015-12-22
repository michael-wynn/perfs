'use strict';
var necklace = require('necklace');
var common = require('../../../lib/common.js');

var app = new necklace.App();
app.registerViewEngine('ejs', common.ejsViewsDir, '.ejs')
    .route('ejs', function () {
        this.render('ejs', 'welcome', common.ejsData);
    });

app.listen(+process.argv[2] || 3000);
process.on('STOP', function () {
    process.exit(0)
});
