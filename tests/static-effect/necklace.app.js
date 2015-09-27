'use strict';
var necklace = require('necklace');
var StaticFolder = require('necklace-static-folder');

var app = new necklace.App();

var files = new StaticFolder('files');

app
    .mount(files)
    .mount('hello-world', function () {
    this.sendText('Hello World');
})
;

app.listen(+process.argv[2] || 3000);
process.on('STOP', function () {
    process.exit(0)
});
