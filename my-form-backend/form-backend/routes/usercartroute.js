import express from "express";
import { addToCart , unselectCart } from "../controllers/usercartcontroller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post('/add',addToCart);
router.post("/unselect",protectRoute, unselectCart);

export default router;