import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { postToServer } from '../../helper';
import "./Header.css";


function Header({ user, setUser, token }) {


  const signOut = () => {
    setUser(null);
    postToServer('/logout-user', {
      email: user,
      token: token,
    },
      data => {
        if (data.code === 400) {
        }
        else {

        }
      });
  };

  return (
    <div className="header">
      <div className="header-left" onClick={() => signOut()}>
        <a>
          <img src="/images/2ME.png" />
          <img src="/images/2ME_Wiggly.png" />
        </a>
        {/* <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzRceIIBz4GgeNszaN5SupI6p1SJE_Bzgk3Q&usqp=CAU"
          alt="gmail logo"
        /> */}
      </div>
      <div className="header-middle">
        <SearchIcon />
        <input type="text" placeholder="Search mail" />
        <ArrowDropDownIcon className="header-inputCaret" />
      </div>
      <div className="header-right">
        <h3>{user}'s Too Many Emails</h3>
      </div>
    </div>
  );
}

export default Header;
