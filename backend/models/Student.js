const mongoose = require("mongoose");

const Student = mongoose.model("Student", {
  name: String,
  age: Number,
  gender: String,
  subjects: [String],
});

module.exports = Student;
