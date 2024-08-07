import type { Application } from "express";
import http, { type Server } from "node:http";
import { serverPort, pgHost } from "../envVars.js";

export default (app: Application): Server => {
  const server = http.createServer(app);
  server.listen(serverPort);
  server.on("error", (error: any) => {
    if (error.syscall !== "listen") throw error;
    switch (error.code) {
      case "EACCES":
        console.error(`${serverPort}: requires elevated privileges`);
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(`${serverPort}: is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  });
  server.on("listening", () => console.log(`Listening on: http://${pgHost}:${serverPort}`));
  return server;
};
