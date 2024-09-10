import ticketModel from "../models/ticket.model.js";

class TicketManager {

    async addTicket(amount, purchaser) {
        try {
            let result = await ticketModel.create({ amount, purchaser })
            return result;
        } catch (error) {
            console.log(error);
        }
    }
}
export default TicketManager;