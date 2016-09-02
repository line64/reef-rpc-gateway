
function parseRequest(req) {

  let { params: { domain, lane, subject }, body } = req;

  if (!domain) throw new Error('Command domain missing from params');

  if (!lane) throw new Error('Command lane missing from params');

  if (!subject) throw new Error('Command subject missing from params');

  let command = subject
    .replace('-', '_')
    .toUpperCase();

  return { domain, lane, command, payload: body };

}

export default async function (state, req, res, next) {

  let { bunyan, reef } = state;

  let log = bunyan.child({ reqId: req.id });

  //TODO: create child bunyan
  log.info('start processing command');

  let { domain, lane, command, payload } = parseRequest(req);

  try {

    log.info('triggering reef command', { domain, lane, command, payload });

    const receipt = await reef.execute(domain, lane, command, payload);

    log.info('reef command executed correctly', { receipt });

		res.send(200, receipt);

    return next();

	} catch(err) {

    log.error(err, 'error while triggering reef command');

    return next(err);

	}

}
