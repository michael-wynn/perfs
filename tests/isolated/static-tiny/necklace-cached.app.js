'use strict';
var necklace = require('necklace');
var StaticFile = require('necklace-static-file');
var path = require('path');

var app = new necklace.App();

app
    .mount((new necklace.Stack('files'))
        .mount(new StaticFile('hello.html', path.join(process.cwd(), 'files/hello.html'))))
    .point('hello-world', function () {
        this.sendText('Hello World');
    })
;

app.listen(+process.argv[2] || 3000);
process.on('STOP', function () {
    process.exit(0)
});
