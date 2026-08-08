import User from "../models/usermodel.js";
import Notification from "../models/notificationmodel.js";
import bcrypt from "bcryptjs";
import cloudinary from "cloudinary"

export const getProfile = async (req, res) => {
    try {
        console.log("req.params",req.params)
        const {username} = req.params;
        const user = await User.findOne({username});

        if(!user){
          return res.status(400).json({error : `no user found`})
        }

        res.status(200).json({message : user})
    } catch (error) {
        res.status(500).json({error : `Internal Server Error in getProfile ${error}`})
    }
}

export const followUnfollowUser = async (req, res) => {
    try {
        const {id} = req.params;

        console.log("followUnfollowUser id",id === req.user._id)
        console.log("followUnfollowUser req.user._id",req.user._id)

        const userToModify = await User.findById({_id : id});
        const currentUser = await User.findById({_id : req.user._id});

        if(id === req.user._id.toString()){
            return res.status(400).json({error : "you cant send req to yourself"})
        }

        if(!userToModify || !currentUser){
            return res.status(400).json({error : "no userToModify or no currentUser or no user found"})
        }

        const isFollowing = currentUser.following.includes(id);

        if(isFollowing){
            //unfollow
            await User.findByIdAndUpdate({_id : id}, {$pull : {followers : req.user._id}})
            await User.findByIdAndUpdate({_id : req.user._id}, {$pull : {following : id}})

            res.status(200).json({message : "unfollow successfully"})
        }
        else{
            //follow
            await User.findByIdAndUpdate({_id : id}, {$push : {followers : req.user._id}})
            await User.findByIdAndUpdate({_id : req.user._id}, {$push : {following : id}})

            const newNotification = new Notification({
                type : "follow",
                from : req.user._id,
                to : userToModify._id
            });

            await newNotification.save();

            res.status(200).json({message : "follow successfully"})

            //send notification
        }

        
    } catch (error) {
        res.status(500).json({error : `Internal Server Error in followUnfollowUser ${error}`})
    }
}

export const getSuggestedUsers = async (req , res) => {
    try {
        const userId = req.user._id;
        const userFollowedByMe = await User.findById({_id : userId}).select("-password")

        const users = await User.aggregate([
            {
                $match : {   // it matches the data we give and give that matched data
                    _id : {$ne : userId}
                },
            }, 
            {
                $sample : {
                    size : 10
                }
            }
        ])

        const fillteredUser = users.filter((user) => !userFollowedByMe.following.includes(user._id))

        const suggestedUsers = fillteredUser.slice(0,4)

        suggestedUsers.forEach((user) => (user.password = null));

        res.status(200).json({suggestedUsers : suggestedUsers})

        // if(!user){
        //   return  res.json({error : "no userId or no userFollowedByMe"})
        // }
        
        // res.json({message : user})
    } catch (error) {
        res.status(500).json({error : `Internal Server Error in getSuggestedUser ${error}`})
    }
}

export const updateUser = async (req, res) => {
    try {
        const userId = req.user._id;

        const {username, fullName , email , currentPassword , newPassword, bio, link, } = req.body;
        let {profileImg, coverImg} = req.body;

        console.log("profileImg",profileImg)

        let user = await User.findById({_id : userId});

        if(!user){
            return res.status(400).json({error : "no user found"});
        }

        if((!newPassword && currentPassword) || (!currentPassword && newPassword)){
            return res.status(400).json({error : "please provide both newPassword and currentPassword"});
        }

        if(currentPassword && newPassword){
            const isMatch = await bcrypt.compare(currentPassword , user.password);

            if(!isMatch){
                return res.status(400).json({error : "currentPassword is incorrect"});
            }

            if(newPassword.length < 6){
                return res.status(400).json({error : "password must have atleast six characters"});
            }

            const salt = await bcrypt.genSalt(10);  // looks like this "$2b$10$YwDxB5L6jtL3KP8L8AYxwu"
            // user.password = await bcrypt.hash(newPassword, salt)
            // const hashedPassword = await bcrypt.hash(newPassword, salt);
            // insted of hash think like encrypy
            //hash na password-oda secure coded version.

            user.password = await bcrypt.hash(newPassword, salt);


            // genSalt() secure random number algorithm use panni oru random salt create pannum; 
            // hash() dhaan bcrypt algorithm use panni password-ai secure string-a maathum.
        }

        // profile image and cover image

        if(profileImg){

            if(user.profileImg){
                // inside the destroy function we have to send the image id
                //ex : https://res.cloudinary.com/demo/image/upload/v1753891234/profile_abc123.jpg
                // here we get this alone profile_abc123
                await cloudinary.uploader.destroy(user.profileImg.split("/").pop().split(".")[0]);
            }

            const uploadedResponse = await cloudinary.uploader.upload(profileImg)
            profileImg = uploadedResponse.secure_url;
        }

        // if(coverImg){

        //     if(user.coverImg){
        //         // inside the destroy function we have to send the image id
        //         //ex : https://res.cloudinary.com/demo/image/upload/v1753891234/profile_abc123.jpg
        //         // here we get this alone profile_abc123
        //         await cloudinary.uploader.destroy(user.coverImg.split("/").pop().split(".")[0]);
        //     }


        //     const uploadedResponse = await cloudinary.UploadStream.uploader.upload(coverImg)
        //     coverImg = uploadedResponse.secure_url;
        // }

        user.fullName = fullName || user.fullName;
        user.email = email || user.email;
        user.username = username || user.username;
        user.bio = bio || user.bio;
        user.link = link || user.link;
        user.profileImg = profileImg || user.profileImg;
        user.coverImg = coverImg || user.coverImg

        user = await user.save();

        user.password = null;
        user.twoFactorSecret = null;

       return res.status(200).json(user)

    } catch (error) {
        res.status(500).json({error : `Internal Server Error in updateUser ${error}`})
    }
}  


export const getAllFollowingUsers = async (req, res) => {
    try {
        const currentUserId = req.user._id;

        const user = await User.findById(currentUserId).populate({
            path: "following",
            select: "-password -twoFactorSecret",
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user.following);

    } catch (error) {
        res.status(500).json({
            error: `Internal Server Error in getAllFollowingUsers ${error}`
        });
    }
};