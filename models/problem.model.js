const mongoose = require("mongoose");

const testcaseSchema = new mongoose.Schema({
  input: {
    url: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
  },
  output: {
    url: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
  },
  isSample: {
    type: Boolean,
    required: true,
  },
});

const configSchema = new mongoose.Schema({
  timelimit: {
    type: Number,
    default: 1000,
  },
  memorylimit: {
    type: Number,
    default: 256,
  },
  difficulty: {
    value: {
      type: Number,
      min: 1,
      max: 3,
      default: 1,
    },
    label: {
      type: String,
      default: "Easy",
    },
  },
  tags: {
    type: Array,
    items: {
      type: String,
    },
  },
});

const semiProblemSchema = new mongoose.Schema({
  statement: {
    type: String,
    default: "",
  },
  inputFormat: {
    type: String,
    default: "",
  },
  outputFormat: {
    type: String,
    default: "",
  },
  constraints: {
    type: String,
    default: "",
  },
  testcases: {
    type: Array,
    items: testcaseSchema,
  },
  checkerCode: {
    type: String,
    default: "",
  },
  explanation: {
    type: String,
    default: "",
  },
  config: configSchema,
});

const problemSchema = new mongoose.Schema(
  {
    problemId: {
      type: Number,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    problemName: {
      type: String,
      required: true,
      unique: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    saved: semiProblemSchema,
    published: semiProblemSchema,
    submissions: [
      {
        username: String,
        memory: Number,
        time: Number,
      },
    ],
    solvedCount: {
      type: Number,
      default: 0,
    },
    totalSubmissions: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Problem = mongoose.model("Problem", problemSchema);
module.exports = Problem;
