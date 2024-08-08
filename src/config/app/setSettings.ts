import type { Application } from "express";
import path from "node:path";
import { serverPort } from "../envVars.js";

const settings = [
  { name: "views", value: path.join(import.meta.dirname, "../../../views") },
  { name: "view engine", value: "ejs" },
  { name: "port", serverPort },
];

export default (app: Application): Application => {
  settings.forEach((setting) => app.set(setting.name, setting.value));
  return app;
};
