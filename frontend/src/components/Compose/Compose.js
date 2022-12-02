import { Component } from "react";
import { postToServer } from "../../helper";
import "./Compose.css";


class Compose extends Component {
    constructor(props) {
        super(props);
        this.state = {
            to: '',
            subj: '',
            essay: '',
        }
        this.handleChange = this.handleChange.bind(this);
        // this.handleSend = this.handleSend.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;



        this.setState({
            [event.target.name]: value
        });
    }
    handleSend(event) {
        event.preventDefault();

        const emailObj = {
            "from": this.props.address,
            "to": [this.state.to],
            "subject": this.state.subj || null,
            "text": this.state.essay || null,
        };

        if (!this.state.to.includes("@2me.com")) {
            alert("invalid recipient");
        } else {



            postToServer("/email", emailObj, data => {
                alert(data.code)
                if (data.code === 400) {
                    //render error code
                    alert(data.message);
                }
            });

            this.setState({
                to: '',
                subj: '',
                essay: ''
            });
        }
    }



    render() {
        return (
            <div className="compose_area">
                <form className="compose_form">
                    <label className="email-form">
                        To:
                        <input
                            pattern=".+@2me\.com" required
                            placeholder="Recipient"
                            name="to"
                            goesTo={this.state.to}
                            onChange={this.handleChange}
                            value={this.state.to} />
                    </label>
                    <label>
                        Subject:
                        <input
                            placeholder="Subject"
                            name="subj"
                            bodySubj={this.state.subj}
                            onChange={this.handleChange}
                            value={this.state.subj} />
                    </label>

                    <label>
                        Essay:
                        <textarea
                            placeholder="Body"
                            name="essay"
                            essayBody={this.state.essay}
                            onChange={this.handleChange}
                            value={this.state.essay} />
                    </label>
                </form>
                <button className="button" onClick={(event) => this.handleSend(event)} >Send</button>
            </div>
        );
    }
}
export default Compose;
