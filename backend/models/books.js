const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
  book_id: String,
  author_name: String,
  book_name: String,
  book_type:String
});



const Book = mongoose.model('books', bookSchema);

module.exports = {Book };
