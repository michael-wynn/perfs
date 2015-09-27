'use strict';
var necklace = require('necklace');
var StaticFolder = require('necklace-static-folder');
var StaticFile = require('necklace-static-file');
var path = require('path');

var app = new necklace.App();

var files = new StaticFolder('files');

app
    .mount((new necklace.Stack('files'))
        .mount(new StaticFile('hello.html', path.join(process.cwd(), 'files/hello.html')))
        .mount(new StaticFile('140k.js', path.join(process.cwd(), 'files/140k.js')))
)
    .mount('hello-world', function () {
        this.sendText('Hello World');
    })
;

app.listen(+process.argv[2] || 3000);
process.on('STOP', function () {
    process.exit(0)
});
