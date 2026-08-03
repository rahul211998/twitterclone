import express from "express";
import dotenv from "dotenv"
import authroute from "./routes/authroute.js"
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import userCartRoute from './routes/usercartroute.js';
import userroute from './routes/userroute.js'
import cloudinary from "cloudinary"
import postRoute from "./routes/postroute.js"
import notificationRoute from "./routes/notificationroute.js"
import messageRoute from "./routes/messageroute.js"
import {Server} from "socket.io"
import http from "http"
import MessageModel from "./models/messagemodel.js";
 
dotenv.config();

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET_KEY
})

const app = express();
const server = http.createServer(app)
const PORT = process.env.PORT;
// app.use(cookieParser())
// app.use(cors({
//     origin : "http://localhost:5173", // your React dev URL (Vite)
//     credentials: true,  // must be true to accept cookies
// })) 

const socketIo = new Server(server, {
    cors : {
        origin : "http://localhost:5173", // your React dev URL (Vite)
        credentials: true,  // must be true to accept cookies
    }
})

const onlineUsers = new Map()

const chatNameSpace = socketIo.of('/chat');  // "/chat" is namespace, channel established
chatNameSpace.on("connection", (socket) => {
    // console.log("User connected:", socket.id);
    socket.emit("connectionMessage","connected to socket from server");



    socket.on("join",(userId) => {
        onlineUsers.set(userId, socket.id)  // example : 100 (user id) => tstshshs (socketid)

        console.log("onlineUsers",onlineUsers);
    })


        socket.on("messagesFromBrowser",async (messageDatas) => {
            const {senderId, receiverId, text} = messageDatas;

            // console.log("messageDatas from server", messageDatas)

            const messageModel = new MessageModel({
                senderId,
                receiverId,
                text
            });

            const receiverSocketId = onlineUsers.get(receiverId);

            

            if(receiverSocketId){
                messageModel.seen = true;
                await messageModel.save();
                // console.log("Emitting newMessage one"); 
                chatNameSpace.to(receiverSocketId).emit("newMessage", messageModel)
            }
            else{
                await messageModel.save();
            }
        
    })
})



// if u wnat to send message to all then use channnel name chatNameSpace.emit()
// when some one who connects to this channel chatNameSpace , they see the messages .
// for one person socket.emit()

console.log(typeof express());

app.use(cookieParser())
app.use(cors({
    origin : "http://localhost:5173", // your React dev URL (Vite)
    credentials: true,  // must be true to accept cookies
})) 

app.use(express.json());

app.use("/api/auth",authroute)  
app.use("/api/cart/",userCartRoute)
app.use("/api/users/",userroute)
app.use("/api/posts", postRoute)
app.use("/api/notifications", notificationRoute)
app.use("/api/messages", messageRoute)

// app.use()

server.listen(PORT, () => {
    console.log("server is running",PORT);
    connectDB();
})

// app.listen(PORT, () => {
//     console.log("server is running",PORT);
//     connectDB();
// })



// origin: "*"                              // anyone can call (public API)
// origin: "https://myapp.com"              // only one specific frontend
// origin: ["https://myapp.com", "https://admin.myapp.com"]  // a list of allowed frontends
// origin: true   