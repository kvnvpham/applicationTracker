import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import session from "express-session";
import mongoose from "mongoose";
import User, { Item } from "./models.js";
import passport from "passport";
import passportConfig from "./passportConfig.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

mongoose
    .connect("mongodb://0.0.0.0:27017/applicationUsers")
    .then(() => console.log("Mongoose Is Connected"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(cookieParser(process.env.SECRET));
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

app.post("/register", async (req, res) => {
    const foundUser = await User.findOne({ username: req.body.username });
    if (foundUser) {
        return res.send("User Already Exists.");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        password: hashedPassword,
    });

    try {
        const result = await newUser.save();
        passport.authenticate("local")(req, res, () => {
            return res.send("Register Success.");
        });
    } catch (e) {
        console.log(e);
    }
});

app.post("/login", (req, res) => {
    passport.authenticate("local")(req, res, () => {
        res.send("Login Success.");
    });
});

app.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
    });
    res.send("Logout Success.");
});

app.get("/get-user", (req, res) => {
    res.send(req.user);
});

app.get("/get-user-data", (req, res) => {
    User.findById(req.user.id).then((foundUser) => {
        if (!foundUser) {
            return res.send(null);
        }
        res.send(foundUser);
    });
});

app.post("/add-data", async (req, res) => {
    const newItem = new Item({
        company: req.body.companyName,
        position: req.body.position,
        link: req.body.link,
        description: req.body.description,
    });

    try {
        const result = await newItem.save();
        console.log(result);
    } catch (e) {
        console.log(err);
    }

    try {
        const result = await User.findByIdAndUpdate(req.user.id, {
            $push: { data: newItem },
        });
        console.log(result);
        return res.send("Added Item Successfully.");
    } catch (e) {
        console.log(err);
    }
});

app.post("/delete-item", async (req, res) => {
    const itemId = req.body.itemId;

    try {
        const selectItem = await Item.findByIdAndDelete(itemId);
        console.log(selectItem);
    } catch (e) {
        console.log(e);
    }

    try {
        const result = await User.findByIdAndUpdate(req.user.id, {
            $pull: { data: { _id: itemId } },
        });
        console.log(result);
        return res.send("Deleted Item Successfully");
    } catch (e) {
        console.log(e);
    }
});

app.listen(3000, () => console.log("Server Started"));
