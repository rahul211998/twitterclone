import Notification from "../models/notificationmodel.js"

export const getNotifications = async (req, res) => {
    try {
        const userId = req.user._id;

        const notification = await Notification.find({to : userId}).populate({path : "from",select : "username profileImg"});

        await Notification.updateMany({to : userId}, { $set : {read : true}})

        res.status(200).json(notification)
        

    } catch (error) {
        res.status(500).json({error : "internal server error"})
    }
}

export const deleteNotifications = async (req, res) => {
    try {
        const userId = req.user._id;

        await Notification.deleteMany({to : userId})

        res.status(200).json({message : "Notifications deleted successfully"})
    } catch (error) {
        res.status(500).json({error : "internal server error"})
    }
}