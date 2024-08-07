import { type RequestHandler } from "express";

interface Controller {
  [key: string]: RequestHandler;
}
export type { Controller };
