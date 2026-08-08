import MessageModel from "../models/messagemodel.js";

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