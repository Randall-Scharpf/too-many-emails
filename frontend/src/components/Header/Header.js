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
      </div>
      <div className="header-middle">
        {/* Removed search bar */}
      </div>
      <div className="header-right">
        <h3>{user}'s Too Many Emails</h3>
      </div>
    </div>
  );
}

export default Header;
