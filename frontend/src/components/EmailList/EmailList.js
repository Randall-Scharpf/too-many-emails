import React, { useEffect, useState } from "react";
import "./EmailList.css";
import Section from "../Section/Section";
import EmailRow from "../EmailRow/EmailRow";
import { Component } from "react";
import { getFromServer, postToServer } from "./../../helper";


const TEMP_ADDRESS = 'throwaway2@lmao.com';

class EmailList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: TEMP_ADDRESS, // change to props.address later
      mode: "inbox",
      emails_inbox: [],
      emails_outbox: []
    };
  }

  clickInbox() {
    this.setState({ mode: "inbox" });
    getFromServer('/all-received-emails', {
      address: this.state.address
    },
      data => this.setState({ emails_inbox: data.emails }));
  }

  clickSent() {
    this.setState({ mode: "outbox" });
    getFromServer('/all-sent-emails', {
      address: this.state.address
    },
      data => this.setState({ emails_outbox: data.emails }));
  }

  clickCompose()
  {
    this.setState({ mode: "compose" });
    
  }

  //
  render() {
    let boxComponent;
    if (this.state.mode === "inbox") {
      boxComponent = (<div className="emailList-list">
        {this.state.emails_inbox.map((email) => (
          <EmailRow
            title={email.from}
            subject={email.subject}
          />
        ))}
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!"
        />
      </div>);
    }
    else if (this.state.mode === "outbox") {
      boxComponent = (<div className="emailList-list">
        {this.state.emails_outbox.map((email) => (
          <EmailRow
            title={email.to}
            subject={email.subject}
          />
        ))}
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!! (but this is in outbox now)"
        />
      </div>);
    }
    else {
      boxComponent = (<div>Work in progress!</div>);
    }

    return (
      <div className="emailList">
        
        <div className="emailList-sections">
          <button className="button" onClick={() => this.clickInbox()}>
            <Section Cover="/images/Inbox_Open.png" Reveal="/images/Inbox_Closed.png" title="Inbox" color="green" />
            <p>Inbox</p>
          </button>
          <button className="button" onClick={() => this.clickSent()}>
            <Section Cover="/images/Outbox_Open.png" Reveal="/images/Outbox_Closed.png" title="Sent" color="orange" />
            <p>Outbox</p>
          </button>
          <button className="button" onClick={() => this.clickCompose()}>
            <Section Cover="/images/Outbox_Closed.png" Reveal="/images/Inbox_Open.png" title="Compose" color="pink" />
            <p>Compose</p>
          </button>
          {/* <Section Icon={LocalOfferIcon} title="Promotions" color="green" /> */}
        </div>


        {boxComponent}
      </div>
    );
  }
}

export default EmailList;
