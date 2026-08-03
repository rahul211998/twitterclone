import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {sendMessageFunction} from "../controllers/messagecontroller.js"

const router = express.Router();

router.post("/sendmessages",protectRoute,sendMessageFunction)

export default router;