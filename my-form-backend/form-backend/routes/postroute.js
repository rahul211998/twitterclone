import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {createPost, deletePost, createComment, deleteComment, likeUnlikePost, getAllPosts, getLikedPosts, getFollowingPosts,
    getUserPosts
} from "../controllers/postcontroller.js"

const router = express.Router();


router.get("/allPosts", protectRoute, getAllPosts)
router.get("/allFollowingPosts", protectRoute, getFollowingPosts)
router.get("/likes/:id", protectRoute, getLikedPosts);
router.get("/user/:username", protectRoute, getUserPosts);
router.post("/create", protectRoute, createPost)
router.post("/like/:id", protectRoute, likeUnlikePost)
router.post("/comment/:id", protectRoute, createComment)
router.post("/deleteComment/:id", protectRoute, deleteComment)
router.delete("/delete/:id", protectRoute, deletePost)

export default router;