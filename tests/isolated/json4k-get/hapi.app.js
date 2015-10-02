'use strict';
var Hapi = require('hapi');
var common = require('../../../lib/common');

var server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: +process.argv[2] || 3000
});

server.route({
        method: 'GET',
        path: '/json-4k',
        handler: function(request, reply){
             reply(common.json4k);
        }
    }
);

server.start(function () {
    console.log('Server running at:', server.info.uri);
});

process.on('STOP', function () {
    process.exit(0)
});
