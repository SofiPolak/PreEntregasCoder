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

    async getUserById(id) {

        try {
            let result = await userModel.findOne({ _id: id });
            return result;
        } catch (error) {
            console.log(error);
        }

    }

    async getUsers() {
        try {
            let users = await userModel.find()
            return users;
        } catch (error) {
            console.log(error)
        }
    }
}
export default UserManager;