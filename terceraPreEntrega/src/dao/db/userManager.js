import userModel from "../models/users.model.js";

class UserManager {

    async getUserByCart(cid) {
        try {
            let result = await userModel.findOne({ cart: cid })
            return result;
        } catch (error) {
            console.log(error);
        }
    }
}
export default UserManager;