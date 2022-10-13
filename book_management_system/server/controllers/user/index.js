import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "config";

import randomString from "../../utils/randomString.js";

//IMPORT Models
import Users from "../../models/Users/index.js";
import Admin from "../../models/Admin/index.js";

//IMport Validations
import { loginValidation, userRegisterValidatorRules, errorMiddleware, bookValidation } from "../../middlewares/validation/index.js";

//Import generate token
import generateToken from "../../middlewares/auth/generateToken.js";
import book from "../../models/book/index.js";
import authMiddleware from "../../middlewares/auth/verifyToken.js";

const router = express.Router();

/*
End Point : /api/user/register
Method POST
Access : Public
Validation : 
        Password must be 8 characters minimum length, 1 uppercase, 1 special character,1 lowercase is mandatory
        Email address is unique and required field
        Firstname length not more than 25 characters
        password & password2 should match, but save password field only.
 Description: User Signup

*/

router.post("/register", userRegisterValidatorRules(), errorMiddleware, async (req, res) => {

    try {

        let { firstname, lastname, email, password } = req.body;
        // console.log(req.body);
        //Avoid Double Registration

        let userData = await Users.findOne({ email });
        if (userData) {
            return res.status(409).json({ "error": "Email Already Registered" })
        }
        userData = await Admin.findOne({ email });
        if (userData) {
            return res.status(409).json({ "error" : "Email Already Registered"})
        }

        req.body.password = await bcrypt.hash(password, 12);
        console.log(req.body);

        const user = new Users(req.body);

        user.userverifytoken = randomString(15);
        await user.save();

        return res.status(200).json({ "success": "Register is UP" })

    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": "Internal Server Error" })
    }
})

router.post("/login", loginValidation(), errorMiddleware, async (req, res) => {
    try {
        let { email, password } = req.body;
        // console.log(req.body);

        // Users.userverifytoken = randomString(15);
        // await user.save();

        let userFound = await Users.findOne({ email })
        if (!userFound) {
            return res.status(401).json({ "error": "Invalid Credentials" });
        }
        console.log(userFound);

        let matchPassword = await bcrypt.compare(password, userFound.password)
        console.log(matchPassword);
        if (!matchPassword) {
            return res.status(401).json({ "error": "Invalid Credentials " });
        }

        let payload = {
            user_id: userFound.user_id,
            role: "user"
        }

        //let privatekey = "codeforindia";

        //GENERATE A TOKEN
        const token = generateToken(payload);
        // console.log(token);

        res.status(200).json({ success: "Login is Successful", token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" })
    }
})

router.post("/book",authMiddleware, bookValidation(), errorMiddleware, async (req, res) => {
    try {
        const payload = req.payload;
      // console.log(payload);
      if (!payload) {
          return res.status(401).json({ error: "Unauthorised Access" });
      }
        // let token = req.headers["auth-token"];
        // if (!token) {
        //     return res.status(401).json({ error: "Unauthorized Access" });
        // }
        // const payload = jwt.verify(token, "codeforindia");
        // // console.log(payload);
        // if (!payload) {
        //     return res.status(401).json({ error: "Unauthorized Access" });
        // }

        let {
            title,
            author,
            coverImageUrl,
            publisher,
            synopsis,
            pageCount,
            idNo
        } = req.body;

        // let userFound = await Users.findOne(payload.id)
        // console.log(userFound);

        const Books = new book(req.body);
        await Books.save();
        res.status(200).json({ success: "Book was Added" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.get("/book", async (req, res) => {
    try {
        let book_data = await book.find({});
        res.status(200).json({ success: "Book was added", book_data});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error "})
    }
})



export default router;