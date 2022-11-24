import React from "react";
import "./navbar.css";

const navbar = () => {
    return <nav>
        <a href="/">Meow</a>
        <div>
            <p>
                Welcome, <span>Guest</span>
            </p>
            <i className = "fa fa-user"></i>
        </div>
        </nav>;
};

export default navbar