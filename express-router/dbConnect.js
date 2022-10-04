import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect("");
        console.log("mongoDB is connected");
    } catch (error) {
        console.error(error);
    }
}