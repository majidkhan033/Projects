import { useState } from "react";

function Search() {
    const [username, setUsername] = useState("");
    const onChangeHandler = (e) => {
        setUsername(e.target.value)
    }
return (
    <>
    <div className="header">
        <i className="fa-brands fa-square-github fa-3x"></i>
        <h1>GitHub Search Engine</h1>

        <form>
            <input typr="text" name="username" onChange={onChangeHandler} value = {username} placeholder="Search Users" />
        </form>
        <div style={{ marginTop:"2%"}}>
            <button>Submit</button>
            <button>Clear</button>
        </div>
    </div>
    </>
)
}

export default Search;