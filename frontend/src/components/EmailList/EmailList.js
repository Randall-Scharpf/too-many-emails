import React, { Component } from "react";
import Compose from "../Compose/Compose";
import EmailRow from "../EmailRow/EmailRow";
import Section from "../Section/Section";
import { getFromServer } from "./../../helper";
import "./EmailList.css";


class EmailList extends Component {
  /**
   * props: {
   *    address: string | null
   * }
   */
  constructor(props) {
    super(props);
    this.state = {
      mode: "inbox",
      emails_inbox: [],
      emails_outbox: []
    };
  }

  updateInbox() {
    getFromServer('/all-received-emails', {
        address: this.props.address
      },
      data => this.setState({ emails_inbox: data.emails }));
  }

  updateSent() {
    getFromServer('/all-sent-emails', {
        address: this.props.address
      },
      data => this.setState({ emails_outbox: data.emails }));
  }

  /**
   * General method that determines which mode we're in, then updates that box
   * only to prevent unnecessary API calls.
   */
  updateBox() {
    switch (this.state.mode) {
        case "inbox":
            this.updateInbox();
            break;
        case "outbox":
            this.updateSent();
            break;
        default:
            console.log(`updateBox() was called when this.state.mode=${this.state.mode}, doing nothing`);
    }
  }

  // This method will run when the component is finished mounting
  // Run this to fetch emails "on startup"
  componentDidMount() {
    this.updateBox();
  }

  // This method will run when the component props/state has been updated This
  // makes it so that when props.address changes (user switched address,
  // propagating address from SidebarOption -> Sidebar -> App -> EmailList), the
  // displayed mailbox will also update visually.
  componentDidUpdate(prevProps) {
    if (this.props.address !== prevProps.address) {
        this.updateBox();
    }
  }

  clickInbox() {
      this.setState({ mode: "inbox" });
      this.updateInbox();
  }

  clickSent() {
      this.setState({ mode: "outbox" });
      this.updateSent();
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
      boxComponent = <Compose/>;
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
