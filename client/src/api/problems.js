import axios from "axios";
import { SERVER_URL } from "../config/config";

export const getProblemsListAPI = async () => {
  try {
    const res = await axios.get(`${SERVER_URL}/problems/getProblemsList`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    if (err && err.response && err.response.data)
      return { success: false, ...err.response.data };
    return { success: false };
  }
};
