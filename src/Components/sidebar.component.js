import React, { useState } from "react";
import "../Css/sidebar.css";
import ChatIcon from "@mui/icons-material/Chat";
import { IconButton, Avatar } from "@mui/material";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import avatarImg from "../Images/avatar.jpg";
import SearchIcon from "@mui/icons-material/Search";
import SidebarChats from "./sidebarChats.component.js";
export default function Sidebar(props) {
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className='sidebar'>
      <div className='sidebar_header'>
        <Avatar
          src={avatarImg}
          onClick={() => {
            props.setShow(!props.show);
          }}
        />
        <div className='siderbar_headerRight'>
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon
              onClick={() => {
                props.setShowLogoutComponent(!props.showLogoutComponent);
              }}
            />
          </IconButton>
        </div>
      </div>
      <div className='sidebar_search'>
        <div className='sidebar_searchContainer'>
          <SearchIcon />
          <input
            type='text'
            placeholder='Search or Start a new Chat'
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className='sidebar_chats'>
        {props.friendList
          .filter((user) => {
            return user.username.toLowerCase().startsWith(search.toLowerCase());
          })
          .filter((user) => {
            return user.username !== props.loggedUser;
          })
          .map((user) => {
            return (
              <SidebarChats
                chatName={user.username}
                setCurrentChat={props.setCurrentChat}
                loggedUser={props.loggedUser}
              />
            );
          })}
      </div>
    </div>
  );
}
