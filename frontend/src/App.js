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
      {user ? (
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
