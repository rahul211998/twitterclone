import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },

    receiverId : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    text : {
        type : String,
        default : ""
    },

    image: {
      type: String,
      default: "",
    },

    seen: {
      type: Boolean,
      default: false,
    },
},{timestamps : true});

const MessageModel = mongoose.model("Message",messageSchema);

export default MessageModel;