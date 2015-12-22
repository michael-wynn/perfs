'use strict';
var common = require('../../lib/common.js');

module.exports = function () {
    this.render('jade', 'welcome', common.jadeData);
}