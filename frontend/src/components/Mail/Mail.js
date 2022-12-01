import { Component } from "react";
import "./Mail.css";

class Mail extends Component {
    constructor({ from, to, subject, text }) {
        super();
        this.props = { from, to, subject, text };
    }

    render() {
        return (
            <div>
                <h1>{this.props.subject}</h1>
                <h2>From: {this.props.from} </h2>
                <h2>To: {this.props.to.join("; ")}</h2>
                <p>{this.props.text}</p>
            </div>
        );
    }
}

export default Mail;
