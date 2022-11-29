import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Mail from "./components/Mail/Mail";
import EmailList from "./components/EmailList/EmailList";
import SendMail from "./components/SendMail/SendMail";
import { useSelector } from "react-redux";
import { selectSendMessageIsOpen } from "./features/mailSlice";
import { selectUser } from "./features/userSlice";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/navbar";
import LogInContainer from "./components/LogInContainer/LogInContainer";
import Login2 from "./components/Login2/Login";
import Signup from "./components/Signup/Signup";
import { db } from "./firebase";
import { NavigateBefore } from "@material-ui/icons";

// Added for testing
import fetch from 'node-fetch';
async function test() {
  const response = await fetch('http://localhost:80/address', {
    method: 'post',
    body: JSON.stringify({
      email: "josie_bruin@ucla.edu",
      address: "some_addressfkashga@lol.com"
    }),
    headers: {'Content-Type': 'application/json'}
  });
  const data = await response.json();
  console.log(data);
}

test().catch(console.error);

function App() {
  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen);
  const user = useSelector(selectUser);
  const [emails, setEmails] = useState([]);

  console.log("emails", emails);
  useEffect(() => {
    db.collection("emails")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setEmails(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  return (
    <Router>
      {!user ? (
        <div>
          <Navbar />
          <LogInContainer />

        </div>

      ) : (
        <div className="app">
          <Header />
          <div className="app-body">
            <Sidebar emails={emails} />
            <Switch>
              <Route path="/mail">
                <Mail />
              </Route>
              <Route path="/" exact>
                <EmailList emails={emails} />
              </Route>
            </Switch>
          </div>

          {sendMessageIsOpen && <SendMail />}
        </div>
      )}
    </Router>
  );
}

export default App;
