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
            id={id}
            key={id}
            title={to}
            subject={subject}
            description={message}
            time={new Date(timestamp?.seconds * 1000).toUTCString()}
          />
        ))}
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!"
          description="This is a DOPE"
          time="10pm"
        />
      </div>);
    }
  }
}

export default EmailList;
