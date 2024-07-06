import mongoose from "mongoose";
//import mongoosePaginate from 'mongoose-paginate-v2';

const userCollection = "users";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    age: Number,
    password: String,
    role: { type: String, default: 'user' },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts"
    }

});

//userSchema.plugin(mongoosePaginate);
const userModel = mongoose.model(userCollection, userSchema);

export default userModel
