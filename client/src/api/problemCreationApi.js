import axios from "axios";
import { SERVER_URL } from "../config/config";

export const getMyProblemsAPI = async () => {
  try {
    const res = await axios.get(`${SERVER_URL}/problemCreation/getMyProblems`, {
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
      `${SERVER_URL}/problemCreation/create`,
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
    const res = await axios.get(`${SERVER_URL}/problemCreation/getProblemData`, {
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
      `${SERVER_URL}/problemCreation/save`,
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
      `${SERVER_URL}/problemCreation/saveandpublish`,
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
