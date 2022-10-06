import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "config";

import randomString from "../../utils/randomString.js";

//IMPORT Models
import Users from "../../models/Users/index.js";
import Admin from "../../models/Admin/index.js";
import Book from "../../seeds/books.js"

//IMport Validations
import { loginValidation, userRegisterValidatorRules, errorMiddleware } from "../../middlewares/validation/index.js";

//Import generate token
import generateToken from "../../middlewares/auth/generateToken.js";
import authMiddleware from "../../middlewares/auth/verifyToken.js";
import book from "../../models/book/index.js";

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

router.post("/login", loginValidation(), errorMiddleware, async (req, res) => {
    try {
        let { email, password } = req.body;
        // console.log(req.body);

        let userFound = await Admin.findOne({ email });
        if (!userFound) {
            userFound = await Users.findOne({ email });
            if (!userFound) {
                return res.status(401).json({ "error": "Invalid Credentials "});
            }
        }

        // let userFound = await Users.findOne({ email })
        // if (!userFound) {
        //     return res.status(401).json({ "error": "Invalid Credentials" });
        // }
        // // console.log(userFound);
        // userFound = await Admin.findOne({ email });
        // if (!userFound) {
        //     return res.status(401).json({ "error": "Invalid Credentials" });
        // }

        let matchPassword = await bcrypt.compare(password, userFound.password)
        console.log(matchPassword);
        if (!matchPassword) {
            return res.status(401).json({ "error": "Invalid Credentials " });
        }

        let payload = {
            _id: userFound._id,
            role: userFound.role
        }

        let privatekey = config.get("PRIVATE_KEY");

        //GENERATE A TOKEN
        const token = generateToken(payload);
        // console.log(token);

        res.status(200).json({ success: "Login is Successful", token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" })
    }
})

/*
End Point : /api/auth
Method GET
Access : Public
 Description: Authorize the User
*/

router.get("/auth", async (req, res) => {
    try {
        let token = req.headers["auth-token"];
        if(!token) {
            return res.status(401).json({ error: "Unauthorised Access"})
        }
        let privatekey = config.get("PRIVATE_KEY");
        let payload = jwt.verify(token, privatekey);
        res.status(200).json({ success: "Aunthentication successful.", payload });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error"})
    }
})

/*
End Point : /api/books
Method GET
Access : Public
 Description: Authorize the User
*/

router.get("/books", async (req, res) => {
    try {
        let Books = await Book.find();
        res.status(200).json({ success: "Books found", Books })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

export default router;