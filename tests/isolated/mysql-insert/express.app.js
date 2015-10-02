'use strict';
var express = require('express');
var common = require('../../../lib/common');
var bodyParser = require('body-parser');

var printed = false;

var app = express();
app.use(bodyParser.json());

app.use('/mysql-insert', function (req, res, next) {
    var rows = req.body;
    var promises = rows.map(function(row){
        return common.mysql.insertRow(1, row);
    });
    return common.Promise.all(promises)
        .then(function(){
            var reply = {received: `${rows.length} rows`};
            res.setHeader('content-type', 'application/json');
            res.end(JSON.stringify(reply));
            if(!printed){
                printed = true;
                console.log(reply);
            }
        })
});

app.listen(+process.argv[2] || 3000);
process.on('STOP', function () {
    process.exit(0)
});
