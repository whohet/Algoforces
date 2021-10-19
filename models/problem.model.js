const mongoose = require("mongoose");

const testcaseSchema = new mongoose.Schema({
  type: Object,
  properties: {
    id: { type: Number },
    inputURL: { type: String },
    inputFileName: { type: String },
    outputURL: { type: String },
    outputFileName: { type: String },
    isSample: { type: Boolean },
  },
  required: [
    "id",
    "inputURL",
    "inputFile",
    "outputURL",
    "outputFile",
    "isSample",
  ],
});
const configSchema = new mongoose.Schema({
  type: Object,
  properties: {
    timelimit: { type: Number },
    memorylimit: { type: String },
    difficulty: { type: String },
    tags: { type: Array, items: { type: String } },
  },
  required: ["timelimit", "memorylimit", "difficulty", "tags"],
});
const problemSchema = new mongoose.Schema(
  {
    problemName: {
      type: String,
      required: true,
      unique: true,
    },
    statement: {
      type: String,
      required: true,
      unique: true,
    },
    inputFormat: {
      type: String,
      required: true,
    },
    outputFormat: {
      type: String,
      required: true,
    },
    constraints: {
      type: String,
      required: true,
    },
    testcase: {
      type: Array,
      items: testcaseSchema,
    },
    explaination: {
      type: String,
      required: false,
    },
    config: configSchema,
  },
  {
    timestamps: true,
  }
);

const Problem = mongoose.model("Problem", problemSchema);
module.exports = Problem;
