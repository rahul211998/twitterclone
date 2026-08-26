import mongoose from "mongoose";

const groupMessageSchema  = new mongoose.Schema({
    groupId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Group",
        required: true,
    },

    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    message: {
      type: String,
      required: true,
    },
}, { timestamps: true })

const GroupMessageModel = mongoose.model("groupmessages", groupMessageSchema)

export default GroupMessageModel;