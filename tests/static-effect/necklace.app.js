'use strict';
var necklace = require('necklace');
var StaticFolder = require('necklace-static-folder');

var app = new necklace.App();

app
    .mount(new StaticFolder('files'))   //necklace serves (cwd)/files to /files, not to root (/)
    .mount('hello-world', function () {
        this.sendText('Hello World');
    });

app.listen(+process.argv[2] || 3000);
process.on('STOP', function () {
    process.exit(0)
});
