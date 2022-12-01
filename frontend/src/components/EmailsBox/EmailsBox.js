// EmailsBox.js
// Model for the inbox and outbox list of emails.

import { Component } from "react";
import EmailRow from "../EmailRow/EmailRow";

class EmailsBox extends Component {
  /**
   * props: {
   *    emails_list: {
   *        from: string,
   *        to: string[],
   *        subject: string | null,
   *        text: string | null
   *    }[]
   * }
   */
  constructor(props) {
    super(props);
  }

  render() {
    return (<div className="emailList-list">
      {this.props.emails_list.map((email, index) => (
        <EmailRow
          title={email.from}
          subject={email.subject}
          key={index}
        />
      ))}
      <EmailRow
        title="Twitch"
        subject="Hey fellow streamer!!"
        key={-1}
      />
    </div>);
  }
}

export default EmailsBox;
