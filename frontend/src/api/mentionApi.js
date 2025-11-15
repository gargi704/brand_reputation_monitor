import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_URL; 

export const addMention = (data) =>
  axios.post(`${baseURL}/`, data);

export const fetchMentions = () =>
  axios.get(`${baseURL}/`);
