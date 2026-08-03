import User from "../models/usermodel.js";
import cloudinary from "cloudinary";
import Post from "../models/postmodel.js";

export const createPost = async (req , res) => {
    try {
        const {text} = req.body;
        let {img} = req.body;

        const userId = req.user._id;

        const user = await User.findOne({_id : userId})

        if(!user){
            return res.status(400).json({error : "user not found createPost"})
        }

        if(!text && !img){
            return res.status(400).json({error : "post must have text or image"})
        }

        if(img) {
            const uploadedResponse = await cloudinary.uploader.upload(img);
            console.log("uploadedResponse",uploadedResponse)
            img = uploadedResponse.secure_url;
            // console.log("image is cloudinary",uploadedResponse)
        }

        const newPost = new Post({
            user : userId,
            text,
            img
        })

        await newPost.save();

        res.status(200).json(newPost)
    } catch (error) {
        res.status(500).json({error : "internal server error in createPost"})
    }
}

export const deletePost = async (req, res) => {
    try {
        const {id} = req.params;

        if(!id){
            return res.status(400).json({error : "no id found to delete this post"})
        }

        const post = await Post.findOne({_id : id});

        if(!post){
            return res.status(404).json({error : "no post found"})
        }

        if(post.user.toString() !== req.user._id.toString()){
            return res.status(401).json({error : "you are not autherized to delete this post"})
        }

        if(post.img){
            const imgId = post.img.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(imgId);
        }


        const deletedDocument  = await Post.findByIdAndDelete({_id : id});

        if(!deletedDocument){
            return res.status(400).json({error : "no doc found with that id"})
        }

        res.status(200).json({message : "post deleted successfully", deletedPost : deletedDocument})


    } catch (error) {
        res.status(500).json({error : "internal server error in deletePost"})
    }
}

export const createComment = async (req, res) => {
    try {
        const {text} = req.body;
        const postId = req.params.id;
        const userId = req.user._id;

        if(!text){
            return res.status(404).json({error : "no text found"})
        }

        const post = await Post.findById({_id : postId})

        if(!post){
            return res.status(404).json({error : "no post found"})
        }

        const comment = {
            user : userId,
            text
        }

        post.comments.push(comment);
        await post.save();

        res.status(200).json({message : post})
        
    } catch (error) {
        res.status(500).json({error : "internal server error in createComment"})
    }
}

export const deleteComment = async (req, res) => {
    try {

        const {commentId} = req.body;
        const postId = req.params.id;
        const userId = req.user._id;

        // console.log(`postId ${postId} , commentId ${commentId}`);

        if(!postId || !commentId){
            return res.json({error : "no postId or commentId found"})
        }

        const post = await Post.findById({_id : postId});

        const comment = post.comments.id(commentId);

        if(!comment){
            return res.status(404).json({
                error: "Comment not found"
            });
        }

        if (comment.user.toString() !== userId.toString()) {
    return res.status(403).json({
        error: "You can only delete your own comment"
    });
}

        await Post.findByIdAndUpdate({_id : postId}, {$pull : {
            comments : {
                _id : commentId
            }
        }});

        res.status(200).json({deletedComment : "comment deleted", comment})
    } catch (error) {
        res.status(500).json({error : "internal server error in deleteComment"})
    }

        //     if(post.user.toString() !== req.user._id.toString()){
        //     return res.status(401).json({error : "you are not autherized to delete this post"})
        // }

                // if(post.user.toString() !== userId.toString()){  // 6a646110dbccb71958c4e624 !== 6a646110dbccb71958c4e688
        //    return res.json({Autherror : "you can't delete this post comment bcos You are not the user who posted this picture"})
        // }
}

export const likeUnlikePost = async (req ,res) => {

    try {
    const postId = req.params.id;  //e25
    const userId = req.user._id;   // current user

    const post = await Post.findById({_id : postId});

    if(!post){
        return res.status(404).json({error : "no post found"})
    }

    const userLikedPost = post.likes.includes(userId);

    if(userLikedPost){
        //unlike post
        await Post.updateOne({_id : postId}, {$pull : {likes : userId}});

        await User.updateOne({_id : userId}, {$pull : {likedPosts : postId}})
        return res.status(200).json({message : "post unliked successfully", liked : false})
    }
    else{
        //like post
        await Post.updateOne({_id : postId}, {$push : {likes : userId}})
        await User.updateOne({_id : userId}, {$push : {likedPosts : postId}})
        //or
        // post.likes.push(userId);
        // await post.save();
    }

    res.status(200).json({message : "post liked successfully", liked: true})
    } catch (error) {
        res.status(500).json({error : "internal server error in likeUnlikePost"})
    }

}

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({createdAt : -1}).populate("user", "-password").populate({
            path : "comments.user",
            select : ["-password", "-email", "-followers", "-following", "-bio", "-link" , "-twoFactorSecret", "-twoFactorEnabled"]
        });

        if(posts.length === 0){
            return res.status(200).json([])
        } 

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({error : "internal server error in getAllPosts"})
    }
}

export const getLikedPosts = async (req, res) => {
    try {
        const userId = req.params.id;  //6a27cacd5fb85dbf15240c74
        const user = await User.findOne({_id : userId}).select("-password");

        if(!user){
            return res.status(404).json({error : "no user found"})
        }

        const likedPosts = await Post.find({_id : {$in : user.likedPosts}}).populate({path : 'user',
            select : "-password"
        }).populate({
            path : "comments.user",
            select : ["-password", "-email", "-followers", "-following", "-bio", "-link" , "-twoFactorSecret", "-twoFactorEnabled"]
        })



         res.status(200).json(likedPosts);

    } catch (error) {
        res.status(500).json({error : "internal server error in getLikedPosts"})
    }
}


// post.find({_id : {$in : user.likedpost}}).populate({path : 'user' , select : ""})

export const getFollowingPosts = async (req, res) => {
    try {
        const userId = req.user._id;
        
        const user = await User.findOne({_id : userId})

        if(!user){
          return res.status(404).json({error : "no user found"})
        }

        const feedFollowingPost = Post.find({user : {$in : user.following}}).sort({createdAt : -1}).populate({
            path : "user",
            select : "-password"
        }).populate({
            path : "comments.user",
            select : "-password"
        });

        res.status(200).json(feedFollowingPost)
    } catch (error) {
        res.status(500).json({error : "internal server error in getFollowingPosts"})
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const {username} = req.params;
        // const userId = req.user._id;

        const user = await User.findOne({username});

        if(!user){
            return res.status(404).json({error : "no user found"});
        }

        const posts = await Post.find({user : user._id}).sort({createdAt : -1}).populate({path : "user", select : "password"}).populate({path : "comments.user",select : "-password"})
        
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({error : "internal server error in getUserPosts"})
    }
}