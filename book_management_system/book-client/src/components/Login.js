import Header from "./Header";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login({ alert, showAlert }) {
    let navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })

    const { email, password } = userData;

    const onChangeHandler = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        if (localStorage.getItem("token")){
            if (JSON.parse(localStorage.getItem("token").role == "admin")){
                navigate("/admin");
            } else {
                navigate("/user");
            }
        }
    },[])
    const onSubmitHandler = async (e) => {
        try {
            //Prevents from refreshing the form
            e.preventDefault();
            // console.log(userData);
            let res = await axios.post("/api/login", userData);
            // console.log(res.data);
            localStorage.setItem("token", JSON.stringify({ token: res.data.token, role : res.data.role }))
            if (res.data.role == "admin") {
                navigate("/admin");
            } else {
                navigate("/user");
            }
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
            // console.log("catch");
            console.log(error.response.data.error);
        }
    }
    return (
        <>
            <Header content={"User Login"} />
            <div>
                <center>
                    <img  src="https://www.freeiconspng.com/uploads/book-stack-png-16.png" alt = "login" height = "150px" />
                </center>
            </div>
            {alert !== null && <h3 className={`alert-${alert.type}`}>{alert.msg}</h3>}
            <div className="form">
                <form onSubmit={onSubmitHandler}>
                    <input type="email" id="email" name="email" placeholder="Email" value={email} onChange={onChangeHandler} /><br />
                    <input type="password" id="password" name="password" placeholder="Password" value={password} onChange={onChangeHandler} /><br />
                    <input type="submit" value="Submit"></input>
                </form>
                <p>Have an account? <b><Link to = "/Register">Register</Link></b></p>
            </div>
        </>
    )
}
export default Login;