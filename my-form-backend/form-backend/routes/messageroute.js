import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {getMessages, createGroup, getMyGroups} from "../controllers/messagecontroller.js"

const router = express.Router();

router.get("/mygroups", protectRoute, getMyGroups);
// router.post("/sendmessages",protectRoute,sendMessageFunction)
router.get("/:id", protectRoute, getMessages);
// where :id is the other user's ID.

router.post("/creategroup", protectRoute, createGroup);

export default router;