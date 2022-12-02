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
   *    }[],
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
  }

  render() {
    return (<div className="emailList-list">
      {this.props.emails_list.map((email, index) => (
        <EmailRow
          email={email}
          setSelectedMail={(email) => this.props.setSelectedMail(email)}
          key={index}
        />
      ))}
    </div>);
  }
}

export default EmailsBox;
