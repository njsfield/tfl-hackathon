const Hapi = require('hapi');
const server = new Hapi.Server();

const fs = require('fs');

const tls = {
  key: fs.readFileSync('keys/key.pem'),
  cert: fs.readFileSync('keys/cert.pem')
};

server.connection({address: '0.0.0.0', port: 8080, tls: tls });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});

server.start(function () {
    console.log(`Server running at port ${server.info.uri}`);
});
