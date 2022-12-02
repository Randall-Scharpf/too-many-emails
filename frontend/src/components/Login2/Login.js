import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { postToServer } from '../../helper';
import "./Login.css";


class Login extends Component {
  /**
   * props: {
   *    setUser: (user: string) => void
   * }
   */
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      password: "",
    };
  }

  /**
   * Update all necessary props/state as part of a successful login.
   */
  loginUser() {
    this.props.setUser(this.state.user);
    this.props.history.push("/"); // don't show up at /mail lol
  }

  checkInput(event) {
    event.preventDefault();

    postToServer('/login-user', {
      email: this.state.user,
      pw: this.state.password
    },
      data => {
        if (data.code === 200) {
          this.loginUser();
        }

        // Determine what kind of 400 it is
        else if (data.code === 400) {
          // Honestly just let the user pass anyway lol
          if (data.token === "Already logged in!") {
            this.loginUser();
          }
          else if (data.token === "Email/Password combination invalid!") {
            alert("Your email and/or password is incorrect!");
          }
          // Just in case
          else {
            alert(`An unexpected error occurred: ${JSON.stringify(data)}`);
          }
        }
      });

  }
  render() {
    return (
      <div className="Login">
        <h1>Login</h1>
        <form onSubmit={(event) => this.checkInput(event)}>
          <input type={"email"} placeholder={"Email"} onChange={(e) => this.setState({ user: e.target.value })} />
          <input type={"password"} placeholder={"Password"} onChange={(e) => this.setState({ password: e.target.value })} />
          <button type={"submit"}>Login</button>
        </form>
      </div>
    )
  }
}

export default withRouter(Login);
