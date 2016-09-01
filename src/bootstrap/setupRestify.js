import {
  createServer,
  acceptParser,
  queryParser,
  bodyParser,
  CORS,
  fullResponse,
  auditLogger
} from 'restify';

export default function (config, bunyan) {

  let { port } = config;
  let server = createServer({ name: 'reef-rpc-gateway' });

  server.use(acceptParser(server.acceptable)); //TODO: what's this for?
  server.use(queryParser());
  server.use(bodyParser());

  server.pre(CORS({
  	origins: ['*'],
  	credentials: true,
  	headers: ['X-Requested-With', 'Authorization', 'Cache-Control']
  })); //TODO: is it really necesary this verbosity?

  server.pre(fullResponse()); //TODO: what's this for?

  server.on('after', auditLogger({ log: bunyan }));

  return server;

}
