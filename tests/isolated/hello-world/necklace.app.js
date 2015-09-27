'use strict';
var necklace = require('necklace');
var app = new necklace.App();

app.mount('hello-world', function () {
    this.sendText('Hello World');
});

app.listen(+process.argv[2] || 3000);
process.on('STOP', function () {
    process.exit(0)
});
