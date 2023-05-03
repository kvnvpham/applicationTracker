import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
    company: String,
    position: String,
    link: String,
    description: String,
});

const Form = mongoose.model("Form", formSchema);

export { Form };

const userSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        unique: true,
    },
    password: String,
    data: [formSchema],
});

const User = mongoose.model("User", userSchema);

export default User;
