const Hapi = require('hapi');
const server = new Hapi.Server();
const inert = require('inert');
const vision = require('vision');
const handlebars = require('handlebars');

const fs = require('fs');

const tls = {
  key: fs.readFileSync('keys/key.pem'),
  cert: fs.readFileSync('keys/cert.pem')
};

server.connection({address: '0.0.0.0', port: 8080, tls: tls });

const routes = [{
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply.view('index');
    }
  },
    {
    method: 'GET',
    path: '/{path*}',
    handler: {
      directory: {
        path: './public'
      }
    }
  }];


server.register([inert, vision], (err) => {
  if (err) console.log(err);
  server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: __dirname,
    path: '.'
  });

  server.route(routes);
});

server.start(function () {
    console.log(`Server running at port ${server.info.uri}`);
});
