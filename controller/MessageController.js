import Conversation from "../model/Conversation.js";
import Message from "../model/Message.js";

export const sendMessage = async (req, res) => {
    try {
        console.log(req.id)
        const senderId = req.id;
        const receiverId = req.params.id;
        const message = req.body.message;

        if (!senderId || !receiverId) {
            return res.status(400).json({
                success: false,
                message: "Invalid sender or receiver ID",
            });
        }

        let getConversation = await Conversation.findOne({ participants: { $all: [senderId, receiverId] } });
        if (!getConversation) {
            getConversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }
        const newMessage = await Message.create({
            senderId, receiverId, message
        })
        if (newMessage) {
            getConversation.messages.push(newMessage._id);
        }
        await getConversation.save();
        return res.status(201).json({
            success: true,
            message: "message sent successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

export const getMessage = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.id;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages")
        console.log(conversation)
        return res.status(200).json({ success: true, conversation: conversation?.messages })
    } catch (error) {
        console.log(error)
    }
}