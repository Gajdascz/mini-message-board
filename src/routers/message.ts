import e from "express";
import { messageController } from "../controllers/message.js";

const router = e.Router();

router.get("/new", messageController.getCreateNewMessage);

router.post("/new", messageController.postCreateNewMessage);

router.get("/:id", messageController.getMessageDetail);

router.get("/", messageController.getCurrentMessages);

export default router;
