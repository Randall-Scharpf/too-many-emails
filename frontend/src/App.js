import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import EmailList from "./components/EmailList/EmailList";
import Header from "./components/Header/Header";
import LogInContainer from "./components/LogInContainer/LogInContainer";
import Mail from "./components/Mail/Mail";
import Navbar from "./components/Navbar/navbar";
import SendMail from "./components/SendMail/SendMail";
import Sidebar from "./components/Sidebar/Sidebar";
import { selectSendMessageIsOpen } from "./features/mailSlice";
import { selectUser } from "./features/userSlice";
import { db } from "./firebase";
import { Component } from "react";

const DUMMY_USER = "josie_bruin@ucla.edu"; // REMOVE LATER

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: DUMMY_USER, // CHANGE LATER
      address: null
    };
  }

  // const sendMessageIsOpen = useSelector(selectSendMessageIsOpen);
  // const user = useSelector(selectUser);
  // const [emails, setEmails] = useState([]);

  // console.log("emails", emails);
  // useEffect(() => {
  //   db.collection("emails")
  //     .orderBy("timestamp", "desc")
  //     .onSnapshot((snapshot) =>
  //       setEmails(
  //         snapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           data: doc.data(),
  //         }))
  //       )
  //     );
  // }, []);

  setAddress(address) {
    this.setState({address});
  }

  render() {
    return (
      <Router>
        {false ? ( // REVERT TO this.state.user WHEN LOGIN WORKS
          <div>
            <Navbar />
            <LogInContainer />

          </div>

        ) : (
          <div className="app">
            <Header />
            <div className="app-body">
              <Sidebar user={DUMMY_USER} setAddress={(address) => this.setAddress(address)} />
              <Switch>
                <Route path="/mail">
                  <Mail />
                </Route>
                <Route path="/" exact>
                  <EmailList address={this.state.address} />
                </Route>
              </Switch>
            </div>

            {/* {sendMessageIsOpen && <SendMail />} */}
          </div>
        )}
      </Router>
    );
  }
}

export default App;
