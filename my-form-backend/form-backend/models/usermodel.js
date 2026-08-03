import mongoose from "mongoose";


const UserSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
    },
    fullName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minLength : 6
    },
    followers : [
        {
            type : mongoose.Schema.Types.ObjectId,   //Store a MongoDB document ID.
            ref : "User",
            default : []  // default value
        }
    ],
        following : [
        {
            type : mongoose.Schema.Types.ObjectId,   //Store a MongoDB document ID.
            ref : "User",
            default : []
        }
    ],
    profileImg : {
        type : String,
        default : "",
    },
        coverImg : {
        type : String,
        default : "",
    },
    bio : {
        type : String,
        default : "",
    },
    link : {
        type : String,
        default : "",
    },
    likedPosts : [  // posts id
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Post",
                default : []
            }
        ],
    twoFactorSecret : {
        type : String,
        default : null,
        required : false    // allows null
    },
    twoFactorEnabled : {
        type : Boolean,
        default : false
    }
}, {timestamps : true},);

const User = mongoose.model("User", UserSchema);

export default User;

//timestamp used to give created date and modified date
// user is collection name




