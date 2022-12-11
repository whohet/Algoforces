import axios from "axios";
import { SERVER_URL } from "../config/config";

export const getProblemsListAPI = async () => {
  try {
    const res = await axios.get(`${SERVER_URL}/problem/getProblemsList`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    if (err && err.response && err.response.data)
      return { success: false, ...err.response.data };
    return { success: false };
  }
};

export const getProblemDataAPI = async (problemId) => {
  try {
    const res = await axios.get(`${SERVER_URL}/problem/getProblemData`, {
      withCredentials: true,
      params: {
        problemId: problemId,
      },
    });
    res.data.problem.published.sampleTestcases = [];
    for (let i = 0; i < res.data.problem.published.testcases.length; i++) {
      if (res.data.problem.published.testcases[i].isSample) {
        res.data.problem.published.sampleTestcases.push({
          input: res.data.problem.published.testcases[i].input.url,
          output: res.data.problem.published.testcases[i].output.url,
        });
      }
    }
    return res.data;
  } catch (err) {
    if (err && err.response && err.response.data)
      return { success: false, ...err.response.data };
    return { success: false };
  }
};

export const getSubmissionsListAPI = async (data) => {
  try {
    const res = await axios.get(`${SERVER_URL}/problem/submissionsList`, {
      withCredentials: true,
      params: {
        username: data.username,
        problemId: data.problemId,
      },
    });
    return res.data;
  } catch (err) {
    if (err && err.response && err.response.data)
      return { success: false, ...err.response.data };
    return { success: false };
  }
};

export const getProblemLeaderboardAPI = async (data) => {
  try {
    const res = await axios.get(`${SERVER_URL}/problem/leaderboard`, {
      params: {
        problemId: data.problemId,
      },
    });
    return res.data;
  } catch (err) {
    if (err && err.response && err.response.data)
      return { success: false, ...err.response.data };
    return { success: false };
  }
};

export const getGlobalLeaderboardAPI = async (data) => {
  try {
    const res = await axios.get(`${SERVER_URL}/problem/globalLeaderboard`, {});
    return res.data;
  } catch (err) {
    if (err && err.response && err.response.data)
      return { success: false, ...err.response.data };
    return { success: false };
  }
};

export const getPreferencesAPI = async () => {
  return {
    success: true,
    preferences: {
      language: "cpp",
      fontSize: "14",
      theme: "monokai",
      tabSize: 4,
    },
  };
  try {
    const res = await axios.get(`${SERVER_URL}/problem/preference`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    if (err && err.response && err.response.data)
      return { success: false, ...err.response.data };
    return { success: false };
  }
};

export const runCodeAPI = async (submissionInfo) => {
  try {
    const res = await axios.post(
      `${SERVER_URL}/problem/compileAndRun`,
      submissionInfo,
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    if (err && err.response && err.response.data)
      return { success: false, ...err.response.data };
    return { success: false };
  }
};

export const submitCodeAPI = async (submissionInfo) => {
  try {
    const res = await axios.post(
      `${SERVER_URL}/problem/compileAndRun`,
      submissionInfo,
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    if (err && err.response && err.response.data)
      return { success: false, ...err.response.data };
    return { success: false };
  }
};
