const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const updateSchema = new Schema(
  {
    Content: {
      type: String,
      required: true,
    },
    
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: String,
    userAvatar: String,
  },
  {
    timestamps: true,
  }
);

//one Newgoal
// SCHEMA Defines what structure/shape
// that the documents created from the Goal Model
// that our stored in the database should look like

const goalSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Date: {
      type: Date,
      default: () =>
        new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    },
    Category: {
      type: String,
      enum: ["Financial", "Spiritual", "Physical", "Family", "Lover", "Career"],
      required: true,
    },
    CorrectInformation: {
      type: Boolean,
      default: true,
    },
    updates: [updateSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goal", goalSchema);
