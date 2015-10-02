'use strict';
var necklace = require('necklace');
var common = require('../../../lib/common');

var printed = false;

var app = new necklace.App();
app
    .before((new necklace.middies.BodyParser('json', 'requestBody')))
    .mount('mysql-insert', function () {
        var rows = this.store['requestBody'];
        var promises = rows.map(function(row){
            return common.mysql.insertRow(1, row);
        });
        return this.run(common.Promise.all, promises)
            .then(function(){
                var reply = {received: `${rows.length} rows`};
                this.sendJson(reply);
                if(!printed){
                    printed = true;
                    console.log(reply);
                }
            })
    })
    .catch(function(error){
        console.error(error, error.stack);
    })
;

process.on('STOP', function () {
    process.exit(0)
});

common.mysql.initialize()
    .then(function(){
        app.listen(+process.argv[2] || 3000);
    });
