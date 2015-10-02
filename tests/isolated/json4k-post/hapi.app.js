'use strict';
var Hapi = require('hapi');
var common = require('../../../lib/common');

var server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: +process.argv[2] || 3000
});

var printed = false;
server.route({
        method: 'POST',
        path: '/json4k-post',
        handler: function (req, reply) {
            var postedObject = req.payload;
            var result = {received: common.getJsonCharactersCount(postedObject).toString() + ' characters' };
            reply(result);
            if (!printed) {
                printed = true;
                console.log(result);
            }
        }
    }
);

server.start(function () {
    console.log('Server running at:', server.info.uri);
});

process.on('STOP', function () {
    process.exit(0)
});
