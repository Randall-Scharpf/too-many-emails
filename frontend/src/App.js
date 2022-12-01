import React, { Component } from "react";
import "./App.css";
import EmailList from "./components/EmailList/EmailList";
import Header from "./components/Header/Header";
import LogInContainer from "./components/LogInContainer/LogInContainer";
import Navbar from "./components/Navbar/navbar";
import Sidebar from "./components/Sidebar/Sidebar";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      address: null
    };
  }

  setAddress(address) {
    this.setState({ address });
  }

  setUser(user) {
    this.setState({ user });
  }

  render() {
    return (
      <div className="root">
        {!this.state.user ? (
          <div>
            <Navbar />
            <LogInContainer setUser={(user) => this.setUser(user)} />
          </div>
        ) : (
          <div className="app">
            <Header />
            <div className="app-body">
              <Sidebar user={this.state.user} setAddress={(address) => this.setAddress(address)} />
              <EmailList address={this.state.address} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
