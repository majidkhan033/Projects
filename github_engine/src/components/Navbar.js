import {Link} from "react-router-dom";
function Navbar() {
    return (
            <div className="navbar">
                <i className="fa-brands fa-square-github fa-3x"></i>
                <Link to="/">Github Search Engine</Link>
                <Link to="/">Contact US</Link>
                <Link to="/">About Us</Link>
            </div>
    )
}

export default Navbar;