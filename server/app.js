import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import session from "express-session";
import mongoose from "mongoose";
import User from "./models.js";
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

app.post("/register", (req, res) => {
    User.findOne({ username: req.body.username })
        .then(async (user) => {
            if (user) {
                res.send("User Already Exists.");
            } else {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);

                const newUser = new User({
                    name: req.body.name,
                    username: req.body.username,
                    password: hashedPassword,
                });
                await newUser
                    .save()
                    .then(() => res.send("Account Created Successfully.")) // Login User and send authentication instead of sending string
                    .catch((err) => console.log(err));
            }
        })
        .catch((err) => console.log(err));
});

app.post("/login", (req, res) => {
    passport.authenticate("local")(req, res, () => {
        console.log(req.user);
        res.send("Success.");
    });
});

app.get("/logout", (req, res) => {
    // Logout
});

app.get("/getUser", (req, res) => {
    res.send(req.user);
});

app.listen(3000, () => console.log("Server Started"));
