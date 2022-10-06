import { Link } from "react-router-dom";
 
function NavBar() {
    return (
        <div className="menu">
            <Link to ="/">Home</Link>
            <Link to = "/Register">Register</Link>
            <Link to = "/Login">Login</Link>
            <Link to = "#">Dummy</Link>
        </div>
    )
}

export default NavBar;