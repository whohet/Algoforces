const router = require("express").Router();
const userAuth = require("../middleware/userAuth");
const Problem = require("../models/problem.model");

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

module.exports = router;
