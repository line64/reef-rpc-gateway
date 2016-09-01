import bunyan from 'bunyan';

export default function (config) {

  return bunyan.createLogger({
  	name: 'reef-rpc-gateway',
  	level: config.LOG_LEVEL || 'info',
  	stream: config.stdout,
  	serializers : bunyan.stdSerializers
  });

}
