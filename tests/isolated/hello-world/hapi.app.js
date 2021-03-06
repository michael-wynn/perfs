'use strict';
var Hapi = require('hapi');

var server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: +process.argv[2] || 3000
});

server.route({
        method: 'GET',
        path: '/hello-world',
        handler: function(request, reply){
             reply('Hello World');
        }
    }
);

server.start(function () {
    console.log('Server running at:', server.info.uri);
});

process.on('STOP', function () {
    process.exit(0)
});
