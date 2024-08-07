import { type Application } from "express";
import messageRouter from "../../routers/message.js";

export default (app: Application): Application => {
  app.use("/", messageRouter);
  return app;
};
