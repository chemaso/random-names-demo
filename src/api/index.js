import axios from "axios";

// southInstance is the initial instance to trigger API calls, it can be intercepted to add configs as auth token
const southInstance = axios.create({
  baseURL: "https://randomuser.me",
  headers: {
    Accept: "application/json"
  }
});

export default southInstance;
