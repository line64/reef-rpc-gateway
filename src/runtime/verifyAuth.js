
export default function(state, req, res, next) {

	let { bunyan } = state;

	//TODO

	bunyan.warn('authorization skipped, not yet implemented');

	next();

}
