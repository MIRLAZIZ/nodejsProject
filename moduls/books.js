const mongoose = require("mongoose");



// Kitoblar uchun schema
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book