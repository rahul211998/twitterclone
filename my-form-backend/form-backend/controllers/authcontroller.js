import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import transporter from "../mail/transporterpage.js";
import SMTPTransport from "nodemailer/lib/smtp-transport/index.js";
import jwt from "jsonwebtoken";
import speakeasy from "speakeasy"
import QRCode from "qrcode"
// import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    try {
        const {username, fullName, email, password} = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/    // used to validate email
        if(!emailRegex.test(email)){
            return res.status(400).json({error : "invalid email format"});
        }
              
        const existingEmail = await User.findOne({email});
        const existingUser = await User.findOne({username});

        // console.log("existingEmail",existingEmail);

        if(existingEmail || existingUser){
            return res.status(400).json({error : "already existing user or email"})
        }

        if(password.length < 6){
            return res.status(400).json({error : "password must have atleast 6 characters"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({   //creates a new user document object
            username,
            fullName,
            email,
            password : hashedPassword
        });

        if(newUser){
            generateToken(newUser._id, res)
            await newUser.save();
            res.status(200).json({_id : newUser._id,
                username : newUser.username,
                fullName : newUser.fullName,
                email : newUser.email,
                followers : newUser.followers,
                following : newUser.following,
            })
        }
        else{
            res.status(400).json({error : "invalid user data"})
        }

    } catch (error) {
        console.log(`error in signup controller ${error}`);
        res.status(500).json({error : "Internal server error"});
    }
}

export const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect){
          return  res.status(400).json({error : "invalid user or password"});
        }

          if (user.twoFactorEnabled) {
    const tempToken = jwt.sign(
      { id: user._id, pending2FA: true },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );
    res.cookie("temp_jwt", tempToken, { httpOnly: true, maxAge: 5 * 60 * 1000 });
    return res.json({ requires2FA: true });
  }

        generateToken(user._id, res);

        res.status(200).json({
            userdata : {
            _id : user._id,
            username : user.username,
            fullName : user.fullName,
            email : user.email,
            followers : user.followers,
            following : user.following,
            profileImg : user.profileImg,
            coverImg : user.coverImg,
            bio : user.bio,
            link : user.link
            }
        })
    } catch (error) {
        console.log(`error in login controller ${error}`);
        res.status(500).json({error : "Internal server error login"});
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "" , {maxAge : 0});
        res.status(200).json({message : "loged out successfully"})
    } catch (error) {
        console.log(`error in login controller ${error}`);
        res.status(500).json({error : "Internal server error logout"})
    }
}

export const getMe = async (req,res) => {
    try {
        // const user = User.findOne({_id : req.user._id})
        const user = await User.findOne({_id : req.user._id}).select("-passoword")
        res.status(200).json(user)
    } catch (error) {
                console.log(`error in getMe function controller ${error}`);
        res.status(500).json({error : "Internal server error getMe function"})
    }
}

export const sendMail = async (req, res) => {
    
  const { to, sub, msg } = req.body;
  const file = req.file;

  try {
     transporter.sendMail({
      from: process.env.EMAIL_USER, 
      to,
      subject: sub,
      html: msg,
      attachments : file ? [
        {
            filename : file.originalname,
            content: file.buffer,
        }
      ] : []
    });
    res.status(200).json({ success: true, message: "Email sent successfully from google" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//2fa setup code

export const generateQrCode = async (req, res) => {
    try {
        
    const user = await User.findById({_id : req.user._id}).select("-passoword");

    if(!user){
       return res.json({message : "no user"});
    }

    // res.json({message : req.user});

    // Generate a new secret
    // The name to use with Google Authenticator, deaults to 'SecretKey'
    const secret = speakeasy.generateSecret({
        name : `MyApp (${user.email})`
    })  //shown inside authenticator app

    // res.json({message : `secret key ${secret.otpauth_url}`})

      // Save secret to DB (not enabled yet until user verifies)
  user.twoFactorSecret  = secret.base32;
  user.twoFactorEnabled = false;
  await user.save();

    const qrCode = await QRCode.toDataURL(secret.otpauth_url);
//     // Google Authenticator-compatible otpauth URL.

// res.json({message : `qrcode ${secret.base32}`})


    res.json({
    message: "Scan this QR code in Google Authenticator",
    qrCode,               // base64 image → show in <img src={qrCode} />
    secret: secret.base32, // backup: user can enter this manually
    userdata : user
  });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}


export const verifyTokenFromQrCode = async (req, res) => {

    try {
    const {token} = req.body; // 6-digit code from authenticator app

    if(!token){
        return res.json({message : "no token"})
    }

    const user = await User.findById({_id : req.user._id}).select("-password");

        if(!user){
        return res.json({message : "no user"}) 
        }
    

    const isValid = speakeasy.totp.verify({
        secret : user.twoFactorSecret,
        encoding: "base32",
        token,
        window:   1,  // allows 30s clock drift
    })


    if (!isValid) {
        return res.json({ error: "Invalid code, try again" });
    } 

      user.twoFactorEnabled = true;
      await user.save();

      res.json({ message: "2FA enabled successfully ✅", success : true, userdata : user });
    // res.json({message : `token ${token} user ${user}`})
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}


export const lastTwoFaProcess = async (req , res) => {

    try {
    const {token} = req.body;

    console.log("token isss",token)

    if(!token){
        return res.json({message : "no token from lastTwoFaProcess"})
    }

    const tempToken = req.cookies.temp_jwt;

    if (!tempToken) return res.status(401).json({ error: "No temp token from lastTwoFaProcess" });


    const decode = jwt.verify(tempToken, process.env.JWT_SECRET);

    // res.json({message : decode.pending2FA});
    
    // return res.status(401).json({ error: "Temp token expired, login again" });
    

    if (!decode.pending2FA) return res.status(401).json({ error: "Unauthorized" });

    const user = await User.findById({_id : decode.id}).select("-passoword");

    if(!user){
        return res.json({message : "no user"});
    }

    

    const isValid = speakeasy.totp.verify({
        secret : user.twoFactorSecret,
        encoding : "base32",
        token,
        window : 1
    })

    console.log("isValid",isValid)

    if (!isValid) {
        console.log("no decode isvalid")
        return res.json({ error: "no decode" });
    }
    
    // res.json({message : decode.pending2FA});
    //---------------------------

    // if (!isValid) return res.status(400).json({ error: "Invalid 2FA code" });

    res.cookie("temp_jwt", "", {maxAge : 0})

    generateToken(user._id, res);

    res.json({ message: "Login successful ✅" , success2favalid : true, userdata : user});
    } catch (error) {
        res.status(500).json({ success: false, error: "ltp failed"});
    }
}


    // user.twoFactorSecret = secret.base32;
    // user.twoFactorEnabled = false;
    // await user.save();

    //tfs :  MZBXWMRMFFQS4WCHJBLXMORZGE6CSTZ7MNSSY5D2NRHWCP2EKVXQ

    export const disAbleTwoFa = async (req,res) => {
        try {
            await User.findByIdAndUpdate(req.user.id,{
                twoFactorSecret:  null,
                twoFactorEnabled: false,
        });

        res.json({ message: "2FA disabled" });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }












export const testingFunction = async (req,res) => {
    try {
       const {gamename , heroname} = req.body;
    //    const user = await User.findOne({username : heroname})

       if(!gamename || !heroname){
        return res.json({required : ` gamename or heroname`})
       }
       
    //    let token = req.cookies.jwt;

    //    const decodeJwt = jwt.verify(token, process.env.JWT_SECRET)
       
    //    console.log(decodeJwt)

    //    if(!token){
    //     res.json({message : `no token`})
    //    }

    const users = await User.aggregate([
        {
            $match : {
                username : heroname
            }
        }
    ])

    if(!users){
        res.json({error : "no users in aggregate"});
        return;
    }
    // const bcrypt = await bcrypt();
    const bcryptSalt = await bcrypt.genSalt(10);
    // console.log("bcryptSalt",bcryptSalt)
       res.status(200).json({bcryptInstance : bcryptSalt})
    } catch (error) {
        res.status(500).json({success : false, error : `error is ${error}`})
        console.log("error in dummyfunction",error)
    }
}
