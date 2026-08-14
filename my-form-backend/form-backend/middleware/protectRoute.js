import jwt from "jsonwebtoken";
import User from "../models/usermodel.js"

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token){
          return res.status(401).json({error : "unAutherized : no token provided"})
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        if(!decodedToken){
            return res.status(400).json({error : "Invalid token"})
        }

        const user = await User.findOne({_id : decodedToken.userId}).select("-password")

        if(!user){
            return res.status(400).json({error : "no user"})
        }

        req.user = user;
        next(); 
    } catch (error) {
        console.log("one")
        console.log(`error in protectRoute controller ${error}`);
        res.status(401).json({error: "Invalid token" })
    }
}

export default protectRoute;