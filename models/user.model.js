const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    userType: {
      type: String,
      default: "normal",
    },
    avatarUrl: {
      type: String,
      default: "",
    },
    stats: {
      solved: [Number],
      unsolved: [Number],
      solvedCount: {
        type: Number,
        default: 0
      }
    }
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(passportLocalMongoose, { usernameQueryFields: ["email"] });

const User = mongoose.model("User", userSchema);
module.exports = User;
