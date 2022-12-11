const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    problemId: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    verdict: {
      type: String,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    memory: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

submissionSchema.index({ username: 1, problemId: 1 }, { unique: false });

const Submission = mongoose.model("Submission", submissionSchema);
module.exports = Submission;
