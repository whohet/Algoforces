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
    //     res.data.problem.published.sampleTestcases = [
    //       {
    //         input: `5 25
    // 10 13 5 12 8`,
    //         output: `2 4`,
    //       },
    //       {
    //         input: `4 5
    // 3 4 1 2`,
    //         output: `2 3`,
    //       },
    //     ];
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
