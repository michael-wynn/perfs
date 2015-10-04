'use strict';
var necklace = require('necklace');
var StaticFolder = require('necklace-static-folder');

var app = new necklace.App();

app
    .route(new StaticFolder('files'))   //necklace serves (cwd)/files to /files, not to root (/)
    .route('hello-world', function () {
        this.sendText('Hello World');
    });

app.listen(+process.argv[2] || 3000);
process.on('STOP', function () {
    process.exit(0)
});
