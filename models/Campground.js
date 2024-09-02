const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
  title: {
    type: String,
  },
  price: {
    type: String,
  },
  description: {
    type: String,
  },
  //   rating: {
  //     type: Number,
  //     enum: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
  //   },
  location: {
    type: String,
  },
});

const Model = mongoose.model("Campground", CampgroundSchema);
module.exports = Model;
