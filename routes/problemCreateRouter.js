const router = require("express").Router();
const Problem = require("../models/problem.model");
function getTestCaseData(req) {
  var testcase = [];
  var total = req.body.maxTestCaseID;
  for (var i = 0; i < total; i++) {
    var obj = {
      id: i + 1,
      inputURL: req.body.testcase[i].input.link,
      inputFileName: req.body.testcase[i].input.fileName,
      outputURL: req.body.testcase[i].output.link,
      outputFileName: req.body.testcase[i].output.fileName,
      isSample: req.body.testcase[i].isSample,
    };
    testcase.push(obj);
  }
  return testcase;
}

function getConfigData(req) {
  var tags = [];
  var total = req.body.maxTags;
  for (var i = 0; i < total; i++) {
    tags.push(req.body.tags[i]);
  }
  return {
    timelimit: req.body.timelimit,
    memorylimit: req.body.memorylimit,
    difficulty: req.body.difficulty,
    tags: tags,
  };
}
router.post("/submit", async (req, res) => {
  const problem = new Problem({
    problemName: req.body.problemName,
    statement: req.body.statement,
    inputFormat: req.body.inputFormat,
    outputFormat: req.body.outputFormat,
    constraints: req.body.constraints,
    testcase: getTestCaseData(req),
    explaination: req.body.explaination,
    config: getConfigData(req),
  });
  problem
    .save()
    .then((item) => {
      res.json("item saved to database");
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
