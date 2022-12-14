const router = require("express").Router();
const userAuth = require("../middleware/userAuth");
const Counter = require("../models/counter.model");
const Problem = require("../models/problem.model");
const { userPermissions } = require("../utils/data");

router.get("/getMyProblems", userAuth, async (req, res) => {
  try {
    const userId = req.session.passport.user._id;
    const problems = await Problem.find(
      {
        author: userId,
      },
      {
        _id: 1,
        problemId: 1,
        problemName: 1,
      }
    );
    return res.status(200).json({
      success: true,
      problems,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again",
    });
  }
});

router.post("/create", userAuth, async (req, res) => {
  try {
    const userId = req.session.passport.user._id;
    const userType = req.session.passport.user.userType;
    if (
      userType in userPermissions &&
      userPermissions[userType].isAllowedToCreateProblem
    ) {
      const result = await Problem.findOne({
        problemName: req.body.problemName,
      });
      if (result) {
        return res.status(400).json({
          success: false,
          message:
            "Problem with same name already exists. Please try another name.",
        });
      }
      const sampleProblemData = {
        statement: "",
        inputFormat: "",
        outputFormat: "",
        constraints: "",
        testcases: [],
        explanation: "",
        config: {
          timelimit: 1000,
          memorylimit: 256,
          difficulty: {
            value: 1,
            label: "Easy",
          },
          tags: [],
        },
      };
      const counterRes = await Counter.findByIdAndUpdate(
        {
          _id: "problemId",
        },
        {
          $inc: { seq: 1 },
        }
      );
      let problemId = counterRes.seq;
      let problem = new Problem({
        author: userId,
        problemId: problemId,
        problemName: req.body.problemName,
        saved: sampleProblemData,
        published: sampleProblemData,
        isPublished: false,
      });

      problem = await problem.save();
      return res.status(200).json({
        success: true,
        message: "Problem created successfully",
        _id: problem._id,
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to create problem.",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again",
    });
  }
});

router.get("/getProblemData", userAuth, async (req, res) => {
  try {
    const userId = req.session.passport.user._id;
    const problem = await Problem.findOne({
      _id: req.query._id,
      author: userId,
    });
    if (!problem) {
      return res.status(400).json({
        success: false,
        message: "Problem doesn't exist.",
      });
    }
    return res.status(200).json({
      success: true,
      problem,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again",
    });
  }
});

router.post("/save", userAuth, async (req, res) => {
  try {
    const userId = req.session.passport.user._id;
    const userType = req.session.passport.user.userType;
    if (
      userType in userPermissions &&
      userPermissions[userType].isAllowedToCreateProblem
    ) {
      const result = await Problem.findOneAndUpdate(
        {
          _id: req.body._id,
          author: userId,
        },
        {
          $set: {
            problemName: req.body.problemName,
            saved: req.body.problem,
          },
        }
      );
      return res.status(200).json({
        success: true,
        message: "Problem saved successfully",
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to create problem.",
      });
    }
  } catch (err) {
    if (err && err.codeName === "DuplicateKey") {
      return res.status(400).json({
        success: false,
        message: "Problem name must be unique. Please try another name.",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again.",
    });
  }
});

router.post("/saveandpublish", userAuth, async (req, res) => {
  try {
    const userId = req.session.passport.user._id;
    const userType = req.session.passport.user.userType;
    if (
      userType in userPermissions &&
      userPermissions[userType].isAllowedToCreateProblem
    ) {
      const problem = await Problem.findById(req.body._id, {
        isPublished: 1,
        problemId: 1,
      });

      let problemId = problem.problemId;
      const result = await Problem.findOneAndUpdate(
        {
          _id: req.body._id,
          author: userId,
        },
        {
          $set: {
            problemId: problemId,
            problemName: req.body.problemName,
            saved: req.body.problem,
            published: req.body.problem,
            isPublished: true,
          },
        }
      );
      return res.status(200).json({
        success: true,
        message: "Problem saved and published successfully",
        problemId,
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to create problem.",
      });
    }
  } catch (err) {
    if (err && err.codeName === "DuplicateKey") {
      return res.status(400).json({
        success: false,
        message: "Problem name must be unique. Please try another name.",
      });
    }
    return res
      .status(500)
      .json({ err, success: false, message: "Internal server error" });
  }
});

module.exports = router;
