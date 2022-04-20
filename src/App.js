import "./Css/App.css";
import Sidebar from "./Components/sidebar.component.js";
import Chat from "./Components/chat.component.js";
import React, { useEffect, useState } from "react";
import axios from "./Axios.js";
import Pusher from "pusher-js";
import Login from "./Components/login.component.js";
import SignUp from "./Components/signup.component.js";
import Logout from "./Components/logout.component.js";
function App() {
  const [messages, setMessages] = useState([]);
  const [show, setShow] = useState(false);
  const [logControl, setLogControl] = useState("login");
  const [loggedUser, setLoggedUser] = useState("default");
  const [showLogoutComponent, setShowLogoutComponent] = useState(false);
  const [friendList, setFriendList] = useState([]);
  const [currentChat, setCurrentChat] = useState("");
  useEffect(() => {
    setLoggedUser(window.sessionStorage.getItem("loggedUser") || "default");
    setCurrentChat(window.sessionStorage.getItem("currentChat"));
  }, [loggedUser, currentChat]);
  useEffect(() => {
    const messageDetails = { sender: loggedUser, receiver: currentChat };
    axios
      .get("/messages", { params: messageDetails })
      .then((res) => {
        console.log(res.data);
        setMessages(res.data);
      })
      .catch((err) => console.log(err));
  }, [currentChat, loggedUser]);
  useEffect(() => {
    axios
      .get("/user/getall")
      .then((resp) => {
        setFriendList(resp.data.users);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    const pusher = new Pusher("c605530d5c2f615b6493", {
      cluster: "ap2",
    });
    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (data) => {
      if (
        (data.sender === loggedUser && data.receiver === currentChat) ||
        (data.sender === currentChat && data.receiver === loggedUser)
      )
        setMessages([...messages, data]);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);
  const logComponentShow = () => {
    if (logControl === "login") {
      return (
        <Login
          loggedUser={loggedUser}
          setLoggedUser={setLoggedUser}
          setShow={setShow}
        />
      );
    } else {
      return (
        <SignUp
          loggedUser={loggedUser}
          setLoggedUser={setLoggedUser}
          setShow={setShow}
        />
      );
    }
  };
  const logoutComponentControl = () => {
    if (showLogoutComponent) {
      return (
        <Logout
          loggedUser={loggedUser}
          setLoggedUser={setLoggedUser}
          showLogoutComponent={showLogoutComponent}
          setShowLogoutComponent={setShowLogoutComponent}
        />
      );
    }
  };
  return (
    <div className='app'>
      <div className='app_body'>
        {
          (window.onload = () => {
            const messageDetails = {
              sender: loggedUser,
              receiver: currentChat,
            };
            axios
              .get("/messages", { params: messageDetails })
              .then((res) => {
                console.log(res.data);
                setMessages(res.data);
              })
              .catch((err) => console.log(err));
          })
        }
        {logoutComponentControl()}
        <div
          className='block'
          style={{
            opacity: show ? "100" : "0",
            display: show ? "block" : "none",
          }}
        >
          <p className='log_header'>
            <span
              className={`loginbtn ${
                logControl === "login" ? "highlight" : ""
              }`}
              onClick={() => {
                setLogControl("login");
              }}
            >
              Login
            </span>
            <span
              className={`signupbtn ${
                logControl === "signup" ? "highlight" : ""
              }`}
              onClick={() => {
                setLogControl("signup");
              }}
            >
              SignUp
            </span>
          </p>
          {logComponentShow()}
        </div>
        <Sidebar
          show={show}
          setShow={setShow}
          loggedUser={loggedUser}
          showLogoutComponent={showLogoutComponent}
          setShowLogoutComponent={setShowLogoutComponent}
          friendList={friendList}
          setCurrentChat={setCurrentChat}
        />
        <Chat
          messages={messages}
          setMessages={setMessages}
          loggedUser={loggedUser}
          currentChat={currentChat}
        />
      </div>
    </div>
  );
}

export default App;
