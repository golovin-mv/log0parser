const { send } = require('micro');
const { router, get } = require('microrouter');

const hello = (req, res) =>
  send(res, 200, `Hello ${req.params.who}`);

const notfound = (req, res) =>
  send(res, 404, 'Not found route');

module.exports = router(
  get('/hello/:who', hello),
  get('/*', notfound),
);
