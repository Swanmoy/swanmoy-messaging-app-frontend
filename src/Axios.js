import axios from "axios";

const instance = axios.create({
  baseURL: "https://swanmoy-messaging-app.herokuapp.com",
});

export default instance;
