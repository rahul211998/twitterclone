import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
    const accessToken  = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn : "15s"
    });  //15d is for how many days the token must be stored in the browser
    
    console.log("hello")

    // now we are going to send to cookies

    // jwt.sign()

        // Refresh Token - long lived
    const refreshToken = jwt.sign(
        { userId },
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: "15d"
        }
    );

    res.cookie("jwt", accessToken ,{
        maxAge : 15*24*60*1000,
        httpOnly : true,
        sameSite : "strict",
        secure : process.env.NODE_ENV !== "development"
    });


        // Store Refresh Token in cookie
    res.cookie("refreshToken", refreshToken, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    });

    // jwt : yjklcask
}

export default generateToken;

