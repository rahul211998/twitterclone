import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {getMessages} from "../controllers/messagecontroller.js"

const router = express.Router();

// router.post("/sendmessages",protectRoute,sendMessageFunction)
router.get("/:id", protectRoute, getMessages);
// where :id is the other user's ID.

export default router;