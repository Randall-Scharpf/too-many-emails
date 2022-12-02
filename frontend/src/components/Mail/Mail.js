import { IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./Mail.css";


class Mail extends Component {
  /**
   * props: {
   *    selectedMail: {
   *        from: string,
   *        to: string[],
   *        subject: string | null,
   *        text: string | null
   *    } | null
   * }
   */
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mail">
        <div className="mail-tools">
          <div className="mail-toolsLeft">
            <IconButton onClick={() => this.props.history.push("/")}>
              <ArrowBackIcon />
            </IconButton>
          </div>
        </div>
        <div className="mail-body">
          <p>{this.props.selectedMail?.timestamp}</p>
          <div className="mail-bodyHeader">
            <div className="mail-subject">
              <h2>{this.props.selectedMail?.subject}</h2>
            </div>
          </div>
          <div className="mail-participants">
            <p><strong>FROM: </strong>{this.props.selectedMail?.from}</p>
            <p><strong>TO: </strong>{this.props.selectedMail?.to.join("; ")}</p>
          </div>
          <div className="mail-message">
            <p>{this.props.selectedMail?.text}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Mail);
