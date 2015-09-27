'use strict';
var necklace = require('necklace');
var common = require('../../../lib/common');

var app = new necklace.App();

//var printed = false;
app
    .before((new necklace.middies.BodyParser('json', 'requestBody')))
    .mount('json4k-post', function () {
        var postedObject = this.store['requestBody'];
        var result = {received: common.getJsonCharactersCount(postedObject).toString() + ' characters' };
        this.sendJson(result);
        if(!printed){
            printed = true;
            console.log(result);
        }
    });

app.listen(+process.argv[2] || 3000);
process.on('STOP', function () {
    process.exit(0)
});
