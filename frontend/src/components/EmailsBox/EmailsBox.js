// EmailsBox.js
// Model for the inbox and outbox list of emails.

import { Component } from "react";
import EmailRow from "../EmailRow/EmailRow";

class EmailsBox extends Component {
  constructor({ emails_list }) {
    super();
    this.props = { emails_list };
  }

  render() {
    return (<div className="emailList-list">
      {this.props.emails_list.map((email) => (
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
}

export default EmailsBox;