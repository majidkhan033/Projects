import express from "express";
import fs from "fs/promises";
import config from "config";

//Import Middlewares
import { loginValidation, registerValidation, errorMiddleware } from "../../middleware/validation/index.js"
import generateToken from "../../middleware/auth/generateToken.js";
import { randomString, sendEmail, sendSMS } from "../../utils/index.js";

//Import bcrypt for hashing
import bcrypt from "bcrypt";
import userModel from "../../model.js";

const router = express.Router();

/*
METHOD : POST
PUBLIC
API Endpoint : /api/signup
Body : 
email
password 
*/

router.post("/signup", registerValidation(), errorMiddleware, async (req, res) => {
    try {
        let { email, phone } = req.body;
        //console.log(req.body)

        const mailFound = await userModel.findOne({ email });
        if (mailFound) {
            return res.status(400).json({ error: "email already registered" });
        }

        const phoneFound = await userModel.findOne({ phone });
        if (phoneFound){
            return res.status(400).json({error: "phone already registered "});
        }
        req.body.password = await bcrypt.hash(req.body.password, 12);

        let userData = new userModel(req.body);
        console.log(userData);
        await userData.save();
        res.status(200).json({ success : "User Signed Up Successfully" });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": "Interval Server Error" });

    }
})


/*
METHOD : POST
PUBLIC
API Endpoint : /api/login
Body : 
email
password 
*/

router.post("/login", loginValidation(), errorMiddleware, async (req, res) => {
    try {
        let login_user = new userModel(req.body)
        let { email, password } = req.body;

        let userFound = await userModel.findOne({ email });
        if (!userFound) {
            return res.status(401).json({ "error": "Invalid Credentials " });
        }
        // console.log(userFound);
        let matchPassword = await bcrypt.compare(req.body.password, userFound.password)
        // console.log(matchPassword);
        if (!matchPassword) {
            return res.status(401).json({ "error": "Invalid Credentials, Password do not match" });
        }

        let payload = {
            user_id: userFound.user_id,
            role: "user"
        }

        // let privatekey = "codeforindia";    

        //GENERATE A TOKEN
        const token = generateToken(payload);
        // console.log(token);

        res.status(200).json({ success: "Login is Successful", token })


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" })
    }
})


router.get("/", (req, res) => {
    try {
        res.status(200).json({ "success": "Router GET is UP" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": "Interval Server Error" });

    }
})


export default router;