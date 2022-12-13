import axios from "axios";
import { CLIENT_URL, SERVER_URL } from "../config/config";

export const loginAPI = async (userData) => {
  const res = await axios.post(`${SERVER_URL}/users/login`, userData, {
    withCredentials: true,
  });
  return res.data;
};

export const registerAPI = async (userData) => {
  const res = await axios.post(`${SERVER_URL}/users/register`, userData, {
    withCredentials: true,
  });
  return res.data;
};

export const isLoggedInAPI = async () => {
  const res = await axios.get(`${SERVER_URL}/users/isLoggedIn`, {
    withCredentials: true,
    // headers: {
    //   "Access-Control-Allow-Origin": CLIENT_URL,
    //   "Access-Control-Allow-Credentials": true,
    //   "Content-Type": "application/json",
    // },
  });
  return res.data;
};

export const logoutAPI = async () => {
  await axios.get(`${SERVER_URL}/users/logout`, { withCredentials: true });
};

export const forgotPasswordAPI = async (email) => {
  const res = await axios.post(`${SERVER_URL}/users/forgotpassword`, { email });
  return res.data;
};
