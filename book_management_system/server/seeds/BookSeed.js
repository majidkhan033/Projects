import config from "config";
import mongoose from "mongoose";
import "../dbConnect.js";
import Books from "../seeds/books.js";

import BookSchema from "../models/book/index.js";


async function bookSeed(){
    try {
        // console.log(Books);
        await BookSchema.insertMany(Books);
        console.log("Books Seeded Successfully");
    } catch (error) {
        console.error(error);
    }
}
bookSeed();