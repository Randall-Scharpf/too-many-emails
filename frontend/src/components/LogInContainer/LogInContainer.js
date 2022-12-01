import React, { Component } from "react";
import Login2 from "../Login2/Login";
import Signup from "../Signup/Signup";
import "./LogInContainer.css";


class LogInContainer extends Component {
  /**
   * props: {
   *    setUser: (user: string) => void
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

  render() {
    return (
      <div className="login-signup-container" ref={this.state.loginContainerRef}>
        <Login2 setUser={(user) => this.setUser(user)} />
        <div className="side-div">
          <button type="button" onClick={() => this.handleClick()}>
            {" "}
            {this.state.login ? "Signup" : "Login"}
          </button>
        </div>
        <Signup />
      </div>
    );
  }
}

export default LogInContainer;
