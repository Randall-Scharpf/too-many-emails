import {Component} from "react";

class Compose extends Component {
    constructor(props){
        super(props);
        this.state = {
            to: 'Recipient',
            subj: 'Subject',
            essay: 'Penny for your thoughts?',
        }
        this.handleChange = this.handleChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event){
        const target = event.target; 
        const value =  target.value; 
        const name = target.name;
        

        this.setState({
            [name]: value
        });
    }
    handleSubmit(event)
    {
        alert("HI" + this.state.value);
    }
    render(){
       return( 
           <div>
        <form>
            <label>
                To: 
                    <input 
                        value={this.state.to}
                        name="to" 
                        goesTo={this.state.to} 
                        onChange={this.handleChange} />
            </label>
            <label>
                Subject: 
                    <input
                        value={this.state.subj}
                        name="subj"
                        bodySubj={this.state.subj} 
                        onChange={this.handleChange} />
            </label>

            <label>
                Essay: 
                    <textarea 
                        value={this.state.essay}
                        name="essay" 
                        essayBody={this.state.essay} 
                        onChange={this.handleChange} />
            </label>
            <button type={"submit"}>Send</button>
            </form>
            </div>
        );
    }
}
export default Compose; 
// class EssayForm extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         value: 'Please write an essay about your favorite DOM element.'
//       };
  
//       this.handleChange = this.handleChange.bind(this);
//       this.handleSubmit = this.handleSubmit.bind(this);
//     }
  
//     handleChange(event) {
//       this.setState({value: event.target.value});
//     }
  
//     handleSubmit(event) {
//       alert('An essay was submitted: ' + this.state.value);
//       event.preventDefault();
//     }
  
//     render() {
//       return (
//         <form onSubmit={this.handleSubmit}>
//           <label>
//             Essay:
//             <textarea value={this.state.value} onChange={this.handleChange} />
//           </label>
//           <input type="submit" value="Submit" />
//         </form>
//       );
//     }
//   }