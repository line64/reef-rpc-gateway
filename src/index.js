import dotenv from 'dotenv';
import curry from 'curry';

import { setupStateAsync } from './bootstrap';
import { startGatewayAsync } from './runtime';

async function start() {

  dotenv.load({ silent: true });

  const config = {
    LOG_LEVEL: process.env.LOG_LEVEL || 'info',
    LOG_STREAM: process.stdout,
    AWS_REGION: process.env.AWS_REGION,
    AWS_ACCESSKEYID: process.env.AWS_ACCESSKEYID,
    AWS_SECRETACCESSKEY: process.env.AWS_SECRETACCESSKEY,
    REEF_CLIENT_LANE: process.env.REEF_CLIENT_LANE,
    RESTIFY_PORT: process.env.RESTIFY_PORT,
    JWT_SECRET: process.env.JWT_SECRET
  };

  let state = await setupStateAsync(config);

  await startGatewayAsync(config, state);

}

start().catch((err) => {
  console.error(err)
  process.exit();
});
