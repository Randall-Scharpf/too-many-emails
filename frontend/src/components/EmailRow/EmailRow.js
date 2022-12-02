import { Component } from "react";
import { withRouter } from "react-router-dom";
import "./EmailRow.css";

class EmailRow extends Component {
  /**
   * props: {
   *    email: {
   *        from: string,
   *        to: string[],
   *        subject: string | null,
   *        text: string | null
   *    },
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

  openMail() {
    this.props.history.push("/mail");
    this.props.setSelectedMail(this.props.email);
  }

  render() {
    return (
      <div onClick={() => this.openMail()} className="emailRow">
        <div className="emailRow-options">

        </div>
        <h3 className="emailRow-title">{this.props.email?.from}</h3>
        <div className="emailRow-message">
          <h4>
            {this.props.email?.subject}{" "}
          </h4>
        </div>
      </div>
    );
  }
}

export default withRouter(EmailRow);
