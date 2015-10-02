var Hapi = require('hapi');
var server = new Hapi.Server();
var inert = require('inert');
var path = require('path');

server.connection({
    host: 'localhost',
    port: +process.argv[2] || 3000
});

server.register(inert, function (err) {
    if (err) {
        console.error(err, err.stack);
        throw err;
    }
});

server.route({
    method: "GET",
    path: "/{param*}",
    handler: {
        directory: {
            path: path.join(process.cwd(), 'public'),
            index: true
        }
    }
});

server.route({
        method: 'GET',
        path: '/hello-world',
        handler: function (request, reply) {
            reply('Hello World');
        }
    }
);

server.start(function () {
    console.info('Server started at ' + server.info.uri);
});

