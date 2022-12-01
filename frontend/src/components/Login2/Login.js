import React, { Component } from 'react'
import { postToServer } from '../../helper';
import "./Login.css";



class Login extends Component {
  constructor({ setUser }) {
    super();
    this.props = { setUser };
    this.state = {
      user: "",
      password: "",
    };
  }

  checkInput(event) {
    event.preventDefault();

    postToServer('/login-user', {
      email: this.state.user,
      pw: this.state.password
    },
      data => {
        if (data.code === 200) {
          this.props.setUser(this.state.user);
        } else {
          alert(JSON.stringify(data));
        }
      })

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
