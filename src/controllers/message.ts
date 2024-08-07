import asyncHandler from "express-async-handler";
import { Controller } from "../config/types.js";
import { RequestHandler } from "express";
import db from "../db/db.js";
import {
  RegExpMatcher,
  TextCensor,
  englishDataset,
  englishRecommendedTransformers,
} from "obscenity";
import { createLogger } from "../config/logger.js";

interface MessageController extends Controller {
  getAllMessages: RequestHandler;
  getCreateNewMessage: RequestHandler;
  postCreateNewMessage: RequestHandler;
  getMessageDetail: RequestHandler;
}

const censor = new TextCensor();
const matcher = new RegExpMatcher({ ...englishDataset.build(), ...englishRecommendedTransformers });
const logger = createLogger("message:controller");

const clean = (str: string) => {
  let clean = str.trim();
  if (clean.length === 0) throw new Error(`Message cannot be empty`);
  const matches = matcher.getAllMatches(clean);
  if (matches.length > 0) clean = censor.applyTo(clean, matches);
  return clean;
};

const messageController: MessageController = {
  getAllMessages: asyncHandler(async (req, res, next) => {
    const { rows: messages } = await db.selectAllMessages();
    const formattedMessages = messages.map((msg) => ({
      ...msg,
      sent: msg.sent.toLocaleString(),
    }));
    logger("getAllMessages", formattedMessages);
    res.render("index", { title: "Mini Message Board", messages: formattedMessages });
  }),
  getCreateNewMessage: asyncHandler((req, res, next) => {
    res.render("form", { title: "New Message Form" });
  }),
  postCreateNewMessage: asyncHandler((req, res, next) => {
    const { nameInput, messageInput } = req.body;
    const cleanName = clean(nameInput);
    const cleanMessage = clean(messageInput);
    const sent = new Date();
    logger("postCreateNewMessage", { cleanName, cleanMessage, sent });
    db.insertMessage(cleanName, cleanMessage, sent);
    res.redirect("/");
  }),
  getMessageDetail: asyncHandler(async (req, res, next) => {
    if (!req.params.id) throw new Error("No id provided.");
    const { rows: msg } = await db.selectById(req.params.id);
    if (!msg) throw new Error(`Message with id: ${req.params.id} not found.`);
    logger("getMessageDetail", msg);
    res.render("messageDetail", { message: msg });
  }),
};

export { messageController };
