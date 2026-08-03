import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn : "15d"
    });  //15d is for how many days the token must be stored in the browser
    
    console.log("hello")

    // now we are going to send to cookies

    // jwt.sign()

    res.cookie("jwt", token,{
        maxAge : 15*24*60*1000,
        httpOnly : true,
        sameSite : "strict",
        secure : process.env.NODE_ENV !== "development"
    })

    // jwt : yjklcask
}

export default generateToken;

