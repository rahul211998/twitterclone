import express from "express";
import {signup, login, logout, getMe, sendMail, testingFunction, generateQrCode, verifyTokenFromQrCode, lastTwoFaProcess,disAbleTwoFa} from "../controllers/authcontroller.js"
import protectRoute from "../middleware/protectRoute.js";
import upload from "../upload.js";
import verifyToken from "../middleware/verifyToken.js"


const router = express.Router();


router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.get("/me", protectRoute , getMe)
router.post("/sendmail",upload.single("image"), sendMail)
router.post("/testingurl",verifyToken,testingFunction)
router.post("/2fa/setup",verifyToken,generateQrCode)
router.post("/2fa/verify-setup",verifyToken,verifyTokenFromQrCode)
router.post("/2fa/challenge",lastTwoFaProcess)
router.post("/2fa/disable", verifyToken, disAbleTwoFa)




export default router;