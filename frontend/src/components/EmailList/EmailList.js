import React, { Component } from "react";
import Compose from "../Compose/Compose";
import EmailsBox from "../EmailsBox/EmailsBox";
import Section from "../Section/Section";
import { getFromServer } from "./../../helper";


class EmailList extends Component {
    constructor({ address }) {
        super();
        this.state = {
            address: address,
            mode: "inbox",
            emails_inbox: [],
            emails_outbox: []
        };
    }

    clickInbox() {
        this.setState({ mode: "inbox" });
        getFromServer('/all-received-emails', {
            address: this.state.address
        },
            data => this.setState({ emails_inbox: data.emails }));
    }

    clickSent() {
        this.setState({ mode: "outbox" });
        getFromServer('/all-sent-emails', {
            address: this.state.address
        },
            data => this.setState({ emails_outbox: data.emails }));
    }

    clickCompose() {
        this.setState({ mode: "compose" });

    }

    //
    render() {
        let boxComponent;
        if (this.state.mode === "inbox") {
            boxComponent = <EmailsBox emails_list={this.state.emails_inbox} />;
        }
        else if (this.state.mode === "outbox") {
            boxComponent = <EmailsBox emails_list={this.state.emails_outbox} />;
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
