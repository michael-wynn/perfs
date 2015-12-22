'use strict';
var Hapi = require('hapi');
var path = require('path');
var common = require('../../../lib/common.js');

var server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: +process.argv[2] || 3000
});

server.register(require('vision'), function(err){
    if(err) throw err;
});

server.views({
    engines: {
        jade: require('jade')
    },
    relativeTo: path.join(process.cwd(), 'views/jade')
})

server.route({
        method: 'GET',
        path: '/jade',
        handler: function(request, reply){
            //seems default is cached == true; manually forcing it on makes no difference
            //common.jadeData.cache = true;
            reply.view('welcome', common.jadeData);
        }
    }
);

server.start(function () {
    console.log('Server running at:', server.info.uri);
});

process.on('STOP', function () {
    process.exit(0)
});
