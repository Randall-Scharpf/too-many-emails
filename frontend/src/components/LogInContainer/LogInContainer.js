import React from "react";
import {useState} from 'react' 
import {useRef} from 'react' 
import "./LogInContainer.css";
import Login2 from "../Login2/Login";
import Signup from "../Signup/Signup";

const LogInContainer = ({ setUser }) => {

//define state to check if login or signup is clicked, visible, or active
const [login, setLogin] = useState(true);

//creating reference for container 
const loginContainerRef = useRef(null);

const handleClick = () => {
    setLogin(!login);

//DOM Manipulation
loginContainerRef.current.classList.toggle("active");
}

return (
    <div className="login-signup-container" ref={loginContainerRef}>
        <Login2 setUser={setUser} /> 
        <div className = "side-div">
            <button type="button" onClick={handleClick}>
            {" "} 
            {login ? "Signup" : "Login"}
            </button>
        </div>
         <Signup /> 
    </div>
)

}

export default LogInContainer