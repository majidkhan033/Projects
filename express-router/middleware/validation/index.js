import { body, validationResult } from "express-validator";

function loginValidation() {
    return [
        body('email', "Email Is Required").isEmail(),
        body('password', "Passowrd is Required").notEmpty()
    ]
}

function registerValidation() {
    return [
        body('firstname', "First Name is Required").notEmpty().isLength({max: 200}),
        body('lastname', "Lastname is Required").notEmpty().isLength({max: 200}),
        body('email', "Email is Invalid").isEmail(),
        body('password', "Password should be Min 8 Characters, Atleast 1 Uppercase Character, 1 Lowercase Character, Special Symbol, Number").isStrongPassword(),
        body('password2').custom(
            (value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("Password & Confirm password do not match")
                } else {
                    return true;
                }
            }
        ),
        body('phone', 'Mobile Phone is Invalid').isMobilePhone(),
    ]
}
function errorMiddleware(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    return next();
}

export { loginValidation, registerValidation, errorMiddleware }