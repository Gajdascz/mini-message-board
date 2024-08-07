import type { Application, NextFunction, Request, Response } from "express";

type ErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => void;

const errorHandler: ErrorHandler = (err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
};

export default (app: Application): Application => {
  app.use(errorHandler);
  return app;
};
