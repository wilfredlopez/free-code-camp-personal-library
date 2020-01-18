const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  comments: {
    type: [String],
    default: []
  },
  commentcount: {
    type: Number,
    default: 0
  },
  updated_at: {
    type: Date,
    default: Date.now().toString()
  },
  created_at: {
    type: Date,
    default: Date.now().toString()
  }
});

BookSchema.pre("save", function(next) {
  this.created_at = Date.now().toString();

  next();
});

BookSchema.pre("update", function(next, doc) {
  this.updated_at = Date.now().toString();
  next();
});

const Books = mongoose.model("Books", BookSchema);

module.exports = Books;
