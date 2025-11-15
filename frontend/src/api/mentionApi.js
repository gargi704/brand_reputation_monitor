import axios from "axios";

const BASE = "http://localhost:5000/api/mentions";

export const addMention = (data) =>
  axios.post(`${BASE}/`, data);

export const fetchMentions = () =>
  axios.get(`${BASE}/`);
