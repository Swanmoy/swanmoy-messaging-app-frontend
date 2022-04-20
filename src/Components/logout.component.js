import React from "react";
import "../Css/logout.css";

function Logout(props) {
  const handleLogout = () => {
    window.sessionStorage.setItem("loggedUser", "default");
    props.setLoggedUser("default");
    props.setShowLogoutComponent(false);
  };
  return (
    <div
      className='logout_component'
      style={{ opacity: props.showLogoutComponent ? "100" : "0" }}
    >
      <p>{props.loggedUser}</p>
      <span onClick={handleLogout}>Logout</span>
    </div>
  );
}

export default Logout;
