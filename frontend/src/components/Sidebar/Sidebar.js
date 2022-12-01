import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import "./Sidebar.css";

import SidebarOption from "./SidebarOption";

import { Component } from 'react';
import { openSendMessage } from "../../features/mailSlice";
import { getFromServer, postToServer } from "./../../helper";



class Sidebar extends Component {
  /**
   * props: {
   *    user: string | null,
   *    selectedAddress: string | null,
   *    setAddress: (address: string | null) => void
   * }
   */
  constructor(props) {
    super(props);
    this.state = {
      addresses: [],
      message: ""
    };
  }

  // This method is called immediately after a component is mounted
  // Moving the GET request out of the constructor fixes the warning
  // 'Can't call setState on a component that is not yet mounted.'
  componentDidMount() {
    getFromServer('/all-addresses', {
      email: this.props.user
    },
      data => {
        if (data.code === 200)
          this.setState({ addresses: data.addresses });
      });
  }

  validateAddress() {
    return true;

  }
  handleSubmit(event) {
    event.preventDefault();
    const submission = this.state.message;

    if (this.validateAddress()) {


      postToServer('/address', {
        email: this.props.user,
        address: this.state.message
      },
        data => {
          if (data.code === 400) {
            //render error code
            alert(data.message);
          }
          else {
            const curr_addresses = this.state.addresses.slice();
            curr_addresses.push(submission);
            this.setState({ addresses: curr_addresses });
          }
        });

      getFromServer('/all-addresses', {
        email: this.props.user
      },
        data => {
          if (data.code === 200) this.setState({ addresses: data.addresses });
        });
    }
    else {
      alert("invalid address")
    }

    //setErrorMessage("error")
    //alert(`The name you entered was: ${message}`)
    this.setState({
      message: ""
    });


  }

  render() {
    return (
      <div className="sidebar">
        <Button
          className="sidebar-compose"
          onClick={() => openSendMessage()}
          startIcon={<AddIcon fontSize="large" />}
        >
          Compose
        </Button>


        <form onSubmit={(event) => this.handleSubmit(event)}>

          <input
            pattern=".+@2me\.com" required
            type="text"
            placeholder="@2me.com"
            id="message"
            name="message"
            onChange={(e) => this.setState({ message: e.target.value })}
            value={this.state.message}
          />
        </form>


        {this.state.addresses.map((address, index) => (
          <SidebarOption
            title={address}
            selected={address === this.props.selectedAddress}
            setAddress={a => this.props.setAddress(a)}
            key={index}
          />
        ))}




      </div>
    );
  }
}

export default Sidebar;
