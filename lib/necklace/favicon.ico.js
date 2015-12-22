'use strict';
var path = require('path');
var FastFile = require('necklace-static-file');

module.exports = new FastFile('favicon.ico', path.join(process.cwd(), 'files/favicon.ico'));