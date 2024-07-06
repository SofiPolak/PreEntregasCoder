import mongoose from "mongoose";

const messageCollection = "Mensajes"

const messageSchema = new mongoose.Schema({
    user: { type: String, required: true, max: 100 },
    message: { type: String, required: true }
})

const messageModel = mongoose.model(messageCollection, messageSchema)

export default messageModel