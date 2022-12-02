import { Component } from "react";
import Compose from "../Compose/Compose";
import EmailsBox from "../EmailsBox/EmailsBox";
import Section from "../Section/Section";
import { getFromServer } from "./../../helper";
import "./EmailList.css";


class EmailList extends Component {
  /**
   * props: {
   *    address: string | null,
   *    mode: "inbox" | "outbox" | "compose",
   *    setMode: (mode: "inbox" | "outbox" | "compose") => void
   *    setSelectedMail: (email: {
   *        from: string,
   *        to: string[],
   *        subject: string | null,
   *        text: string | null
   *    }) => void
   * }
   */
  constructor(props) {
    super(props);
    this.state = {
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
    switch (this.props.mode) {
      case "inbox":
        this.updateInbox();
        break;
      case "outbox":
        this.updateSent();
        break;
      default:
        console.log(`updateBox() was called when this.props.mode=${this.props.mode}, doing nothing`);
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
    this.props.setMode("inbox");
    this.updateInbox();
  }

  clickSent() {
    this.props.setMode("outbox");
    this.updateSent();
  }

  clickCompose() {
    this.props.setMode("compose");
  }

  //
  render() {
    // console.log(`Re-rendering EmailList with address=${this.props.address}, mode=${this.props.mode}`);
    let boxComponent;
    if (this.props.mode === "inbox") {
      boxComponent = (<EmailsBox
        emails_list={this.state.emails_inbox}
        setSelectedMail={(email) => this.props.setSelectedMail(email)}
      />);
    }
    else if (this.props.mode === "outbox") {
      boxComponent = (<EmailsBox
        emails_list={this.state.emails_outbox}
        setSelectedMail={(email) => this.props.setSelectedMail(email)}
      />);
    }
    else {
      boxComponent = <Compose />;
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
