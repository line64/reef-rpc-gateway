import setupBunyan from './setupBunyan';
import setupReefAsync from './setupReefAsync';
import setupRestify from './setupRestify';

export async function setupStateAsync(config) {

  let bunyan = setupBunyan({
    level: config.LOG_LEVEL || 'info',
  	stream: config.stdout
  });

  let reef = await setupReefAsync({
    region: config.AWS_REGION,
    accessKeyId: config.AWS_ACCESSKEYID,
    secretAccessKey: config.AWS_SECRETACCESSKEY,
    clientLane: config.REEF_CLIENT_LANE
  }, bunyan);

  let restify = setupRestify({
    port: config.RESTIFY_PORT
  }, bunyan);

  return { bunyan, reef, restify };

}
