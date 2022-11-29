import { Button, IconButton } from "@material-ui/core";
import React from "react";
import "./Sidebar.css";
import AddIcon from "@material-ui/icons/Add";

import SidebarOption from "./SidebarOption";
import SidebarCreatenew from "./SidebarCreatenew";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openSendMessage } from "../../features/mailSlice";

function Sidebar({ addresses }) {
  const dispatch = useDispatch();

  return (
    <div className="sidebar">
      <Button
        className="sidebar-compose"
        onClick={() => dispatch(openSendMessage())}
        startIcon={<AddIcon fontSize="large" />}
      >
        Compose
      </Button>
      <SidebarCreatenew 
          className = "sidebarOption"
         /> 

      <Link to= "/" className = "sidebar">
        {addresses.map((address)=>(
          <SidebarOption
            title = {address}
            />
        ))}
      </Link>

      

      
    </div>
  );
}

export default Sidebar;
