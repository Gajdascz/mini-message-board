import asyncHandler from "express-async-handler";
import { Controller } from "../config/types.js";
import { RequestHandler } from "express";

const messages = [
  {
    text: "Hi There!",
    user: "Amando",
    added: new Date(),
    id: 0,
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
    id: 1,
  },
];

interface MessageController extends Controller {
  getCurrentMessages: RequestHandler;
  getCreateNewMessage: RequestHandler;
  postCreateNewMessage: RequestHandler;
  getMessageDetail: RequestHandler;
}

const messageController: MessageController = {
  getCurrentMessages: asyncHandler((req, res, next) => {
    res.render("index", { title: "Mini Message Board", messages });
  }),
  getCreateNewMessage: asyncHandler((req, res, next) => {
    res.render("form", { title: "New Message Form" });
  }),
  postCreateNewMessage: asyncHandler((req, res, next) => {
    res.redirect("/");
  }),
  getMessageDetail: asyncHandler((req, res, next) => {
    const msg = messages.find((message) => String(message.id) === String(req.params.id));
    if (!msg) throw new Error(`Message with id: ${req.params.id} not found.`);
    res.render("messageDetail", { message: msg });
  }),
};

export { messageController };
