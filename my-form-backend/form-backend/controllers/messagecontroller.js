import MessageModel from "../models/messagemodel.js";
import GroupModel from "../models/groupmodel.js";
import GroupMessageModel from "../models/groupmessagemodel.js";

export const getMessages = async (req, res) => {
  try {
    const myId = req.user._id;
    const otherUserId = req.params.id;

    const messages = await MessageModel.find({
      $or: [
        {
          senderId: myId,
          receiverId: otherUserId,
        },
        {
          senderId: otherUserId,
          receiverId: myId,
        },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const createGroup = async (req, res) => {
  try {
    const { groupName, members } = req.body;

    if (!groupName || !members || members.length === 0) {
      return res.status(400).json({
        errormessage: "Group name or members are missing"
      });
    }

    const currentUser = req.user._id;

    if (!currentUser) {
      return res.status(401).json({
        errormessage: "No current user found from protected route"
      });
    }

    const group = new GroupModel({
      groupName,
      members: [currentUser, ...members],
      admin: currentUser
    });

    await group.save();

    res.status(201).json({
      successMessage: `${group.groupName} group created successfully`,
      groupDatas: group
    });

  } catch (error) {
    console.log("createGroup error", error);

    res.status(500).json({
      errormessage: "Internal server error in createGroup function",
      error
    });
  }
};

export const getMyGroups = async (req, res) => {
  try {
    const currentUser = req.user._id;

    const chatgroups = await GroupModel.find({
      members : currentUser
    }).populate("members");

    res.status(200).json({chatgroups})

    
  } catch (error) {
        console.log("getMyGroups error", error);

    res.status(500).json({
      errormessage: "Internal server error in getMyGroups"
    });
  }
}

export const getMyGroupMessages = async (req, res) => {
  try {
    const {groupId} = req.params;
    const grpChatMessages = await GroupMessageModel.find({groupId}).populate({path : "senderId", select : ["-password", "-twoFactorSecret", "-twoFactorEnabled"] });

    if(grpChatMessages.length === 0){
      res.status(200).json({grpChatMessages: []});
      return;
    }

    res.status(200).json({grpChatMessages})
  } catch (error) {
    console.log("getMyGroups error", error);

    res.status(500).json({
      errormessage: "Internal server error in getMyGroupChat"
    });
  }
}