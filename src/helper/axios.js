import axios from "axios";

const SERVER_URL = "http://localhost:8080";

const Instance = axios.create({
  baseURL: SERVER_URL,
});

export { Instance };
