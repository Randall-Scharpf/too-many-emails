import { Button, IconButton } from "@material-ui/core";
import React from "react";
import "./Sidebar.css";
import AddIcon from "@material-ui/icons/Add";

import SidebarOption from "./SidebarOption";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openSendMessage } from "../../features/mailSlice";
import {useState} from "react";


function Sidebar({ emails }) {
    const dispatch = useDispatch();
    const [message, setMessage]=useState('');
    const addresses = ["address1", "address2"];

  const handleSubmit = event => {
    event.preventDefault()
    //check if $message is okay
    //if so add to stack of emails
    //else error message

    setMessage("")
    //setErrorMessage("error")
    //alert(`The name you entered was: ${message}`)


  }

  return (
    <div className="sidebar">
      <Button
        className="sidebar-compose"
        onClick={() => dispatch(openSendMessage())}
        startIcon={<AddIcon fontSize="large" />}
      >
        Compose
      </Button>


      <form onSubmit={handleSubmit}>

          <input
            type = "text"
            placeholder="enter new address"
            id="message"
            name="message"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
         </form>


        {addresses.map((address)=>(
          <SidebarOption
            title = {address}
            />
        ))}




    </div>
  );
}

export default Sidebar;
