import * as dotenv from "dotenv"
dotenv.config()
import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    return res.send("Now");
})

app.listen(process.env.PORT, () => console.log("Server Started"))