const server = require('./server');

const { port } = require('./config');

server.listen(port, () => {
  console.info(`\n*** Server Running on http://localhost:${port} ***\n`);
});
