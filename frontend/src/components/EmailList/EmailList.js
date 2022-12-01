import { Checkbox, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./EmailList.css";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import RedoIcon from "@material-ui/icons/Redo";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import KeyboardHideIcon from "@material-ui/icons/KeyboardHide";
// import InboxIcon from "@material-ui/icons/Inbox";
// import SendIcon from "@material-ui/icons/Send";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
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
            <Section Cover="/images/Inbox_Open.png" Reveal="/images/Inbox_Closed.png" title="Inbox" color="red" />
            <p>Inbox</p>
          </button>
          <button className="button" onClick={() => this.clickSent()}>
            <Section Cover="/images/Outbox_Open.png" Reveal="/images/Outbox_Closed.png" stitle="Sent" color="#1A73E8" />
            <p>Outbox</p>
          </button>
          {/* <Section Icon={LocalOfferIcon} title="Promotions" color="green" /> */}
        </div>


        {boxComponent}
      </div>
    );
  }
}

export default EmailList;
