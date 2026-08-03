import jwt from "jsonwebtoken";
import User from "../models/usermodel.js"
const verifyToken = async (req, res,next) => {
    const token = req.cookies.jwt;

    if(!token){
        return res.status(401).json({ error: "No token" });
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded.userId){
            return res.json({error : "no decoded.userId found"})
        }

        const user = await User.findOne({_id : decoded.userId});

        if(!user){
            return res.status(404).json({error : "no user found"})
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
}

export default verifyToken;