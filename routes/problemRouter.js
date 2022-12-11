const router = require("express").Router();
const { config } = require("dotenv");
const userAuth = require("../middleware/userAuth");
const User = require("../models/user.model");
const Problem = require("../models/problem.model");
const Submission = require("../models/submission.model");
const axios = require("axios");

router.get("/getProblemsList", async (req, res) => {
  try {
    let problemsList = await Problem.find(
      {
        isPublished: true,
      },
      {
        _id: 1,
        problemId: 1,
        problemName: 1,
        "published.config": 1,
      }
    );
    problemsList = JSON.parse(JSON.stringify(problemsList));
    for (let i = 0; i < problemsList.length; i++) {
      problemsList[i].solve = 3 + i;
      problemsList[i].acceptance = 94.46 - i * 10;
    }
    return res.status(200).json({
      success: true,
      problemsList,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again.",
    });
  }
});

router.get("/getProblemData", async (req, res) => {
  try {
    const problemId = req.query.problemId;
    const problem = await Problem.findOne(
      {
        problemId: problemId,
        isPublished: true,
      },
      {
        _id: 1,
        problemId: 1,
        problemName: 1,
        published: 1,
      }
    );
    return res.status(200).json({
      success: true,
      problem,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again.",
    });
  }
});
const complieAndRunHelper = async (program) => {
  try {
    const response = await axios.post(
      "https://api.jdoodle.com/v1/execute",
      program,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept-Encoding": "application/json",
        },
      }
    );
    return {
      statusCodeReturn: response.data && response.data.statusCode,
      body: response.data,
    };
  } catch (err) {
    console.log(err);
    return {
      statusCodeReturn: 500,
    };
  }
};

router.post("/compileAndRun", userAuth, async (req, res) => {
  try {
    //prepare
    let verdictName = "ac";
    let verdictLabel = "Accepted!";
    const problemId = req.body.problemId;
    const isSample = req.body.isSample;
    const code = req.body.code;
    let language = req.body.language;
    let versionIndex = 0;
    if (language === "cpp") {
      language = "cpp17";
      versionIndex = "1";
    } else if (language === "java") {
      language = "java";
      versionIndex = 4;
    } else if (language === "python") {
      language = "python3";
      versionIndex = 4;
    }
    //fetch
    const problem = await Problem.findOne(
      {
        problemId: problemId,
        isPublished: true,
      },
      {
        _id: 0,
        "published.testcases": 1,
        "published.config": 1,
        "published.checkerCode": 1,
      }
    );
    //for each test case
    problemJSON = JSON.parse(JSON.stringify(problem));
    const timeLimit = problemJSON.published.config.timelimit / 1000;
    const memoryLimit = problemJSON.published.config.memorylimit * 1000;
    const checkerCode = problemJSON.published.checkerCode;
    let maxTime = 0,
      maxMemory = 0;
    for (let i = 0; i < problemJSON.published.testcases.length; i++) {
      // If user has clicked on "Run" button then we will only run the code on sample testcases.
      if (
        isSample == true &&
        problemJSON.published.testcases[i].isSample == false
      )
        continue;

      let program = {
        script: code,
        stdin: problemJSON.published.testcases[i].input.url,
        language: language,
        versionIndex: versionIndex,
        clientId: process.env.JDOODLE_CLIENT_ID,
        clientSecret: process.env.JDOODLE_CLIENT_SECRET,
      };
      const clientCodeResult = await complieAndRunHelper(program);
      maxTime = Math.max(maxTime, clientCodeResult.body.cpuTime || 0);
      maxMemory = Math.max(maxMemory, clientCodeResult.body.memory || 0);
      if (clientCodeResult.body.output.includes("JDoodle - Timeout")) {
        verdictName = "tle";
        verdictLabel = "Time Limit Exceeded on Test Case " + String(i + 1);
        break;
      }
      if (
        clientCodeResult.body.memory == null ||
        clientCodeResult.body.output.includes('File "/home/')
      ) {
        verdictName = "ce";
        verdictLabel = "Compilation Error";
        break;
      }
      if (clientCodeResult.body.memory > memoryLimit) {
        verdictName = "mle";
        verdictLabel = "Memory Limit Exceeded on Test Case " + String(i + 1);
        break;
      }
      if (clientCodeResult.body.cpuTime > timeLimit) {
        verdictName = "tle";
        verdictLabel = "Time Limit Exceeded on Test Case " + String(i + 1);
        break;
      }
      program.language = "cpp17";
      program.versionIndex = "1";
      program.script = checkerCode;
      program.stdin =
        problemJSON.published.testcases[i].input.url +
        " " +
        clientCodeResult.body.output;
      const checkerCodeResult = await complieAndRunHelper(program);

      if (checkerCodeResult.body.output[0] != "1") {
        verdictName = "wa";
        verdictLabel = "Wrong Answer on Test Case " + String(i + 1);
        break;
      }
    }
    if (!isSample) {
      let submission = new Submission({
        username: req.session.passport.user.username,
        problemId: problemId,
        code: code,
        language: req.body.language,
        verdict: verdictLabel,
        time: maxTime,
        memory: maxMemory,
      });
      submission = await submission.save();

      const user = await User.findById(req.session.passport.user._id);
      if (verdictName === "ac") {
        if (user.stats.solved.indexOf(problemId) == -1) {
          user.stats.solved.push(problemId);
          user.stats.solvedCount += 1;

          let index = user.stats.unsolved.indexOf(problemId);
          if (index !== -1) {
            user.stats.unsolved.splice(index, 1);
          }
        }
      } else {
        if (
          user.stats.solved.indexOf(problemId) == -1 &&
          user.stats.unsolved.indexOf(problemId) == -1
        ) {
          user.stats.unsolved.push(problemId);
        }
      }
      await user.save();
    }

    return res.status(200).json({
      success: true,
      verdict: {
        name: verdictName,
        label: verdictLabel,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again.",
    });
  }
});

router.get("/submissionsList", userAuth, async (req, res) => {
  try {
    const submissionsList = await Submission.find({
      username: req.query.username,
      problemId: req.query.problemId,
    });
    return res.status(200).json({
      success: true,
      submissionsList: submissionsList,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again.",
    });
  }
});

router.get("/leaderboard", async (req, res) => {
  try {
    const submissions = await Submission.find({
      problemId: req.query.problemId,
      verdict: "Accepted!",
    });
    submissions.sort((s1, s2) => s1.time - s2.time);
    return res.status(200).json({
      success: true,
      leaderboard: submissions,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again.",
    });
  }
});

router.get("/globalLeaderboard", async (req, res) => {
  try {
    const leaderboard = await User.find(
      {},
      {
        _id: 0,
        username: 1,
        "stats.solvedCount": 1,
      }
    ).sort({ "stats.solvedCount": -1 });
    return res.status(200).json({
      success: true,
      leaderboard: leaderboard,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again.",
    });
  }
});

module.exports = router;
