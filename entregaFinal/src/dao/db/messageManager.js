import messageModel from "../models/message.model.js";

class MessageManager {

    async addMessage(user, message) {
        try {
            let result = await messageModel.create({ user, message })
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async getMessageById(idBuscado) {
        try {
            let result = await messageModel.findOne(idBuscado);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async checkMessages() {
        try {
            let messages = await messageModel.find()
            return messages;
        } catch (error) {
            console.log(error)
        }
    }


    async updateMessage(id, messageUpdate) {
        try {
            let result = await messageModel.updateOne({ _id: id }, messageUpdate);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteMessage(id) {
        try {
            let result = await messageModel.deleteOne({ _id: id });
            return result;
        } catch (error) {
            console.log(error);
        }
    }

}

export default MessageManager;