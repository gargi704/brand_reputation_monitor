import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";


export const fetchMentions = () =>
  axios.get(`${baseURL}/api/mentions`);
export const addMention = (data) =>
  axios.post(`${baseURL}/api/mentions`, data);

