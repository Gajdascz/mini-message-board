import { genMsgId } from "../utils.js";

const messages = [
  {
    text: "Hi There!",
    user: "Amando",
    added: new Date(),
    id: genMsgId(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
    id: genMsgId(),
  },
];

const c = {
  getCurrentMessages(req, res, next) {
    res.render("index", { title: "Mini Message Board", messages });
  },
  getCreateNewMessage(req, res, next) {
    res.render("form", { title: "New Message Form" });
  },
  postCreateNewMessage(req, res, next) {
    messages.push({
      text: req.body.messageInput,
      user: req.body.nameInput,
      added: new Date(),
      id: genMsgId(),
    });
    res.redirect("/");
  },

  getMessageDetail(req, res, next) {
    const msg = messages.find((message) => message.id === req.params.id);
    if (!msg) throw new Error(`Message with id: ${req.params.id} not found.`);
    res.render("messageDetail", { message: msg });
  },
};

export { c as messageController };
