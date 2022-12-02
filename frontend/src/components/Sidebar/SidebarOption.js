import React from "react";
import { useHistory } from "react-router-dom";
import "./SidebarOption.css";

function SidebarOption({ title, selected, setAddress }) {
  const history = useHistory();
  const openInbox = () => {
    setAddress(title);
    // Make it so that when clicking the addresses while viewing an opened mail,
    // they're redirected back to the EmailList view
    history.push("/");
  }

  return (
    <button className={`sidebarOption ${selected && "sidebarOption--active"}`} onClick={openInbox}>
      <h3>{title}</h3>
    </button>
  );
}

export default SidebarOption;
