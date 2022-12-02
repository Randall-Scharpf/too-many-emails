import React, { Component } from "react";
import { postToServer } from "../../helper";
import Login2 from "../Login2/Login";
import Signup from "../Signup/Signup";
import "./LogInContainer.css";


class LogInContainer extends Component {
  /**
   * props: {
   *    setUser: (user: string) => void,
   *    setToken: (token: string) => void
   * }
   */
  constructor(props) {
    super(props);
    this.state = {
      login: true,
      loginContainerRef: React.createRef()
    }
  }

  handleClick() {
    this.setState({ login: !this.state.login });
    // Not sure what this is for but apparently it does the animation thing
    this.state.loginContainerRef.current.classList.toggle("active");
  }

  // Using hella alert()s but honestly there's no time for fancy flash
  // notifications and such at this point so eh.
  registerUser(email, pw) {
    postToServer("/create-user", { email, pw }, data => {
      // User registered: go back to login mode
      if (data.code === 200) {
        this.setState({ login: true });
        // Not sure what this is for but apparently it does the animation thing
        this.state.loginContainerRef.current.classList.toggle("active");
        alert(`Successfully created your new user ${email}!`);
      }

      // Email is already taken by another user
      else if (data.code === 400) {
        alert(`Another user is already registered with ${email}!`);
      }

      // No other error has been defined but who knows
      else {
        alert(`An unexpected error occurred: ${JSON.stringify(data)}`);
      }
    });
  }

  render() {
    return (
      <div className="login-signup-container" ref={this.state.loginContainerRef}>
        <Login2 setUser={(user) => this.props.setUser(user)}
          setToken={(token) => this.props.setToken(token)} />
        <div className="side-div">
          <button type="button" onClick={() => this.handleClick()}>
            {" "}
            {this.state.login ? "Signup" : "Login"}
          </button>
        </div>
        <Signup registerUser={(email, pw) => this.registerUser(email, pw)} />
      </div>
    );
  }
}

export default LogInContainer;
