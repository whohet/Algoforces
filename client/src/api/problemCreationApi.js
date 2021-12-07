import axios from "axios";
import { SERVER_URL } from "../config/config";

export const getMyProblemsAPI = async () => {
  try {
    const res = await axios.get(`${SERVER_URL}/problemCreate/getMyProblems`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    if (err && err.response && err.response.data)
      return { success: false, ...err.response.data };
    return { success: false };
  }
};

export const createProblemAPI = async (problemData) => {
  try {
    const res = await axios.post(
      `${SERVER_URL}/problemCreate/create`,
      problemData,
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    if (err && err.response && err.response.data)
      return { success: false, ...err.response.data };
    return { success: false };
  }
};

export const getProblemDataAPI = async (problemInfo) => {
  try {
    const res = await axios.get(`${SERVER_URL}/problemCreate/getProblemData`, {
      params: { ...problemInfo },
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    if (err && err.response && err.response.data)
      return { success: false, ...err.response.data };
    return { success: false };
  }
};

export const saveProblemAPI = async (problemData) => {
  try {
    const res = await axios.post(
      `${SERVER_URL}/problemCreate/save`,
      problemData,
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    if (err && err.response && err.response.data)
      return { success: false, ...err.response.data };
    return { success: false };
  }
};

export const saveAndPublishProblemAPI = async (problemData) => {
  try {
    const res = await axios.post(
      `${SERVER_URL}/problemCreate/saveandpublish`,
      problemData,
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    if (err && err.response && err.response.data)
      return { success: false, ...err.response.data };
    return { success: false };
  }
};
