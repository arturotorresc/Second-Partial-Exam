const mongoose = require("mongoose");

/* Your code goes here */

const { Schema } = mongoose;

const sportModelSchema = new Schema(
  {
    id: String,
    name: {
      type: String,
    },
    num_players: Number,
  },
  {
    timestamps: true,
  }
);

const Sport = mongoose.model("Sport", sportModelSchema);

module.exports = Sport;
