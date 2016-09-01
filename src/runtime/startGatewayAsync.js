import curry from 'curry';
import jwt from 'restify-jwt';
import verifyAuth from './verifyAuth';
import handleQuery from './handleQuery';
import handleCommand from './handleCommand';

export default async function (config, state) {

  let { JWT_SECRET, RESTIFY_PORT } = config;
  let { reef, restify, bunyan } = state;

	bunyan.info('starting up reef client');

	await reef.start();

  bunyan.info('hooking restify middleware');

  restify.get(
    '/:domain/:lane/:subject',
    jwt({secret: JWT_SECRET}),
    curry(verifyAuth)(state),
    curry(handleQuery)(state)
  );

  restify.post(
    '/:domain/:lane/:subject',
    jwt({secret: JWT_SECRET}),
    curry(verifyAuth)(state),
    curry(handleCommand)(state)
  );

  bunyan.info('listening via restify', { RESTIFY_PORT });

  restify.listen(RESTIFY_PORT);

}
