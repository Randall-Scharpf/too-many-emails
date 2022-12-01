import React, { Component } from 'react'
import "./Login.css";



class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      password: "",
    };
  }

  checkInput(event) {
    event.preventDefault();

    alert(this.state.user);
    alert(this.state.password);

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

export default Login
