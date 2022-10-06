import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import NavBar from "./Navbar";

function Register({ alert, showAlert }) {

    const [userData, setUserData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        password2: ""
    })
    const { firstname, lastname, email, password, password2 } = userData;
    const onChangeHandler = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }
    const onSubmitHandler = async (e) => {
        try {
            //Prevents from refreshing the form
            e.preventDefault();
            console.log(userData);
            let res = await axios.post("/api/user/register", userData);
            console.log(res.data);
            showAlert({
                type: "success",
                msg: res.data.success
            })
        } catch (error) {

            if (error.response.data.errors) {
                // Handling Express Validators
                let errorString = "";
                error.response.data.errors.forEach((ele) => {
                    errorString += ele.msg
                })
                showAlert({
                    type: "error",
                    msg: errorString
                })
            } else {
                //Custom Errors
                showAlert({
                    type: "error",
                    msg: error.response.data.error
                })
            }
            console.log("catch");
            console.log(error.response.data.error);
        }
    }
    return (
        <>
            <Header content={"User Register"} />
            <div>
                <center>
                    <img id="image1" src={"https://www.freeiconspng.com/uploads/book-stack-png-16.png"} height="150px" />
                </center>
            </div>
            {alert !== null && <h3 className={`alert-${alert.type}`}>{alert.msg}</h3>}
            {/* <h2 className="alert-success" > This is Error Component</h2> */}
            <div className="form">
                <form onSubmit={onSubmitHandler}>
                    <input type="text" id="firstname" name="firstname" placeholder="First Name" value={firstname} onChange={onChangeHandler} />
                    <input type="text" id="lastname" name="lastname" placeholder="Last Name" value={lastname} onChange={onChangeHandler} /><br />
                    <input type="email" id="email" name="email" placeholder="Email" value={email} onChange={onChangeHandler} /><br />
                    <input type="password" id="password" name="password" placeholder="Password" value={password} onChange={onChangeHandler} /><br />
                    <input type="password" id="password2" name="password2" placeholder="Password2" value={password2} onChange={onChangeHandler} /><br />
                    <input type="submit" value="Submit"></input>
                </form>
                <p>Already have an Account? <b><Link to = "/Login">Login</Link></b></p>
            </div>

        </>
    )
}
export default Register;
