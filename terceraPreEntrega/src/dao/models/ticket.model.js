import mongoose from "mongoose";

const ticketCollection = "Tickets"

const ticketSchema = new mongoose.Schema({
    //code: { type: String, auto: true, unique: true },
    purchase_datetime: { type: Date, default: Date.now },
    amount: { type: Number },
    purchaser: { type: String }
})

const ticketModel = mongoose.model(ticketCollection, ticketSchema)

export default ticketModel
