import e from "express";
import setAppSettings from "./config/app/setSettings.js";
import initAppServer from "./config/app/initServer.js";
import setAppGlobalMw from "./config/app/setGlobalMw.js";
import setAppErrorHandler from "./config/app/setErrorHandler.js";
import setRouters from "./config/app/setRouters.js";

const app = e();

setAppSettings(app);
setAppGlobalMw(app);
setRouters(app);
setAppErrorHandler(app);
initAppServer(app);

export default app;
