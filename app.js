import e from "express";
import http from "node:http";
import createDebug from "debug";
import path from "node:path";
import { onError, pipeOrPort, normalizePort } from "./utils.js";
import messageRouter from "./routes/message.js";

const app = e();
const __dirname = import.meta.dirname;

const debug = createDebug("mini-message-board");

const port = normalizePort(process.env.PORT || "3000");

const server = http.createServer(app);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.set("port", port);

// Global middleware
app.use(e.json());
app.use(e.urlencoded({ extended: false }));
app.use(e.static(path.join(__dirname, "public")));

// Route handlers
app.use("/", messageRouter);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on("error", (error) => onError(error, port));
server.on("listening", onListening);

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = pipeOrPort(addr.port ?? addr);
  debug("Listening on " + bind);
}

export default app;
