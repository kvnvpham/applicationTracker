import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    company: String,
    position: String,
    link: String,
    description: String,
});

const Item = mongoose.model("Item", itemSchema);

export { Item };

const userSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        unique: true,
    },
    password: String,
    data: [itemSchema],
});

const User = mongoose.model("User", userSchema);

export default User;
