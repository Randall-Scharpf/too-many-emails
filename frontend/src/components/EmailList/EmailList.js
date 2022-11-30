import { Checkbox, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./EmailList.css";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import RedoIcon from "@material-ui/icons/Redo";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import KeyboardHideIcon from "@material-ui/icons/KeyboardHide";
import SettingsIcon from "@material-ui/icons/Settings";
import InboxIcon from "@material-ui/icons/Inbox";
import SendIcon from "@material-ui/icons/Send";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import Section from "../Section/Section";
import EmailRow from "../EmailRow/EmailRow";
import { Component } from "react";
import { getFromServer, postToServer } from "./../../helper";


class EmailList extends Component {
  constructor({ address }) {
    super();
    this.state = {
      address: address,
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
          <button onClick={() => this.clickInbox()}>
            <Section Icon={InboxIcon} title="Inbox" color="red" />
          </button>
          <button onClick={() => this.clickSent()}>
            <Section Icon={SendIcon} title="Sent" color="#1A73E8" selected onClick={this.clickSent} />
          </button>
          {/* <Section Icon={LocalOfferIcon} title="Promotions" color="green" /> */}
        </div>

        {boxComponent}
      </div>
    );
  }
}

export default EmailList;
