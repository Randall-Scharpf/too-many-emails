import React, { Component } from "react";
import "./App.css";
import EmailList from "./components/EmailList/EmailList";
import Header from "./components/Header/Header";
import LogInContainer from "./components/LogInContainer/LogInContainer";
import Navbar from "./components/Navbar/navbar";
import Sidebar from "./components/Sidebar/Sidebar";

const DUMMY_USER = "josie_bruin@ucla.edu"; // REMOVE LATER

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null, // CHANGE LATER
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
        {!this.state.user ? ( // REVERT TO this.state.user WHEN LOGIN WORKS
          <div>
            <Navbar />
            <LogInContainer setUser={(user) => this.setUser(user)} />
          </div>
        ) : (
          <div className="app">
            <Header />
            <div className="app-body">
              <Sidebar user={DUMMY_USER} setAddress={(address) => this.setAddress(address)} />
              <EmailList address={this.state.address} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
