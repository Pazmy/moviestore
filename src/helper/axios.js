import axios from "axios";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Instance = axios.create({
  baseURL: SERVER_URL,
});

export { Instance, SERVER_URL };
