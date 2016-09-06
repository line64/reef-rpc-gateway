
function parseRequest(req) {

  let { params: { domain, lane, subject }, query } = req;

  if (!domain) throw new Error('Query domain missing from params');

  if (!lane) throw new Error('Query lane missing from params');

  if (!subject) throw new Error('Query subject missing from params');

  let queryKey = subject
    .replace(/-/g, '_')
    .toUpperCase();

  return { domain, lane, query: queryKey, payload: query };

}

export default async function (state, req, res, next) {

  let { bunyan, reef } = state;

  let log = bunyan.child({ reqId: req.id });

  log.info('handling query');

  let { domain, lane, query, payload } = parseRequest(req);

  try {

    log.info('executing reef query', { domain, lane, query });

    const data = await reef.query(domain, lane, query, payload);

    log.info('reef query executed correctly');

		res.send(200, data);

    return next();

	} catch(err) {

    log.error(err, 'error while executing reef query');

    return next(err);

	}

}
