import { Component } from "react";
import "./EmailRow.css";

class EmailRow extends Component {
  /**
   * props: {
   *      title: string,
   *      subject: string
   *      time: string <-- TODO
   * }
   */
  constructor(props) {
    super(props);
  }

  openMail() {
    // TEMP: proof of concept
    alert(`${JSON.stringify(this.props)}`);
  }

  render() {
    return (
      <div onClick={() => this.openMail()} className="emailRow">
        <div className="emailRow-options">

        </div>
        <h3 className="emailRow-title">{this.props.title}</h3>
        <div className="emailRow-message">
          <h4>
            {this.props.subject}{" "}
          </h4>
        </div>
      </div>
    );
  }
}

export default EmailRow;
