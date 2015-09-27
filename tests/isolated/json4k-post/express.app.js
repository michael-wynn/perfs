'use strict';
var express = require('express');
var common = require('../../../lib/common');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

var printed = false;
app.use('/json4k-post', function (req, res, next) {
    var postedObject = req.body;
    var result = {received: common.getJsonCharactersCount(postedObject).toString() + ' characters' };
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify({received: common.getJsonCharactersCount(req.body)}));
    if(!printed){
        printed = true;
        console.log(result);
    }

});

app.listen(+process.argv[2] || 3000);
process.on('STOP', function () {
    process.exit(0)
});
