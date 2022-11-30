import React from "react";
import "./SidebarOption.css";

function SidebarOption({  title, selected, setAddress }) {
  const openInbox = () =>{
    setAddress(title);
  }

  
  return (
    <div className={`sidebarOption ${selected && "sidebarOption--active"}`}>
      onClick = {openInbox}
      <h3>{title}</h3>
    </div>
  );
}

export default SidebarOption;
