import mongoose from "mongoose";

const UserCartSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },

        productName : {
        type : String,
        required : true
    },

        quantity : {
        type : Number,
        default : 1
    },

        price : {
        type : Number,
        required : true
    },

        productImage : {
        type : String,
        default : ""
    }
}, {timestamps  : true});

const UserCart = mongoose.model("UserCart", UserCartSchema);

export default UserCart;



    // userId : {
    //     type : mongoose.Schema.Types.ObjectId,
    //     required : true,
    //     unique : true
    // },