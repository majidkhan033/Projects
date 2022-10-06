import mongoose from "mongoose";

let bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    Author: {
        type: String,
        required: true,
    },
    coverImagrUrl: {
        type: String,
        required: true,
    },
    publisher: {
        type: String,
        unique: true,
    },
    synopsis: {
        type: String,
        required: true
    },
    pageCount: {
        type: String,
        required: true,
    },
    idNo: {
        type: String,
        required: true,
        required : true
    },
});

export default mongoose.model("Book", bookSchema, "book");