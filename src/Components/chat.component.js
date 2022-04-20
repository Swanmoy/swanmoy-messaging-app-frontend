import React, { useState } from "react";
import axios from "../Axios.js";
import "../Css/chat.css";
import { IconButton, Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
export default function Chat(props) {
  const [input, setInput] = useState("");
  const sendMessage = (e) => {
    e.preventDefault();
    const messageDetails = {
      sender: props.loggedUser,
      message: input,
      receiver: props.currentChat,
    };
    axios.post("/message/add", messageDetails);
    setInput("");
  };
  return (
    <div className='chat'>
      <div className='chat_header'>
        <Avatar />
        <div className='chat_headerInfo'>
          <h3>{props.currentChat}</h3>
          <p>Last seen at....</p>
        </div>
        <div className='chat_headerRight'>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className='chat_body'>
        {props.messages.map((msg) => {
          let cla = "chat_message";
          let cla1 = msg.sender === props.loggedUser ? " chat_receiver" : "";
          cla = cla + cla1;
          return (
            <p className={cla}>
              <span className='chat_name'>{msg.name}</span>
              {msg.message}
              <span className='chat_timestamp'>{msg.timestamp}</span>
            </p>
          );
        })}
      </div>
      <div className='chat_footer'>
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>
        <form>
          <input
            type='text'
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <button type='submit' onClick={sendMessage}>
            Send a message
          </button>
        </form>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
}
