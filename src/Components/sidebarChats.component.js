import React, { useState } from "react";
import axios from "../Axios.js";
import "../Css/sidebarChats.css";
import { Avatar } from "@mui/material";
function SidebarChats(props) {
  const [message, setMessage] = useState("");
  const getLastChat = () => {
    let message = "";
    axios
      .get("/messages", {
        params: { sender: props.loggedUser, receiver: props.chatName },
      })
      .then((res) => {
        const msg = res.data;
        if (msg.length === 0) {
        } else {
          setMessage(msg[msg.length - 1].message);
        }
      })
      .catch((err) => console.log(err));
    return message;
  };
  const handleCurrentChat = () => {
    window.sessionStorage.setItem("currentChat", props.chatName);
    props.setCurrentChat(props.chatName);
  };
  return (
    <div className='sidebarChat' onClick={handleCurrentChat}>
      {getLastChat()}
      <Avatar />
      <div className='sidebarChat_info'>
        <h2>{props.chatName}</h2>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default SidebarChats;
