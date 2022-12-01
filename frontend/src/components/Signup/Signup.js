import React, { Component } from 'react';
import "./Signup.css";


class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      password: "",
      passwordc: ""
    };

  }

  checkInput(event) {
    event.preventDefault();
    if (this.state.password !== this.state.passwordc) {
      alert("passwords dont match!"); // TEMP: TODO
    }
    // Register the user
    else {
      alert(`TODO: register user ${this.state.user}`);
    }

  }

  render() {
    return (<div className="Signup">
      <h1>Sign Up</h1>
      <form onSubmit={(event) => this.checkInput(event)}>
        <input type={"email"} placeholder={"Email"} onChange={(e) => this.setState({ user: e.target.value })} />
        <input type={"password"} placeholder={"Password"} onChange={(e) => this.setState({ password: e.target.value })} />
        <input type={"password"} placeholder={"Confirm Password"} onChange={(e) => this.setState({ passwordc: e.target.value })} />
        <button type={"submit"}>Submit</button>
      </form>
    </div>);
  }
}

export default Signup;
