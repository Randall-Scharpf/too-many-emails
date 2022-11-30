import React from "react";
import "./SidebarOption.css";

function SidebarOption({  title, selected }) {
  const openInbox = () =>{
    //inbox here
    //change state

  }


  return (
      <button className={`sidebarOption ${selected && "sidebarOption--active"}`} onClick={openInbox}>
        <h3>{title}</h3>
      </button>
  );
}

export default SidebarOption;
