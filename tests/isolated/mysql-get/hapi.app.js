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
        path: '/mysql-get',
        handler: function(request, reply){
            return common.mysql.selectAll()
                .then(function (data) {
                    reply(data);
                })
        }
    }
);

process.on('STOP', function () {
    process.exit(0)
});

common.mysql.initialize()
    .then(function(){
        server.start(function () {
            console.log('Server running at:', server.info.uri);
        });
    });


