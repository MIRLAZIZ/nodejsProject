const express = require("express");
const router = express.Router();
const Book = require('../moduls/books')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const mongoose = require('mongoose')


// Barcha kitoblarni olish
router.get("/", async (req, res) => {
  // throw new Error('kitob so\'rovda kutilmagan xatolkk ro\'y berdi ' )

  const books = await Book.find();
  res.json(books);

});

// ID orqali kitob olish
router.get("/:id", async (req, res) => {

  mongoose.Types.ObjectId.isValid
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send('yaroqsiz id')

  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).send("The book with the given ID was not found.");
  res.json(book);

});

// Yangi kitob qo‘shish
router.post("/", [auth, admin], async (req, res) => {


  if (!req.body.title || !req.body.author) {
    return res.status(400).send("Please provide a title and an author");
  }
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
  });
  const savedBook = await book.save();
  res.json(savedBook);

});

// Kitob ma'lumotlarini yangilash
router.put("/:id", [auth, admin], async (req, res) => {

  const book = await Book.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title, author: req.body.author },
    { new: true }
  );
  if (!book) return res.status(404).send("The book with the given ID was not found.");
  res.json(book);

});

// Kitobni o‘chirish
router.delete("/:id", [auth, admin], async (req, res) => {

  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) return res.status(404).send("The book with the given ID was not found.");
  res.json({ message: "Book deleted successfully" });

});

module.exports = router;
