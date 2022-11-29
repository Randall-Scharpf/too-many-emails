import { Button, IconButton } from "@material-ui/core";
import React from "react";
import "./Sidebar.css";
import AddIcon from "@material-ui/icons/Add";

import SidebarOption from "./SidebarOption";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openSendMessage } from "../../features/mailSlice";

function Sidebar({ emails }) {
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
      <SidebarOption 
          className = "sidebarOption"
          Icon={AddIcon} 
          title={["Create New Email" ]}
          type = "create"

         /> 

      

      
    </div>
  );
}

export default Sidebar;
