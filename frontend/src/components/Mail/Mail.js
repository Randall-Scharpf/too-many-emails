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
   *    }
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
          <div className="mail-bodyHeader">
            <div className="mail-subject">
              <h2>{this.props.selectedMail?.subject}</h2>
            </div>
            <p>{this.props.selectedMail?.title}</p>
            <p className="mail-time">{this.props.selectedMail?.time}</p>
          </div>

          <div className="mail-message">
            <p>{this.props.selectedMail?.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Mail);
