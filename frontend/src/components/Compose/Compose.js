import {Component} from "react";

class Compose extends Component {
    constructor(props){
        super(props);
        this.state = {
            to: '',
            subj: '',
            essay: '',
        }
        this.handleChange = this.handleChange.bind(this); 
        // this.handleSend = this.handleSend.bind(this);
    }
    
    handleChange(event){ 
        const target = event.target; 
        const value = target.value;
        
        

        this.setState({
            [event.target.name]: value
        }); 
    }
    handleSend(event)
    {
        event.preventDefault();
        alert("HI" + this.state.to + this.state.subj + this.state.essay);
    }
    render(){
       return( 
           <div>
        <form>
            <label>
                To: 
                    <input 
                        pattern = ".+@" required
                        value={this.state.to}
                        placeholder="Recipient"
                        name="to" 
                        type = "text"
                        goesTo={this.state.to} 
                        onChange={this.handleChange} />
            </label>
            <label>
                Subject: 
                    <input
                        // value={this.state.subj}
                        placeholder="Subject"
                        name="subj"
                        bodySubj={this.state.subj} 
                        onChange={this.handleChange}
                        value={this.state.subj} />
            </label>

            <label>
                Essay: 
                    <textarea 
                         value={this.state.essay}
                        placeholder="Body"
                        name="essay" 
                        essayBody={this.state.essay} 
                        onChange={this.handleChange} />
            </label>
            </form>
            <button className="button" onClick={(event) => this.handleSend(event)} >Send</button>
            </div>
        );
    }
}
export default Compose; 