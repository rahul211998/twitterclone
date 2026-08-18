import express from "express";
import { addToCart , unselectCart, showAllCartDatas } from "../controllers/usercartcontroller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get('/getallcart',protectRoute,showAllCartDatas);
router.post('/add',protectRoute,addToCart);
router.post("/unselect",protectRoute, unselectCart);

export default router;