import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import EmailList from "./components/EmailList/EmailList";
import Header from "./components/Header/Header";
import LogInContainer from "./components/LogInContainer/LogInContainer";
import Mail from "./components/Mail/Mail";
import Navbar from "./components/Navbar/navbar";
import Sidebar from "./components/Sidebar/Sidebar";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      address: null,
      mode: "inbox",
      selectedMail: null
    };
  }

  setAddress(address) {
    this.setState({ address });
  }

  setUser(user) {
    this.setState({ user });
  }

  setMode(mode) {
    this.setState({ mode });
  }

  setSelectedMail(email) {
    this.setState({ selectedMail: email });
  }

  render() {
    return (
      <div className="root">
        {!this.state.user ? ( /*CHANGEBACK */
          <div>
            <Navbar />
            <LogInContainer setUser={(user) => this.setUser(user)} />
          </div>
        ) : (
          <div className="app">
            <Header
              user={this.state.user}
              setUser={(user) => this.setUser(user)}
            />
            <div className="app-body">
              <Sidebar
                user={this.state.user}
                selectedAddress={this.state.address}
                setAddress={(address) => this.setAddress(address)}
              />
              <Switch>
                <Route path={"/"} exact>
                  <EmailList
                    address={this.state.address}
                    mode={this.state.mode}
                    setMode={(mode) => this.setMode(mode)}
                    setSelectedMail={(email) => this.setSelectedMail(email)}
                  />
                </Route>
                <Route path={"/mail"}>
                  <Mail selectedMail={this.state.selectedMail} />
                </Route>
              </Switch>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
