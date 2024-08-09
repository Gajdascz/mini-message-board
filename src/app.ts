import e from "express";
import setAppSettings from "./config/app/setSettings.js";
import initAppServer from "./config/app/initServer.js";
import setAppGlobalMw from "./config/app/setGlobalMw.js";
import setAppErrorHandler from "./config/app/setErrorHandler.js";
import setRouters from "./config/app/setRouters.js";
import { createLogger } from "./config/logger.js";

const app = e();

const logger = createLogger("app");

setAppSettings(app);
logger("settings set");

setAppGlobalMw(app);
logger("global middleware set");

setRouters(app);
logger("routers set");

setAppErrorHandler(app);
logger("error handler set");

initAppServer(app);
logger("server initialized");

export default app;
