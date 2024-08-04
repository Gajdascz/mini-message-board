/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
}

const pipeOrPort = (check) =>
  typeof check === "string" ? `Pipe: ${check}` : `Port: ${check}`;

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error, port) {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = pipeOrPort(port);
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

const genMsgId = () =>
  Math.round((Math.random() * 100) / 100 + Date.now()).toString();

export { normalizePort, pipeOrPort, onError, genMsgId };
