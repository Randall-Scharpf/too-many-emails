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
      mode: "inbox"
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
                  />
                </Route>
                <Route path={"/mail"}>
                  <Mail />
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
