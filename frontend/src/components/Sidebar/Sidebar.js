import { Button, IconButton } from "@material-ui/core";
import React from "react";
import "./Sidebar.css";
import AddIcon from "@material-ui/icons/Add";

import SidebarOption from "./SidebarOption";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openSendMessage } from "../../features/mailSlice";
import { useState } from "react";
import { getFromServer, postToServer } from "./../../helper";
import { Component } from 'react';



class Sidebar extends Component {
  constructor({ user, setAddress }) {
    super();
    this.props = {
      user,
      setAddress // (address) => { this.state.address = address; }
    }
    this.state = {
      addresses: [],
      message: ""
    };
    getFromServer('/all-addresses', {
      email: this.props.user
    },
      data => this.setState({ addresses: data.addresses }));
  }

  handleSubmit(event) {
    event.preventDefault();

    postToServer('/address', {
      email: this.props.user,
      address: this.state.message
    },
      data => {
        if( data.code === 400){
          //render error code
        }
        else{
          const curr_addresses = this.state.addresses.slice();
          curr_addresses.push(this.state.message);
          this.setState(curr_addresses);
        }
      });

    //setErrorMessage("error")
    //alert(`The name you entered was: ${message}`)
    this.setState({
      message: ""
    });

    getFromServer('/all-addresses', {
      email: this.props.user
    },
      data => this.setState({ addresses: data.addresses }));
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
            type="text"
            placeholder="enter new message"
            id="message"
            name="message"
            onChange={(e) => this.setState({ message: e.target.value })}
            value={this.state.message}
          />
        </form>


        {this.state.addresses.map((address) => (
          <SidebarOption
            title={address}
            setAddress={this.props.setAddress}
          />
        ))}




      </div>
    );
  }
}

export default Sidebar;
