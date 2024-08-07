import e, { type Application } from "express";
import path from "path";

const globalMiddleware = [
  e.json(),
  e.urlencoded({ extended: false }),
  e.static(path.join(import.meta.dirname, "../../../public")),
];

export default (app: Application): Application => {
  globalMiddleware.forEach((mw) => app.use(mw));
  return app;
};
