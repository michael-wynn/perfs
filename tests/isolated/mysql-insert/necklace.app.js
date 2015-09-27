'use strict';
var necklace = require('necklace');
var common = require('../../../lib/common');

var app = new necklace.App();
app.mount('mysql-get', function () {
    //conventional syntax:
    var context = this;
    return common.mysqlExecute(common.query.mysqlGet)
        .then(function(data){
            context.sendJson(data[0]);
        })


/*
     //alternate shorthand syntax;
     //use 'run' to bind the chain to current 'this' (context object), starts
     //function common.mysqlExecute & pass common.query.mysqlGet as argument to it

    return this.run(common.mysqlExecute, common.query.mysqlGet)
        .then(function(data){
            this.sendJson(data[0]); //'this' is made available here since it was bound by 'run'
        })
*/

});

app.listen(+process.argv[2] || 3000);
process.on('STOP', function () {
    process.exit(0)
});
