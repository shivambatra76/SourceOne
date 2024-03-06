const mongoose = require('mongoose')
const Schema = mongoose.Schema;
var BookModel = new Schema({
  book_id: {
    type: String
  },
  author_name: {
    type: String
  },
  book_name: {
    type: String}
    ,
  book_type:{
    type: String
  }

},{
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

module.exports = mongoose.model('books', BookModel);

