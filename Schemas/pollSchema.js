const mongoose = require("mongoose");

const pollSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  totalVote: {
    type: Number,
    default: 0,
  },
  options: {
    type: [
      {
        name: String,
        vote: Number,
      },
    ],
  },
});

const Poll = mongoose.model("Poll", pollSchema);

module.exports = Poll;
