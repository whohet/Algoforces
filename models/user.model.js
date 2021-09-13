const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        username: { type: String, required: true, unique: true },
    },
    {
        timestamps: true,
    }
);
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);

module.exports = User;
